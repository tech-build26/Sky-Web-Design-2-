export const CAREERS_EMAIL = "reception@ropeaccess.co.za";
export const MAX_CV_BYTES = 5 * 1024 * 1024;
export const ADMIN_EMAILS = ["it@ropeaccess.co.za", "beata@ropeaccess.co.za"] as const;
export const roleOptions = ["Rope access technician", "Rope access supervisor", "Rope access welder", "Rope access rigger", "NDT technician", "Inspection technician", "Coating / painting technician", "Blasting technician", "Concrete repair technician", "Facade maintenance technician", "Industrial cleaning technician", "Confined-space technician", "Rescue technician", "Rescue standby supervisor", "Boilermaker", "Pipe fitter", "Mechanical fitter", "Electrician", "Steel erector", "Netting installer", "Safety officer", "Site supervisor", "Project coordinator", "Drone pilot", "Drone inspection specialist", "Equipment inspector", "Other"] as const;
export const levelOptions = ["Level 1", "Level 2", "Level 3", "Any certified level", "Not required for this role", "Other"] as const;
export const schemeOptions = ["IRATA", "IWH", "IRATA or IWH, subject to site approval", "Role-specific certification", "Not required for this role", "Other"] as const;
export const regionOptions = ["Gauteng", "Mpumalanga", "Limpopo", "North West", "Free State", "KwaZulu-Natal", "Eastern Cape", "Western Cape", "Northern Cape", "Multiple South African sites", "Cross-border / international", "Other"] as const;
export const sectorOptions = ["Power generation", "Mining", "Petrochemical", "Oil & gas", "Renewable energy", "Manufacturing", "Cement & silos", "Infrastructure & bridges", "Commercial buildings", "Telecommunications", "Marine / offshore", "Water & utilities", "Other"] as const;
export const contractOptions = ["Temporary / project-based", "Fixed-term contract", "Shutdown / outage", "Permanent", "Part-time", "Other"] as const;
export const startOptions = ["As soon as site clearance is complete", "Within 2 weeks", "Within 1 month", "Planned shutdown", "Date to be confirmed", "Other"] as const;
export const rotationOptions = ["Local / daily travel", "Travel and accommodation required", "Rotational deployment", "Night shift", "Day shift", "Shift pattern to be confirmed", "Other"] as const;
export const requirementGroups = {
  "Access & rescue": ["Current rope-access certification", "Verified rope-access logbook", "Level 3 supervision competence", "Fall arrest training", "Fall protection planning", "Rope rescue competence", "Confined-space entry training", "Confined-space rescue training", "Work-at-height experience"],
  "Trade & inspection": ["Trade test certificate", "Coded welding qualification", "Welding: SMAW / stick", "Welding: GTAW / TIG", "Welding: GMAW / MIG", "Rigging qualification", "NDT Level 2: ultrasonic testing", "NDT Level 2: magnetic particle testing", "NDT Level 2: dye penetrant testing", "NDT Level 2: radiographic testing", "Visual inspection experience", "Coating inspection qualification", "Abrasive blasting experience", "Protective coating experience", "Concrete repair experience", "Mechanical fitting experience", "Electrical qualification", "Drone pilot certification"],
  "Site readiness": ["Valid occupational fitness certificate (verified before mobilisation)", "Site induction before mobilisation", "Client-specific safety clearance", "First aid training", "Fire watch training", "Permit-to-work experience", "Risk assessment competence", "Valid driving licence", "Ability to travel", "Availability for shift work", "Right to work at the project location", "Previous industrial site experience", "Own reliable transport"],
} as const;
export const requirementOptions: readonly string[] = Object.values(requirementGroups).flat();
export const contactOptions = ["Email", "Phone call", "WhatsApp"] as const;
export const availabilityOptions = ["Immediately", "Within 1 week", "Within 2 weeks", "Within 1 month", "Notice period / other"] as const;
export const vacancyStatuses = ["draft", "published", "closed", "archived"] as const;

export type VacancyInput = {
  title: string; level: string; scheme: string; region: string; site: string; sector: string;
  contract: string; start: string; duration: string; rotation: string; headcount: number;
  description: string; requirements: string[]; additional_requirements: string;
  closing_at: string | null; status: typeof vacancyStatuses[number];
};
export type Vacancy = VacancyInput & { id: string; reference: string; created_at: string; updated_at: string };
export type ApplicationInput = {
  vacancy: string; name: string; email: string; phone: string; contact: string; location: string;
  availability: string; level: string; cover: string; consent: boolean;
};
const bounded = (value: unknown, max: number, min = 1): value is string => typeof value === "string" && value.trim().length >= min && value.length <= max && !value.includes("\0");
const single = (value: unknown, max: number) => bounded(value, max) && !/[\r\n]/.test(value);
export function validVacancy(input: unknown): input is VacancyInput {
  if (!input || typeof input !== "object") return false;
  const v = input as VacancyInput;
  return Boolean([v.title, v.level, v.scheme, v.region, v.sector, v.contract, v.start, v.rotation].every(value => single(value, 160))
    && single(v.site, 200) && single(v.duration, 120)
    && Number.isInteger(v.headcount) && v.headcount >= 1 && v.headcount <= 500
    && bounded(v.description, 8000, 40) && bounded(v.additional_requirements, 3000, 0)
    && Array.isArray(v.requirements) && v.requirements.length <= requirementOptions.length
    && v.requirements.every(r => requirementOptions.includes(r)) && new Set(v.requirements).size === v.requirements.length
    && (v.requirements.length > 0 || v.additional_requirements.trim().length >= 10)
    && vacancyStatuses.includes(v.status)
    && (v.closing_at === null || (single(v.closing_at, 40) && Number.isFinite(Date.parse(v.closing_at)))));
}
export function validApplication(input: ApplicationInput) {
  return single(input.name, 100) && single(input.email, 254) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)
    && single(input.phone, 40) && /^\+?[\d\s().-]{7,40}$/.test(input.phone) && input.phone.replace(/\D/g, "").length >= 7
    && contactOptions.some(v => v === input.contact) && single(input.location, 200)
    && availabilityOptions.some(v => v === input.availability) && levelOptions.some(v => v === input.level)
    && bounded(input.cover, 4000, 40) && input.consent;
}
export function validPdf(bytes: Uint8Array, name: string, mime: string) {
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_CV_BYTES || !/\.pdf$/i.test(name) || mime !== "application/pdf") return false;
  const start = new TextDecoder().decode(bytes.subarray(0, 8));
  const end = new TextDecoder().decode(bytes.subarray(Math.max(0, bytes.length - 1024)));
  return /^%PDF-1\.[0-7]|^%PDF-2\.0/.test(start) && /%%EOF\s*$/.test(end);
}
export function vacancyOpen(v: Pick<Vacancy, "status" | "closing_at">, now = Date.now()) {
  return v.status === "published" && (!v.closing_at || Date.parse(v.closing_at) > now);
}
