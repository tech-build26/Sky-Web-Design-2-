import { createHash, createHmac } from "node:crypto";
import { CAREERS_EMAIL, MAX_CV_BYTES, validApplication, validPdf, vacancyOpen, type ApplicationInput, type Vacancy } from "@/lib/careers";
import { CareersError, errorResponse, limitedBody, sameOrigin, serviceDatabase } from "@/lib/careers-server";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) throw new CareersError("Please use the application form.", 415);
    const secret = process.env.CAREERS_RATE_LIMIT_SECRET;
    const scannerUrl = process.env.CV_SCANNER_URL;
    const scannerToken = process.env.CV_SCANNER_TOKEN;
    const emailKey = process.env.RESEND_API_KEY;
    const from = process.env.CAREERS_FROM_EMAIL;
    const captchaSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret || secret.length < 32 || !scannerUrl || !scannerToken || !emailKey || !from || !captchaSecret || !getSiteUrl()) throw new CareersError("Applications are temporarily unavailable. Please try again later.", 503);
    if (new URL(scannerUrl).protocol !== "https:") throw new CareersError("Applications are temporarily unavailable.", 503);
    const db = serviceDatabase();
    // The hosting edge must overwrite this header; never trust a client-supplied forwarding chain.
    const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (!address) throw new CareersError("Applications are temporarily unavailable.", 503);
    const digest = (value: string) => createHmac("sha256", secret).update(value).digest("hex");
    const { data: allowed, error: rateError } = await db.rpc("consume_careers_rate", { p_key: digest(`ip:${address}`), p_limit: 10 });
    if (rateError) throw new CareersError("Applications are temporarily unavailable.", 503);
    if (!allowed) throw new CareersError("Too many attempts. Please try again in an hour.", 429);
    const raw = await limitedBody(request, MAX_CV_BYTES + 64 * 1024);
    let form: FormData;
    try { form = await new Request(request.url, { method: "POST", headers: { "Content-Type": request.headers.get("content-type")! }, body: raw }).formData(); }
    catch { throw new CareersError("Please check your application and PDF file."); }
    if (form.get("website")) throw new CareersError("Please check your application.");
    const field = (name: string) => typeof form.get(name) === "string" ? String(form.get(name)).trim() : "";
    const input: ApplicationInput = { vacancy: field("vacancy"), name: field("name"), email: field("email").toLowerCase(), phone: field("phone"), contact: field("contact"), location: field("location"), availability: field("availability"), level: field("level"), cover: field("cover"), consent: field("consent") === "on" };
    if (!/^[0-9a-f-]{36}$/i.test(input.vacancy) || !validApplication(input)) throw new CareersError("Complete your contact details, availability and cover letter, and accept the recruitment notice.");
    const cv = form.get("cv");
    if (!(cv instanceof File)) throw new CareersError("Attach a PDF CV, up to 5 MB.");
    const bytes = Buffer.from(await cv.arrayBuffer());
    if (!validPdf(bytes, cv.name, cv.type)) throw new CareersError("Your CV must be a valid PDF file of 5 MB or less. Export it as PDF and try again.");
    const captcha = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret: captchaSecret, response: field("captcha"), remoteip: address }), signal: AbortSignal.timeout(10000) });
    const verification = await captcha.json();
    if (!captcha.ok || verification.success !== true || verification.hostname !== getSiteUrl()!.hostname || verification.action !== "careers-apply") throw new CareersError("Please complete the security check again.");
    const { data: emailAllowed, error: emailRateError } = await db.rpc("consume_careers_rate", { p_key: digest(`email:${input.email}`), p_limit: 3 });
    if (emailRateError) throw new CareersError("Applications are temporarily unavailable.", 503);
    if (!emailAllowed) throw new CareersError("Too many applications. Please try again in an hour.", 429);
    const { data: vacancy, error } = await db.from("vacancies").select("*").eq("id", input.vacancy).single();
    if (error || !vacancy || !vacancyOpen(vacancy as Vacancy)) throw new CareersError("This vacancy is no longer accepting applications. Please refresh the Careers page.", 409);
    const scan = await fetch(scannerUrl, { method: "POST", headers: { Authorization: `Bearer ${scannerToken}`, "Content-Type": "application/pdf" }, body: bytes, signal: AbortSignal.timeout(20000), redirect: "error", cache: "no-store" });
    if (!scan.ok) throw new CareersError("The CV security check is temporarily unavailable. Please try again later.", 503);
    const result = await scan.json();
    if (result.clean !== true) throw new CareersError("This PDF could not pass the security check. Use an unencrypted PDF exported from your document editor.");
    // Recheck after the scanner: closures during a slow upload/scan must take effect.
    const { data: current, error: currentError } = await db.from("vacancies").select("*").eq("id", input.vacancy).single();
    if (currentError || !current || !vacancyOpen(current as Vacancy)) throw new CareersError("This vacancy has closed. Your CV has not been sent.", 409);
    // Key is stable across retries, including uncertain network outcomes. No CV/applicant row is stored.
    const key = digest(JSON.stringify({ ...input, revision: current.updated_at, cv: createHash("sha256").update(bytes).digest("hex") }));
    const reference = `SKY-${key.slice(0, 12).toUpperCase()}`;
    const message = ["SKYRIDERS — CAREERS APPLICATION", `Application reference: ${reference}`, `Vacancy: ${current.reference} / ${current.title}`, `Site: ${current.site}, ${current.region}`, "", `Name: ${input.name}`, `Email: ${input.email}`, `Phone / WhatsApp: ${input.phone}`, `Preferred contact: ${input.contact}`, `Current location: ${input.location}`, `Availability: ${input.availability}`, `Rope-access level: ${input.level}`, "", "COVER LETTER", input.cover, "", "ADVERTISED DESCRIPTION", current.description, "", "ADVERTISED REQUIREMENTS", ...current.requirements, current.additional_requirements, "", "Applicant accepted recruitment processing and delivery to reception@ropeaccess.co.za. Website stores no CV or application record."].join("\n");
    const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${emailKey}`, "Content-Type": "application/json", "Idempotency-Key": `careers/${key}` }, body: JSON.stringify({ from, to: [CAREERS_EMAIL], reply_to: input.email, subject: `Application ${reference} — ${current.reference} — ${current.title}`, text: message, attachments: [{ filename: `${reference}-CV.pdf`, content: bytes.toString("base64"), content_type: "application/pdf" }] }), signal: AbortSignal.timeout(15000) });
    if (!sent.ok) throw new CareersError("We could not confirm delivery. Please retry with the same details and PDF.", 502);
    return Response.json({ ok: true, reference }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return errorResponse(error); }
}
