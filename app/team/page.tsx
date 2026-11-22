import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-parts";
import { Reveal } from "@/components/motion";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "The Infinity Athletic Group team: PR, marketing, legal and client services professionals led by NFLPA Certified Contract Advisor Shaheed Samuel.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="The Team" lead="The people behind" em="every client."
        lede="IAG runs as one team behind every relationship: representation, PR, marketing, legal and client services, all working one plan." />

      <section className="bg-paper py-24 text-obsidian sm:py-32">
        <div className="wrap">
          <p className="eyebrow mb-8 !text-gold-deep">Founder</p>
          <Reveal>
            <Link href="/about/founder" className="group grid overflow-hidden border hairline-dark md:grid-cols-[0.8fr_1.2fr]">
              <div className="relative grid min-h-[320px] place-items-center bg-obsidian">
                <Image src="/img/stadium-night.webp" alt="" fill sizes="40vw" className="object-cover opacity-40 transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="display relative text-[140px] leading-none text-gold">SS</span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <h2 className="display text-[clamp(40px,4.6vw,72px)]">Shaheed <em className="text-gold-deep">Samuel</em></h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">Founder · NFLPA Certified Contract Advisor since 2012</p>
                <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-obsidian/75">
                  Shaheed founded Infinity Athletic Group to give athletes what the industry too often doesn&apos;t: passionate, honest and dependable representation, with personalized attention and a plan for the career and everything after it.
                </p>
                <span className="mt-8 inline-flex items-center gap-2">Read Shaheed&apos;s story <ArrowRight size={18} className="text-gold-deep transition-transform duration-500 group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>

          <p className="eyebrow mb-8 mt-24 !text-gold-deep">The team</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {team.map((t, i) => (
              <Reveal as="li" key={t.name} delay={(i % 5) * 0.06} className="group">
                <div className="relative aspect-square overflow-hidden bg-bone">
                  <Image src={t.img} alt={t.name} fill sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw" className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <h3 className="display mt-5 text-2xl leading-tight">{t.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-deep">{t.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-dark">{t.focus}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
