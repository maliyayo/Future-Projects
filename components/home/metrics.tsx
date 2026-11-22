import { Reveal } from "../motion";

const items = [
  { n: "01", title: "NFLPA Certified Representation", body: "Shaheed Samuel has been an NFLPA Certified Contract Advisor since 2012." },
  { n: "02", title: "360° Career & Brand Management", body: "Contracts, marketing, training, health and wealth, run from one plan." },
  { n: "03", title: "Miami Roots · National Reach", body: "Headquartered in Miami, with clients drafted and signed across the league." },
  { n: "04", title: "24/7 Concierge & Off-Field Strategy", body: "Relocation, travel, tax coordination and life after football." },
];

export function Metrics() {
  return (
    <section id="impact" aria-label="Agency pillars" className="relative border-y hairline bg-carbon">
      <div className="wrap">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.n} delay={i * 0.08}
              className={`group relative border-b hairline px-0 py-10 sm:px-8 lg:border-b-0 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""} ${i === 0 ? "sm:pl-0" : ""}`}>
              <span className="index-num text-xs">{it.n}.</span>
              <h3 className="display mt-6 text-[28px] leading-[1.05]">{it.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">{it.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
