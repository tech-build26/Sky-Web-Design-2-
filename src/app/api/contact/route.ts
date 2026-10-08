import { CONTACT_EMAIL, enquiryText, isValidEnquiry, type ProjectEnquiry } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site-url";

const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next may use its internal hostname in request.url; match the configured public origin or actual request host.
  const url = new URL(request.url);
  const protocol = request.headers.get("x-forwarded-proto") === "https" ? "https:" : url.protocol;
  const websiteOrigin = getSiteUrl()?.origin || `${protocol}//${request.headers.get("host") || url.host}`;
  if (origin && origin !== websiteOrigin) return Response.json({ error: "Please send your enquiry from this website." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request format." }, { status: 415 });
  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ error: "Your enquiry is too long." }, { status: 413 });
    input = JSON.parse(raw);
  } catch { return Response.json({ error: "Please check your enquiry and try again." }, { status: 400 }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  const data = input as Record<string, unknown>;
  // Quietly discard the hidden field used by simple form bots.
  if (data.website) return Response.json({ ok: true });
  const text = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const enquiry: ProjectEnquiry = {
    name: text("name"), email: text("email"), phone: text("phone"), company: text("company"),
    location: text("location"), service: text("service"), timing: text("timing"), message: text("message"), consent: data.consent === true,
  };
  if (!isValidEnquiry(enquiry)) {
    return Response.json({ error: "Please complete the required fields and agree to be contacted." }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return Response.json({ error: "Email delivery is unavailable. Please use the email option to send your enquiry." }, { status: 503 });
  // Best-effort per-process limit; add a shared limit at the hosting edge before a multi-instance deployment.
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires < now) attempts.delete(key);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const entry = attempts.get(address) || { count: 0, expires: now + 600000 };
  if (entry.count >= 5) return Response.json({ error: "Please wait a few minutes before sending another enquiry." }, { status: 429, headers: { "Retry-After": String(Math.ceil((entry.expires - now) / 1000)) } });
  attempts.set(address, { ...entry, count: entry.count + 1 });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [CONTACT_EMAIL], reply_to: enquiry.email, subject: `Project enquiry — ${enquiry.service}`, text: enquiryText(enquiry) }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return Response.json({ error: "We couldn’t send your enquiry. Please try again or use email." }, { status: 502 });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "We couldn’t send your enquiry. Please try again or use email." }, { status: 502 }); }
}
