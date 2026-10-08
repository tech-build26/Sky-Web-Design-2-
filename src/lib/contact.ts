export const CONTACT_EMAIL = "info@ropeaccess.co.za";
export const PROJECT_WHATSAPP = "27832890077";
export const WHATSAPP_URL = `https://wa.me/${PROJECT_WHATSAPP}?text=${encodeURIComponent("Hello Skyriders, I would like to speak with a project manager about access and inspection requirements for my site.")}`;

export const enquiryServices = [
  "Industrial access", "Inspection & NDT", "Concrete services",
  "Maintenance & cleaning", "Confined space", "Drone inspection", "Help me choose",
] as const;

export const enquiryTimings = ["As soon as possible", "Within 1 month", "1–3 months", "Planning ahead"] as const;

export type ProjectEnquiry = {
  name: string; email: string; phone: string; company: string;
  location: string; service: string; timing: string; message: string; consent: boolean;
};

export function isValidEnquiry(enquiry: ProjectEnquiry) {
  return Boolean(enquiry.name && enquiry.name.length <= 100
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) && enquiry.email.length <= 254
    && !/[\r\n]/.test(enquiry.name + enquiry.email) && enquiry.phone.length <= 40 && enquiry.company.length <= 150
    && enquiry.location && enquiry.location.length <= 200 && enquiry.message.length >= 10 && enquiry.message.length <= 3000
    && enquiryServices.some(service => service === enquiry.service)
    && (!enquiry.timing || enquiryTimings.some(timing => timing === enquiry.timing)) && enquiry.consent);
}

export function enquiryText(enquiry: ProjectEnquiry) {
  return ["Skyriders project enquiry", "", `Name: ${enquiry.name}`, `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not supplied"}`, `Company: ${enquiry.company || "Not supplied"}`,
    `Site / location: ${enquiry.location}`, `Service: ${enquiry.service}`, `Timing: ${enquiry.timing || "To be discussed"}`,
    "", "Project scope:", enquiry.message, "", "The sender agrees to be contacted about this enquiry."].join("\n");
}
