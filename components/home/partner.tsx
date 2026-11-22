import { InquiryForm } from "../inquiry";
import { MaskLines, Reveal } from "../motion";
import { site } from "@/lib/site";

const reasons = [
  { n: "01", t: "Authentic stories", d: "A national champion and record-holder, and an undrafted rookie who became a starting cornerback. Real narratives, not manufactured ones." },
  { n: "02", t: "Florida-rooted audiences", d: "Deep ties to Miami, Fort Lauderdale and Tallahassee, and to the Gator and Seminole fan bases." },
  { n: "03", t: "One accountable point of contact", d: `Every brand conversation runs directly through ${site.founder}. No layers, no hand-offs.` },
];

export function Partner() {
  return (
    <section id="contact" className="relative scroll-mt-24 bg-obsidian py-28 sm:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-6">Brands & Partnerships</p>
          <h2 className="display text-[clamp(40px,5.5vw,88px)]">
            <MaskLines lines={["Partner with", <em key="e" className="text-gold">IAG talent.</em>]} />
          </h2>
          <Reveal className="mt-8 max-w-md text-slate">
            Endorsements, appearances, camps, content and community programs, matched to athletes whose stories your audience already believes.
          </Reveal>
          <ul className="mt-12 grid gap-px border hairline bg-white/10">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.n} delay={i * 0.08} className="bg-obsidian p-6">
                <span className="index-num text-xs">{r.n}.</span>
                <h3 className="mt-3 text-lg text-alabaster">{r.t}</h3>
                <p className="mt-2 text-sm text-slate">{r.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="border hairline bg-carbon p-6 sm:p-10">
          <p className="eyebrow mb-2">Partnership & Representation Inquiry</p>
          <p className="mb-10 text-sm text-slate">All fields marked * are required.</p>
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
