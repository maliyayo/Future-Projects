import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { pillars, getPillar } from "@/lib/pillars";
import { PageHero, Checklist, MorePillars } from "@/components/page-parts";
import { Reveal } from "@/components/motion";
import { InquireButton } from "@/components/inquire-button";

export const dynamicParams = false;
export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPillar((await params).slug);
  return p ? { title: p.title, description: p.lede, openGraph: { images: [p.image] } } : {};
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPillar((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero eyebrow={`Four Pillars · ${p.n}. ${p.title}`} lead={p.headline.lead} em={p.headline.em} lede={p.lede} image={p.image} imageAlt={p.alt} focus={p.focus} />

      <section className="bg-obsidian py-24 sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">The approach</p>
            <div className="grid gap-6 font-serif text-[clamp(22px,2vw,28px)] leading-snug text-alabaster/90">
              {p.intro.map((t, i) => <Reveal as="p" key={i} delay={i * 0.08}>{t}</Reveal>)}
            </div>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden lg:mt-12">
            <Image src={p.image} alt={p.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: p.focus }} />
            <span className="display absolute bottom-6 left-6 text-[110px] leading-none text-gold">{p.n}</span>
          </Reveal>
        </div>
      </section>

      <section className="border-y hairline bg-carbon py-24 sm:py-32">
        <div className="wrap">
          <p className="eyebrow mb-6">What&apos;s included</p>
          <h2 className="display mb-14 text-[clamp(40px,5vw,80px)]">Everything in <em className="text-gold">{p.short.toLowerCase()}.</em></h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {p.included.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.08}>
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate">{String(i + 1).padStart(2, "0")} · {g.group}</p>
                <Checklist items={g.items} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24 sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-6">How it works</p>
            <h2 className="display text-[clamp(40px,5vw,80px)]">Three steps. <em className="text-gold">One plan.</em></h2>
            <ul className="mt-10 grid gap-3">
              {p.outcomes.map((o) => <li key={o} className="flex gap-3 text-alabaster/80"><span className="mt-3 h-px w-5 shrink-0 bg-gold" />{o}</li>)}
            </ul>
          </div>
          <ol className="grid gap-px border hairline bg-white/10">
            {p.steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="group bg-obsidian p-8 transition-colors duration-500 hover:bg-graphite">
                <span className="index-num text-xs">0{i + 1}.</span>
                <h3 className="display mt-4 text-4xl">{s.t}</h3>
                <p className="mt-3 text-slate">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {p.proof && (
        <section className="border-t hairline bg-carbon py-20">
          <div className="wrap flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5">From the roster</p>
              <p className="display text-[clamp(28px,3.4vw,48px)] leading-[1.08]">{p.proof.line}</p>
            </div>
            <Link href={`/athletes/${p.proof.slug}`} className="group inline-flex items-center gap-3 rounded-full border border-gold px-7 py-4 text-gold transition-colors hover:bg-gold hover:text-obsidian">
              {p.proof.athlete}&apos;s profile <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      )}

      <section className="bg-gold text-obsidian">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center">
          <h2 className="display max-w-3xl text-[clamp(30px,3.6vw,54px)] leading-[1.02]">Talk to Shaheed about <em>{p.title.toLowerCase()}.</em></h2>
          <InquireButton type={p.slug === "brand" ? "Endorsement / Sponsorship" : p.slug === "community" ? "Camp / Community Event" : "Representation"} label="Start the conversation" />
        </div>
      </section>

      <MorePillars exclude={p.slug} />
    </>
  );
}
