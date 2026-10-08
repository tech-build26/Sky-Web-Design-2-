export const HUB_URL = "https://skyadmin.ropeaccess.co.za/dashboard";

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Who we are", href: "#about" },
] as const;

export const services = [
  { id: "inspection-ndt", title: "Inspection & NDT", description: "Visual inspection, ultrasonic testing and material assessment to understand the condition of hard-to-reach structures.", label: "Understand the structure" },
  { id: "concrete-services", title: "Concrete Services", description: "Concrete surveys, testing, repairs and protective treatments for demanding industrial structures.", label: "Protect structural integrity" },
  { id: "installations", title: "Industrial Access", description: "Rigging, installations, platforms and height safety systems that make difficult work areas accessible.", label: "Make access possible" },
  { id: "maintenance", title: "Maintenance & Cleaning", description: "Facade maintenance, cleaning, protective coatings and repairs where conventional access is a challenge.", label: "Keep assets working" },
  { id: "confined-space", title: "Confined Space", description: "Consultation and rescue standby for work in confined environments, planned around the needs of the site.", label: "Plan for the environment" },
  { id: "drone-inspection", title: "Drone Inspection", description: "Indoor and outdoor inspection applications through the Sky I division, with the approach defined for each structure.", label: "See beyond the surface" },
] as const;

export const industries = [
  { title: "Buildings & Facades", short: ["Buildings", "& Facades"], icon: "building" },
  { title: "Infrastructure & Civil", short: ["Infrastructure", "& Civil"], icon: "bridge" },
  { title: "Energy & Renewables", short: ["Energy", "& Renewables"], icon: "energy" },
  { title: "Industrial & Process", short: ["Industrial", "& Process"], icon: "industry" },
  { title: "Mining & Petrochemical", short: ["Mining &", "Petrochemical"], icon: "helmet" },
] as const;

export const heroImages = [
  { src: "/images/hero/hero-sa-urban-facade-01.webp", title: "Urban facade", alt: "Black and white rope-access colleagues inspecting a glass facade above an inland Johannesburg cityscape.", desktopPosition: "69% 50%", mobilePosition: "67% 50%" },
  { src: "/images/hero/hero-sa-industrial-tower-02.webp", title: "Industrial tower", alt: "White rope-access inspector and Black colleague working on the concrete exterior of an inland South African industrial tower.", desktopPosition: "64% 50%", mobilePosition: "65% 50%" },
  { src: "/images/hero/hero-sa-steel-structure-03.webp", title: "Steel structure", alt: "Black and white South African technicians inspecting a steel gantry on separate rope-access lines.", desktopPosition: "63% 50%", mobilePosition: "62% 50%" },
] as const;

export const heroServiceTiles = [
  { title: ["Industrial", "Access"], href: "#installations", image: "/images/hero/hero-support-inspection.webp" },
  { title: ["Inspection", "& NDT"], href: "#inspection-ndt", image: "/images/hero/hero-support-infrastructure.webp" },
  { title: ["Facade", "Maintenance"], href: "#maintenance", image: "/images/hero/hero-support-team.webp" },
] as const;
