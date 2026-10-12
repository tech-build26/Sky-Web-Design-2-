export type IndustryDetail = {
  id: string;
  title: string;
  kicker: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
  assets: readonly string[];
  focus: readonly { title: string; copy: string }[];
  services: readonly { title: string; href: string }[];
  planning: string;
};

export const industryDetails: readonly IndustryDetail[] = [
  {
    id: "buildings-facades",
    title: "Buildings & Facades",
    kicker: "The occupied environment",
    lead: "Keep the envelope sound without losing sight of the people below.",
    body: "Facades, roofs and external features need close inspection and targeted upkeep. Skyriders plans access around the building's shape, its occupants and the public interface, then reaches the workface for condition surveys, cleaning, repairs and protective work.",
    image: "/images/about/about-johannesburg-facade.webp",
    alt: "Rope access technician inspecting a high-rise facade above Johannesburg.",
    assets: ["High-rise facades", "Roofs & cladding", "Window systems", "Height safety anchors"],
    focus: [
      { title: "See the condition", copy: "Inspect facade elements, roofs and difficult edges before defining the repair scope." },
      { title: "Maintain the envelope", copy: "Plan cleaning, waterproofing, coating and localised repairs around building operations." },
    ],
    services: [
      { title: "Maintenance & cleaning", href: "/services/maintenance-confined-space-drone#maintenance" },
      { title: "Industrial access", href: "/services/inspection-concrete-access#installations" },
      { title: "Drone inspection", href: "/services/maintenance-confined-space-drone#drone-inspection" },
    ],
    planning: "Occupant movements, exclusion zones, anchor points and weather exposure shape the access plan.",
  },
  {
    id: "infrastructure-civil",
    title: "Infrastructure & Civil",
    kicker: "Structures that serve everyone",
    lead: "Understand deterioration before it becomes a larger intervention.",
    body: "Bridge elements, reservoirs, dam walls and other civil structures can hide defects at their least accessible faces. Close visual surveys, concrete testing and remote imagery help define what needs repair; rope access or a purpose-built platform can then bring the team to the precise location.",
    image: "/images/hero/hero-support-infrastructure.webp",
    alt: "Elevated concrete bridge with hard-to-reach underside and supports.",
    assets: ["Bridges & elevated spans", "Reservoirs", "Dam walls", "Concrete towers & stacks"],
    focus: [
      { title: "Investigate", copy: "Document concrete, steel and coating condition at difficult faces and connections." },
      { title: "Intervene", copy: "Scope concrete repairs, joint sealing, protective treatments or access installations." },
    ],
    services: [
      { title: "Concrete services", href: "/services/inspection-concrete-access#concrete-services" },
      { title: "Inspection & NDT", href: "/services/inspection-concrete-access#inspection-ndt" },
      { title: "Drone inspection", href: "/services/maintenance-confined-space-drone#drone-inspection" },
    ],
    planning: "Traffic, water, adjacent operations and the structure's load and access constraints are considered before work starts.",
  },
  {
    id: "energy-renewables",
    title: "Energy & Renewables",
    kicker: "Generation in every form",
    lead: "Match the inspection window to the asset and the operating plan.",
    body: "Generation assets range from cooling towers and boiler internals to exposed structures at wind and solar sites. Skyriders' established power-generation work combines rope access, inspection, concrete care and remote visual surveys. For renewable assets, the team assesses the specific structure, task and site requirements before confirming an access method.",
    image: "/images/services/services-cooling-tower.webp",
    alt: "Interior of a large concrete power-station cooling tower.",
    assets: ["Cooling towers", "Boilers & ducts", "Stacks & silos", "Wind & solar support structures"],
    focus: [
      { title: "Power generation", copy: "Survey towers, stacks, ducts and boiler areas, then plan repairs or maintenance around outage windows." },
      { title: "Renewable sites", copy: "Assess elevated or remote structures for suitable inspection and maintenance access, with site-specific competency and weather requirements agreed first." },
    ],
    services: [
      { title: "Inspection & NDT", href: "/services/inspection-concrete-access#inspection-ndt" },
      { title: "Concrete services", href: "/services/inspection-concrete-access#concrete-services" },
      { title: "Drone inspection", href: "/services/maintenance-confined-space-drone#drone-inspection" },
    ],
    planning: "Outage windows, isolation, rescue arrangements and environmental conditions need to be agreed for each asset.",
  },
  {
    id: "industrial-process",
    title: "Industrial & Process",
    kicker: "Working plant, complex geometry",
    lead: "Reach the component without losing the context of the plant.",
    body: "Cement, steel and general engineering facilities bring together tall vessels, dense pipework, conveyors, ducts and elevated steel. Skyriders can inspect condition, create access, clean or repair selected areas and document the work so the next maintenance decision has a sound basis.",
    image: "/images/about/partner-industrial-silo.webp",
    alt: "Large concrete silo and elevated access walkways at an industrial plant.",
    assets: ["Silos & bunkers", "Ducting & stacks", "Elevated steelwork", "Pipes & hangers"],
    focus: [
      { title: "Find the issue", copy: "Visual and NDT surveys can locate defects in steel, concrete, coatings and process components." },
      { title: "Get the work done", copy: "Use planned access for cleaning, bolting, coating, welding or local repairs where appropriate." },
    ],
    services: [
      { title: "Inspection & NDT", href: "/services/inspection-concrete-access#inspection-ndt" },
      { title: "Industrial access", href: "/services/inspection-concrete-access#installations" },
      { title: "Maintenance & cleaning", href: "/services/maintenance-confined-space-drone#maintenance" },
    ],
    planning: "Operating equipment, stored material, permits and shutdown interfaces determine the safe work sequence.",
  },
  {
    id: "mining-petrochemical",
    title: "Mining & Petrochemical",
    kicker: "High-consequence environments",
    lead: "Coordinate access, inspection and maintenance with the site's controls.",
    body: "Mining and petrochemical assets share difficult access, but their hazards and work controls differ. Skyriders has worked on elevated mine structures and petrochemical plant, including inspection, cleaning, protective coatings and deluge-system maintenance. Each scope is defined with the client's permit, isolation and emergency arrangements.",
    image: "/images/hero/hero-sa-steel-structure-03.webp",
    alt: "Rope access technicians inspecting elevated steelwork at a heavy industrial site.",
    assets: ["Mine steelwork & conveyors", "Storage tanks", "Flare stacks", "Deluge systems"],
    focus: [
      { title: "Mining", copy: "Inspect and maintain high steelwork, stacks, silos and hard-to-reach plant while coordinating with production." },
      { title: "Petrochemical", copy: "Plan tank, pipework, flare and fire-water-system work around isolation, atmosphere and surface requirements." },
    ],
    services: [
      { title: "Inspection & NDT", href: "/services/inspection-concrete-access#inspection-ndt" },
      { title: "Maintenance & cleaning", href: "/services/maintenance-confined-space-drone#maintenance" },
      { title: "Confined space", href: "/services/maintenance-confined-space-drone#confined-space" },
    ],
    planning: "Permit-to-work, isolation, atmospheric conditions and rescue readiness are established with the site team.",
  },
];
