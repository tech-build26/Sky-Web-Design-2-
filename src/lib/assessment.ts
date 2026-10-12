export const ASSESSMENT_EMAIL = "ross@ropeaccess.co.za";
export const assessmentNeeds = ["Inspection / NDT", "Maintenance or repair", "Access planning", "Confined space", "Not sure yet"] as const;
export const contactWindows = ["As soon as possible", "This week", "Within two weeks", "Planning ahead"] as const;
export const contactMethods = ["Phone call", "Email"] as const;

export type AssessmentEnquiry = {
  name: string; company: string; email: string; phone: string;
  site: string; need: string; window: string; method: string; scope: string; consent: boolean;
};

export function isValidAssessment(data: AssessmentEnquiry) {
  return Boolean(data.name && data.name.length <= 100 && !/[\r\n]/.test(data.name)
    && data.company.length <= 150 && data.site && data.site.length <= 200 && !/[\r\n]/.test(data.site)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && data.email.length <= 254
    && data.phone.length >= 6 && data.phone.length <= 40
    && assessmentNeeds.some(need => need === data.need)
    && contactWindows.some(window => window === data.window)
    && contactMethods.some(method => method === data.method)
    && data.scope.length >= 10 && data.scope.length <= 2000 && data.consent);
}

export function assessmentText(data: AssessmentEnquiry) {
  return ["Free onsite technical assessment request", "", `Name: ${data.name}`, `Company: ${data.company || "Not supplied"}`,
    `Email: ${data.email}`, `Phone: ${data.phone}`, `Site / location: ${data.site}`, `Primary need: ${data.need}`,
    `When to get in touch: ${data.window}`, `Preferred contact method: ${data.method}`, "", "Site brief:", data.scope,
    "", "The sender agrees to be contacted about this assessment request."].join("\n");
}
