import { validVacancy, type VacancyInput } from "@/lib/careers";
import { CareersError, errorResponse, limitedBody, requireAdmin, sameOrigin } from "@/lib/careers-server";

export async function GET(request: Request) {
  try {
    const db = await requireAdmin(request);
    const page = Number(new URL(request.url).searchParams.get("page") ?? "0");
    if (!Number.isInteger(page) || page < 0 || page > 10000) throw new CareersError("Invalid vacancy page.");
    const { data, error } = await db.from("vacancies").select("*").order("created_at", { ascending: false }).order("id", { ascending: false }).range(page * 100, page * 100 + 100);
    if (error) throw new CareersError("Vacancies could not be loaded.", 503);
    return Response.json({ vacancies: data.slice(0, 100), hasMore: data.length > 100 }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return errorResponse(error); }
}
export async function POST(request: Request) { return save(request, false); }
export async function PATCH(request: Request) { return save(request, true); }
async function save(request: Request, update: boolean) {
  try {
    sameOrigin(request);
    const db = await requireAdmin(request);
    if (!request.headers.get("content-type")?.includes("application/json")) throw new CareersError("Invalid request format.", 415);
    let input;
    try { input = JSON.parse((await limitedBody(request, 20000)).toString("utf8")); } catch (error) { if (error instanceof CareersError) throw error; throw new CareersError("Invalid vacancy details."); }
    if (!validVacancy(input)) throw new CareersError("Complete the role, location, description and requirements before saving.");
    if (input.status === "published" && input.closing_at && Date.parse(input.closing_at) <= Date.now()) throw new CareersError("Choose a future closing date, or remove it to keep applications open until you close the role.");
    const v = input as VacancyInput;
    const identity = input as VacancyInput & { id?: string; updated_at?: string };
    const record: VacancyInput = { title: v.title.trim(), level: v.level.trim(), scheme: v.scheme.trim(), region: v.region.trim(), site: v.site.trim(), sector: v.sector.trim(), contract: v.contract.trim(), start: v.start.trim(), duration: v.duration.trim(), rotation: v.rotation.trim(), headcount: v.headcount, description: v.description.trim(), requirements: v.requirements, additional_requirements: v.additional_requirements.trim(), closing_at: v.closing_at, status: v.status };
    if (update && (!identity.id || !/^[0-9a-f-]{36}$/i.test(identity.id) || typeof identity.updated_at !== "string")) throw new CareersError("Select a vacancy to edit.");
    const query = update ? db.from("vacancies").update(record).eq("id", identity.id!).eq("updated_at", identity.updated_at!) : db.from("vacancies").insert(record);
    const { data, error } = await query.select().single();
    if (error) throw new CareersError(update ? "This role changed in another session. Reload it before saving." : "This vacancy could not be saved. Please try again.", update ? 409 : 503);
    return Response.json({ vacancy: data }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return errorResponse(error); }
}
