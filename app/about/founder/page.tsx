import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, MorePillars } from "@/components/page-parts";
import { Reveal } from "@/components/motion";
import { InquireButton } from "@/components/inquire-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder Story · Shaheed Samuel",
  description: "The story behind Infinity Athletic Group and founder Shaheed Samuel, an NFLPA Certified Contract Advisor since 2012, based in Miami, FL.",
};

/* Built only from verified facts and IAG's own published philosophy; no invented biography or quotes. */
const chapters = [
  {
    h: "Why Infinity Athletic Group exists",
    p: [
      "Infinity Athletic Group was built on a simple observation. Based on extensive market research, Shaheed Samuel saw a clear need in the industry for sports agents who are passionate, honest and dependable.",
      "Too many athletes were being treated as one name on a long roster. Shaheed built IAG to do the opposite: a boutique agency where personalized attention is the product, because every athlete is different.",
    ],
  },
  {
    h: "The CEO philosophy",
    p: [
      "At the center of everything IAG does is one idea: the athlete is the CEO of their own enterprise. A professional career is not just a contract. It is a platform, and an opportunity to expand into many other ventures in life.",
      "That is why IAG's work reaches beyond the field, into brand building, financial planning, community and post-career transition. The goal is a career that keeps paying off long after the final whistle.",
    ],
    quote: "Unboundedly formulating a blueprint for your professional athletic career and beyond.",
  },
  {
    h: "The standard",
    p: [
      "Shaheed believes his faith, wisdom, moral character, drive, work ethic and sense of loyalty set him apart. Those values define how IAG operates: never compromising its ethical standards, and never accepting less than the highest level of success for the people it represents.",
      "In 2012 he became an NFLPA Certified Contract Advisor, the credential required to negotiate player contracts in the National Football League.",
    ],
  },
  {
    h: "On the field and beyond",
    p: [
      "IAG has represented NFL talent including Quinton Dunbar, who went from undrafted receiver to starting cornerback in Washington, and Rashad Greene, Florida State's career receptions leader and a national champion drafted by Jacksonville.",
      "Today the work continues from Miami: personally dedicated to the success of every individual IAG accepts the responsibility of representing, and to effectuating a plan for each athletic career and beyond.",
    ],
  },
];

export default function FounderPage() {
  return (
    <>
      <PageHero eyebrow="Founder Story" lead="It started with" em="a better standard."
        lede={`Shaheed Samuel · Founder · NFLPA Certified Contract Advisor since 2012 · ${site.address.city}, ${site.address.region}`} />

      <article className="bg-paper py-24 text-obsidian sm:py-32">
        <div className="mx-auto max-w-[760px] px-[clamp(16px,4vw,56px)]">
          <div className="mb-14 flex items-center gap-5 border-b hairline-dark pb-8">
            <span className="display grid h-16 w-16 shrink-0 place-items-center rounded-full bg-obsidian text-2xl text-gold">SS</span>
            <div>
              <p className="text-lg">Shaheed Samuel</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">Founder · Infinity Athletic Group</p>
            </div>
          </div>

          {chapters.map((c, i) => (
            <section key={c.h} className="mb-14">
              <Reveal as="h2" className="display mb-6 text-[clamp(30px,3.4vw,46px)]"><span className="index-num mr-3 align-middle text-sm !text-gold-deep">0{i + 1}.</span>{c.h}</Reveal>
              <div className="grid gap-5 text-[18px] leading-[1.8] text-obsidian/80">
                {c.p.map((t, k) => <Reveal as="p" key={k}>{t}</Reveal>)}
              </div>
              {c.quote && (
                <Reveal as="figure" className="my-12 border-l-2 border-gold-deep pl-8">
                  <blockquote className="display text-[clamp(30px,3.4vw,48px)] italic leading-[1.1]">&ldquo;{c.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">The IAG blueprint</figcaption>
                </Reveal>
              )}
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
