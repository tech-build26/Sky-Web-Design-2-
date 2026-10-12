export const HUB_URL = "https://skyadmin.ropeaccess.co.za/dashboard";

export const navigation = [
  { label: "Services", href: "/services/inspection-concrete-access" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

export const services = [
  { id: "inspection-ndt", href: "/services/inspection-concrete-access#inspection-ndt", title: "Inspection & NDT", description: "Visual inspection, ultrasonic testing and material assessment to understand the condition of hard-to-reach structures.", label: "Understand the structure" },
  { id: "concrete-services", href: "/services/inspection-concrete-access#concrete-services", title: "Concrete Services", description: "Concrete surveys, testing, repairs and protective treatments for demanding industrial structures.", label: "Protect structural integrity" },
  { id: "installations", href: "/services/inspection-concrete-access#installations", title: "Industrial Access", description: "Rigging, platforms, netting and height safety installations that make difficult work areas accessible.", label: "Make access possible" },
  { id: "maintenance", href: "/services/maintenance-confined-space-drone#maintenance", title: "Maintenance & Cleaning", description: "Facade maintenance, cleaning, protective coatings and repairs where conventional access is a challenge.", label: "Keep assets working" },
  { id: "confined-space", href: "/services/maintenance-confined-space-drone#confined-space", title: "Confined Space", description: "Consultation and rescue standby for work in confined environments, planned around the needs of the site.", label: "Plan for the environment" },
  { id: "drone-inspection", href: "/services/maintenance-confined-space-drone#drone-inspection", title: "Drone Inspection", description: "Indoor and outdoor inspection applications through the Sky I division, with the approach defined for each structure.", label: "See beyond the surface" },
] as const;

export const industries = [
  { id: "buildings-facades", title: "Buildings & Facades", short: ["Buildings", "& Facades"], icon: "building" },
  { id: "infrastructure-civil", title: "Infrastructure & Civil", short: ["Infrastructure", "& Civil"], icon: "bridge" },
  { id: "energy-renewables", title: "Energy & Renewables", short: ["Energy", "& Renewables"], icon: "energy" },
  { id: "industrial-process", title: "Industrial & Process", short: ["Industrial", "& Process"], icon: "industry" },
  { id: "mining-petrochemical", title: "Mining & Petrochemical", short: ["Mining &", "Petrochemical"], icon: "helmet" },
] as const;

export const heroImages = [
  { src: "/images/hero/hero-sa-urban-facade-01.webp", title: "Urban facade", alt: "Black and white rope-access colleagues inspecting a glass facade above an inland Johannesburg cityscape.", desktopPosition: "69% 50%", mobilePosition: "67% 50%" },
  { src: "/images/hero/hero-sa-industrial-tower-02.webp", title: "Industrial tower", alt: "White rope-access inspector and Black colleague working on the concrete exterior of an inland South African industrial tower.", desktopPosition: "64% 50%", mobilePosition: "65% 50%" },
  { src: "/images/hero/hero-sa-steel-structure-03.webp", title: "Steel structure", alt: "Black and white South African technicians inspecting a steel gantry on separate rope-access lines.", desktopPosition: "63% 50%", mobilePosition: "62% 50%" },
] as const;

export const heroServiceTiles = [
  { title: ["Industrial", "Access"], href: "/services/inspection-concrete-access#installations", image: "/images/hero/hero-support-inspection.webp" },
  { title: ["Inspection", "& NDT"], href: "/services/inspection-concrete-access#inspection-ndt", image: "/images/hero/hero-support-infrastructure.webp" },
  { title: ["Facade", "Maintenance"], href: "/services/maintenance-confined-space-drone#maintenance", image: "/images/hero/hero-support-team.webp" },
] as const;
