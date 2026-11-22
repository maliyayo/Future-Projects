import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, MorePillars } from "@/components/page-parts";
import { Reveal } from "@/components/motion";
import { InquireButton } from "@/components/inquire-button";
import { FounderPortrait } from "@/components/founder-portrait";
import { founder } from "@/lib/founder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder Story · Shaheed Samuel",
  description: "The story behind Infinity Athletic Group and founder Shaheed Samuel, an NFLPA Certified Contract Advisor since 2012, based in Miami, FL.",
  openGraph: { images: [founder.photo] },
};

/* Bio is IAG's own published copy (lib/founder.ts). The chapters below use only verified facts. */
const chapters = [
  {
    h: "The credential",
    p: [
      "In 2012 Shaheed became an NFLPA Certified Contract Advisor, the credential required to negotiate player contracts in the National Football League.",
      "It is the foundation for everything IAG does: contract negotiation, draft preparation, grievances and appeals, handled with the same ethical standard every time.",
    ],
  },
  {
    h: "On the field and beyond",
    p: [
      "IAG has represented NFL talent including Quinton Dunbar, who went from undrafted receiver to starting cornerback in Washington, and Rashad Greene, Florida State's career receptions leader and a national champion drafted by Jacksonville.",
      "Today the work continues from Miami, built on one idea: the athlete is the CEO of their own enterprise, and the career is a platform for everything that comes after it.",
    ],
  },
];

export default function FounderPage() {
  return (
    <>
      <PageHero eyebrow="Founder Story" lead="It started with" em="a better standard."
        lede={`${founder.name} · Founder · NFLPA Certified Contract Advisor since 2012 · ${site.address.city}, ${site.address.region}`} />

      <section className="bg-paper py-24 text-obsidian sm:py-32" aria-labelledby="bio">
        <div className="wrap grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Reveal as="h2" className="display text-[clamp(44px,6vw,96px)]"><span id="bio">{founder.name}</span></Reveal>
            <Reveal as="p" className="mt-8 max-w-2xl font-serif text-[clamp(26px,2.6vw,38px)] font-semibold leading-tight">{founder.tagline}</Reveal>
            <span className="mt-8 block h-[2px] w-full max-w-xl bg-logo-red" />
            <div className="mt-10 grid max-w-2xl gap-6 text-[18px] leading-[1.8] text-obsidian/80">
              {founder.bio.map((t, i) => <Reveal as="p" key={i} delay={i * 0.06}>{t}</Reveal>)}
            </div>
          </div>
          <Reveal>
            <FounderPortrait className="aspect-[3/4] w-full" />
          </Reveal>
        </div>
      </section>

      <article className="border-t hairline-dark bg-paper pb-24 text-obsidian sm:pb-32">
        <div className="mx-auto max-w-[760px] px-[clamp(16px,4vw,56px)] pt-20">
          {chapters.map((c) => (
            <section key={c.h} className="mb-14">
              <Reveal as="h2" className="display mb-6 text-[clamp(30px,3.4vw,46px)]">{c.h}</Reveal>
              <div className="grid gap-5 text-[18px] leading-[1.8] text-obsidian/80">
                {c.p.map((t, k) => <Reveal as="p" key={k}>{t}</Reveal>)}
              </div>
            </section>
          ))}
          <div className="flex flex-wrap gap-3 border-t hairline-dark pt-10">
            <InquireButton type="Representation" label="Talk to Shaheed" />
            <Link href="/team" className="group inline-flex items-center gap-3 rounded-full border border-obsidian/30 px-8 py-5 transition-colors hover:border-obsidian">
              Meet the team <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>

      <MorePillars title="Explore the firm." />
    </>
  );
}
