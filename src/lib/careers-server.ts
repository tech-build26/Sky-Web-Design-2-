import "server-only";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_EMAILS, type Vacancy } from "./careers";
import { getSiteUrl } from "./site-url";
import { BodyTooLargeError, readBoundedBody } from "./request-body";

export class CareersError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function publicDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (url, init) => fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(10000) }) } }) : null;
}
export function serviceDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new CareersError("Applications are temporarily unavailable. Please try again later.", 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (url, init) => fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(10000) }) } });
}
export async function listVacancies(): Promise<{ vacancies: Vacancy[]; unavailable: boolean }> {
  const db = publicDatabase();
  if (!db) return { vacancies: [], unavailable: process.env.NODE_ENV === "production" };
  try {
    const { data, error } = await db.from("vacancies").select("*").eq("status", "published").or(`closing_at.is.null,closing_at.gt.${new Date().toISOString()}`).order("created_at", { ascending: false });
    return { vacancies: error ? [] : data as Vacancy[], unavailable: Boolean(error) };
  } catch { return { vacancies: [], unavailable: true }; }
}
export function sameOrigin(request: Request) {
  const expected = getSiteUrl()?.origin ?? (process.env.NODE_ENV !== "production" ? new URL(request.url).origin : null);
  if (!expected || request.headers.get("origin") !== expected) throw new CareersError("Please submit from this website.", 403);
}
export async function limitedBody(request: Request, limit: number) {
  try {
    return await readBoundedBody(request, limit);
  } catch (error) {
    if (error instanceof BodyTooLargeError) throw new CareersError("Your request is too large. Use a PDF CV of 5 MB or less and shorten any long text.", 413);
    throw error;
  }
}
export async function requireAdmin(request: Request) {
  const base = publicDatabase();
  if (!base) throw new CareersError("Recruitment administration is not configured.", 503);
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/)?.[1];
  if (!token) throw new CareersError("Sign in and verify your Authenticator code.", 401);
  const [{ data: userData, error: userError }, { data: claimData, error: claimError }] = await Promise.all([base.auth.getUser(token), base.auth.getClaims(token)]);
  const user = userData.user;
  if (userError || claimError || !user || !user.email_confirmed_at || !ADMIN_EMAILS.some(email => email === user.email?.toLowerCase()) || claimData?.claims.aal !== "aal2") throw new CareersError("Administrator access and Authenticator verification are required.", 403);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: `Bearer ${token}` }, fetch: (url, init) => fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(10000) }) } });
  const { data, error } = await db.rpc("is_recruitment_admin");
  if (error || data !== true) throw new CareersError("Recruitment access is unavailable for this session. Sign in again with your Authenticator, or ask your account administrator to check your privileges.", 403);
  return db;
}
export function errorResponse(error: unknown) {
  return Response.json({ error: error instanceof CareersError ? error.message : "The service is temporarily unavailable. Please try again." }, { status: error instanceof CareersError ? error.status : 503, headers: { "Cache-Control": "no-store" } });
}
