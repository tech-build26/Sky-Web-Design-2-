import styles from "./about-testimonials.module.css";

type Testimonial = {
  sector: string;
  scope: string;
  quote: string;
};

// Illustrative copy only. Replace with approved, attributable client feedback before publication.
const testimonials: Testimonial[] = [
  { sector: "Industrial facilities", scope: "Site planning", quote: "The team took time to understand the asset and the operating constraints before proposing an access method. That made the work easier to plan around." },
  { sector: "Power generation", scope: "Inspection access", quote: "Access to the high and confined areas was the main challenge. A clear method and a focused crew helped us keep the inspection moving." },
  { sector: "Commercial property", scope: "Façade maintenance", quote: "We needed the exterior work done without turning the whole site into a construction zone. The access plan made a practical difference." },
  { sector: "Mining operations", scope: "Shutdown support", quote: "The crew understood that every hour in the shutdown mattered. Their preparation gave our maintenance team a workable sequence from the start." },
  { sector: "Petrochemical sites", scope: "Safety coordination", quote: "Permits, inductions and site controls were discussed early. That helped our supervisors see how the rope access work would fit into the wider job." },
  { sector: "Infrastructure", scope: "Concrete inspection", quote: "The difficult part was reaching the underside of the structure safely. The proposed approach gave us a way to inspect it without a large temporary platform." },
  { sector: "Manufacturing", scope: "High-level repairs", quote: "The team worked around our production areas with a clear scope and regular communication. We always knew what was happening above the floor." },
  { sector: "Facilities management", scope: "Building envelope", quote: "A site walkdown brought the access issues into focus. It was useful to talk through the work with people who understood both the building and the practical constraints." },
  { sector: "Energy assets", scope: "Condition assessment", quote: "The inspection points were awkward to reach, but the team had a sensible plan for each area. That gave us better information for the next maintenance decision." },
  { sector: "Industrial maintenance", scope: "Coating preparation", quote: "We valued the attention to surface access and sequencing. The work could be discussed as a complete maintenance task, not just a way to get technicians up there." },
  { sector: "Property operations", scope: "Roof and cladding", quote: "The crew explained the access setup and the work area clearly. It helped us coordinate occupants and keep the rest of the property functioning." },
  { sector: "Project delivery", scope: "Technical response", quote: "We had a complex access problem and needed a practical starting point. The early technical conversation helped us define the scope before committing to a method." },
];

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return <article className={styles.card}>
    <div className={styles.cardTop}><span>{item.sector}</span><span>{String(index + 1).padStart(2, "0")} / 12</span></div>
    <blockquote>“{item.quote}”</blockquote>
    <p className={styles.scope}>{item.scope}</p>
  </article>;
}

function Column({ items, reverse = false }: { items: { item: Testimonial; index: number }[]; reverse?: boolean }) {
  return <div className={`${styles.column} ${reverse ? styles.reverse : ""}`} role="group" aria-label="Testimonial column" tabIndex={0}>
    <div className={styles.track}>
      <div className={styles.group}>{items.map(({ item, index }) => <TestimonialCard key={index} item={item} index={index} />)}</div>
      <div className={styles.group} aria-hidden="true">{items.map(({ item, index }) => <TestimonialCard key={index} item={item} index={index} />)}</div>
    </div>
  </div>;
}

const indexed = testimonials.map((item, index) => ({ item, index }));

export function AboutTestimonials() {
  return <section className={styles.section} aria-labelledby="testimonials-heading">
    <div className={styles.inner}>
      <div className={styles.intro}>
        <p className={styles.kicker}>05 / Client perspectives <span aria-hidden="true" /></p>
        <h2 id="testimonials-heading">The details clients<br /><em>remember.</em></h2>
        <p className={styles.description}>Access is only part of the job. Planning, coordination and clear communication matter from first walkdown to handover.</p>
        <p className={styles.disclosure}>Sample testimonials for layout review. Replace with approved client quotes before publication.</p>
      </div>
      <div className={styles.marquee} aria-label="Twelve sample testimonials">
        <div className={styles.desktopColumns}>
          {[0, 1, 2].map((column) => <Column key={column} items={indexed.filter(({ index }) => index % 3 === column)} reverse={column === 1} />)}
        </div>
        <div className={styles.tabletColumns}>
          {[0, 1].map((column) => <Column key={column} items={indexed.filter(({ index }) => index % 2 === column)} reverse={column === 1} />)}
        </div>
        <div className={styles.mobileColumns}><Column items={indexed} /></div>
      </div>
    </div>
  </section>;
}
