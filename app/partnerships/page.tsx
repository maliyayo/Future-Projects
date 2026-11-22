import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Checklist } from "@/components/page-parts";
import { Reveal } from "@/components/motion";
import { InquireButton } from "@/components/inquire-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Partner with Infinity Athletic Group: brands and sponsors, advisors and professionals who serve athletes, and families of draft prospects.",
};

const sections = [
  {
    id: "brands",
    label: "Brands & Sponsors",
    title: <>Athletes your audience <em className="text-gold">already believes.</em></>,
    body: [
      "IAG clients bring authentic stories, from a national championship to an undrafted rookie who became a starting NFL cornerback, and deep roots in South Florida and the Gator and Seminole fan bases.",
      "We match partners with athletes whose values and audiences genuinely fit, then manage every detail from contract to activation, so the partnership performs for both sides.",
    ],
    list: ["Endorsements, sponsorships & licensing", "Personal appearances & speaking", "Camps, clinics & community activations", "Social content & media campaigns", "One point of contact for every deal"],
    image: "/img/basketball.webp",
    alt: "A player rising for a shot in front of a packed arena",
    type: "Endorsement / Sponsorship",
    cta: "Start a brand inquiry",
  },
  {
    id: "advisors",
    label: "Advisors & Professionals",
    title: <>One plan, <em className="text-gold">one team around the athlete.</em></>,
    body: [
      "Financial advisors, tax counsel, attorneys, trainers and medical professionals do their best work when everyone around the athlete is working from the same plan.",
      "IAG coordinates the team. We keep communication clean, timelines clear and decisions documented, so each professional can focus on their specialty and the athlete is never caught in the middle.",
    ],
    list: ["Coordination with wealth managers & tax counsel", "Medical, physical therapy & performance partners", "Clear ownership of every workstream", "Fewer surprises and faster decisions", "A shared long-term career blueprint"],
    image: "/img/stadium-night.webp",
    alt: "A stadium lit up at night",
    type: "Other",
    cta: "Introduce yourself",
  },
  {
    id: "families",
    label: "Families & Prospects",
    title: <>The road to the league <em className="text-gold">starts at home.</em></>,
    body: [
      "Choosing an agent is one of the most important decisions a young athlete and their family will make. IAG offers personalized attention, honest guidance and a plan that covers the draft and everything after it.",
      "From combine and pro-day preparation to the first contract, money management and life beyond football, families have a direct line to Shaheed Samuel at every step.",
    ],
    list: ["Pre-draft training, combine & pro-day preparation", "Draft strategy and contract negotiation", "Financial education for athletes and families", "Media training and brand building", "A direct line to an NFLPA Certified Contract Advisor"],
    image: "/img/sprint-start.webp",
    alt: "An athlete set in the starting blocks on a track",
    type: "Representation",
    cta: "Talk about representation",
  },
];

const steps = [
  { t: "Reach out", d: `Use the inquiry form or email ${site.email}. No gatekeepers; it comes straight to Shaheed.` },
  { t: "A real conversation", d: "We learn about the athlete, the brand or the family's goals. If it's a fit, we move quickly. If it's not, we'll say so honestly." },
  { t: "A clear proposal", d: "Scope, structure, timelines and who does what, put in writing before anyone commits." },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships" lead="Built on" em="real relationships."
        lede="Brands, advisors and families all want the same thing: an athlete who is prepared, protected and positioned to win. That's the work IAG does every day." />

      <nav aria-label="Partnership sections" className="sticky top-[84px] z-20 border-y hairline bg-obsidian/85 backdrop-blur-lg">
        <div className="wrap no-scrollbar flex gap-2 overflow-x-auto py-3">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border hairline px-4 py-2 text-sm text-alabaster/80 transition-colors hover:border-gold hover:text-gold">
              <span className="index-num mr-2 text-[10px]">0{i + 1}</span>{s.label}
            </a>
          ))}
        </div>
      </nav>

      {sections.map((s, i) => {
        const light = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-40 py-24 sm:py-32 ${light ? "bg-paper text-obsidian" : "bg-obsidian"}`}>
            <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className={`eyebrow mb-6 ${light ? "!text-gold-deep" : ""}`}>0{i + 1}. {s.label}</p>
                <h2 className={`display text-[clamp(38px,4.6vw,72px)] ${light ? "[&_em]:!text-gold-deep" : ""}`}>{s.title}</h2>
                <div className={`mt-8 grid gap-5 text-[17px] leading-[1.75] ${light ? "text-obsidian/75" : "text-alabaster/75"}`}>
                  {s.body.map((b, k) => <Reveal as="p" key={k}>{b}</Reveal>)}
                </div>
                <div className="mt-10"><InquireButton type={s.type} label={s.cta} variant={light ? "dark" : "gold"} /></div>
              </div>
              <div>
                <Reveal className="relative mb-10 aspect-[16/10] overflow-hidden">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                </Reveal>
                <Checklist items={s.list} dark={!light} />
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t hairline bg-carbon py-24 sm:py-32">
        <div className="wrap">
          <p className="eyebrow mb-6">Making an introduction</p>
          <h2 className="display mb-14 max-w-[18ch] text-[clamp(40px,5vw,80px)]">Most relationships start <em className="text-gold">with one message.</em></h2>
          <ol className="grid gap-px border hairline bg-white/10 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="bg-carbon p-8">
                <span className="index-num text-xs">0{i + 1}.</span>
                <h3 className="display mt-5 text-4xl">{s.t}</h3>
                <p className="mt-3 text-slate">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
