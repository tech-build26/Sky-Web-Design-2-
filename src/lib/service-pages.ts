import type { enquiryServices } from "./contact";

export type ServiceDetail = {
  id: string;
  title: string;
  kicker: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
  enquiryService: (typeof enquiryServices)[number];
  capabilities: readonly string[];
  applications: string;
  spotlight?: { id: string; title: string; body: string };
};

export const servicePages = {
  structures: {
    path: "/services/inspection-concrete-access",
    eyebrow: "01 / Technical services",
    title: "Know the structure. Reach the work.",
    accent: "Reach the work.",
    intro: "Inspection, concrete care and engineered access brought together for structures that conventional methods struggle to reach.",
    services: [
      {
        id: "inspection-ndt",
        title: "Inspection & NDT",
        kicker: "Evidence before intervention",
        lead: "See the condition of the asset before deciding what comes next.",
        body: "Skyriders combines visual assessment with non-destructive testing for steel, concrete and process equipment. Access is planned around the inspection scope, so the team can capture useful evidence at difficult locations without unnecessary temporary works.",
        image: "/images/services/inspection-ndt.webp",
        alt: "Ultrasonic testing probe and instrument measuring a steel pipe spool during an industrial inspection.",
        enquiryService: "Inspection & NDT",
        capabilities: ["Visual, photographic and thermal inspection", "Ultrasonic wall thickness and flaw detection", "Dye penetrant and magnetic particle testing", "Boroscope and endoscope inspection", "Pipe and hanger surveys", "Steel, concrete and coating condition surveys"],
        applications: "Power generation, petrochemical plants, cement and steel facilities, and general engineering assets.",
      },
      {
        id: "concrete-services",
        title: "Concrete Services",
        kicker: "Investigate, repair, protect",
        lead: "From core samples to a durable repair plan.",
        body: "Cooling towers, silos and chimney stacks demand a clear understanding of deterioration before repairs begin. The concrete service spans inspection and testing, localised repair, structural strengthening and protective treatments, with an access method matched to the structure.",
        image: "/images/services/concrete-services.webp",
        alt: "Concrete core samples and blocks beside a cover meter being used to inspect an industrial concrete structure.",
        enquiryService: "Concrete services",
        capabilities: ["Visual and structural integrity surveys", "Cover meter surveys and carbonation testing", "Core drilling and sample assessment", "Concrete and cosmetic repairs", "Structural strengthening", "Corrosion inhibitors, barrier coatings and joint sealing"],
        applications: "Concrete cooling towers, silos, chimney stacks and other hard-to-access civil structures.",
      },
      {
        id: "installations",
        title: "Industrial Access",
        kicker: "Create the route to the task",
        lead: "Access systems and installations designed around the work.",
        body: "Some scopes need more than a rope. Skyriders installs rigging, temporary or permanent platforms, netting and height safety systems that make inspection and maintenance possible, while also carrying out steel erection and bolting tasks where access is constrained.",
        image: "/images/services/industrial-access.webp",
        alt: "Torque wrench checking bolts beside a galvanized inspection platform and height safety anchors.",
        enquiryService: "Industrial access",
        capabilities: ["Temporary and permanent inspection platforms", "Temporary netting work platforms", "Safety net installations", "Rigging and access systems", "Steel erection and structural bolting", "Torque verification", "Height safety systems and anchors"],
        applications: "Industrial steelwork, elevated plant, ceiling voids, inspection positions and structures requiring planned work-at-height access.",
        spotlight: { id: "netting", title: "Netting systems for difficult access", body: "Where floor-supported or suspended scaffolding is impractical, a planned netting platform can create access to elevated work areas. Skyriders has installed a temporary system of steel cables and heavy-duty nets at Johannesburg’s Greenstone Shopping Centre so ceiling, fire protection, lighting and electrical contractors could reach the work area. Netting and rigging are specified for each site and task." },
      },
    ] satisfies readonly ServiceDetail[],
  },
  operations: {
    path: "/services/maintenance-confined-space-drone",
    eyebrow: "02 / Asset operations",
    title: "Keep assets ready. See further.",
    accent: "See further.",
    intro: "Maintenance, confined-space support and aerial inspection for environments where condition, continuity and safe access matter.",
    services: [
      {
        id: "maintenance",
        title: "Maintenance & Cleaning",
        kicker: "Protect asset performance",
        lead: "Targeted work where deterioration starts and downtime matters.",
        body: "Skyriders delivers cleaning, preparation, repairs and protective treatments on industrial structures and facades. Rope access can bring the team to a specific workface, while the method and equipment are selected for the surface and site requirements.",
        image: "/images/services/maintenance-cleaning.webp",
        alt: "Industrial storage tank surface being cleaned by high-pressure water jet, showing treated and untreated steel.",
        enquiryService: "Maintenance & cleaning",
        capabilities: ["High-pressure and ultra-high-pressure washing", "Industrial vacuum, silo and bunker cleaning", "Grit blasting and surface preparation", "Protective coating application", "Facade, window and roof maintenance", "Waterproofing, welding and deluge-system maintenance"],
        applications: "Storage tanks, silos, facades, roofs and process structures with difficult maintenance access.",
      },
      {
        id: "confined-space",
        title: "Confined Space",
        kicker: "Plan the entry and the response",
        lead: "Specialist standby and consultation before anyone enters.",
        body: "Confined-space work needs a site-specific approach to hazards, entry and emergency response. Skyriders supports clients with consultation and rescue standby, coordinated with the work plan and the conditions at the asset.",
        image: "/images/services/confined-space.webp",
        alt: "Rescue tripod, retrieval winch and standby specialist prepared at an industrial confined-space hatch.",
        enquiryService: "Confined space",
        capabilities: ["Confined-space consultation", "Rescue standby", "Entry and retrieval planning", "Site-specific hazard and access discussions"],
        applications: "Tanks, chambers, process plant and other restricted spaces in municipal, construction, oil and gas, and power-generation settings.",
      },
      {
        id: "drone-inspection",
        title: "Drone Inspection",
        kicker: "A different perspective",
        lead: "Inspect the asset before putting a person in the work area.",
        body: "The Sky I division uses remote visual inspection for outdoor structures and collision-tolerant drones for selected indoor or confined environments. The flight approach is assessed for each site, and imagery helps teams understand condition and plan any follow-up access.",
        image: "/images/services/drone-inspection.webp",
        alt: "Collision-tolerant inspection drone illuminating the interior of a large industrial boiler duct.",
        enquiryService: "Drone inspection",
        capabilities: ["Indoor boiler and duct inspection", "Cooling tower and smokestack surveys", "Silo and storage tank inspection", "Roof, reservoir and dam-wall inspection", "Thermal inspection applications", "Visual documentation for follow-up planning"],
        applications: "Power-station internals, ducts, stacks, tanks, silos, roofs and other large assets where remote vision adds value.",
      },
    ] satisfies readonly ServiceDetail[],
  },
} as const;
