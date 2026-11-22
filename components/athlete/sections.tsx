"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Athlete } from "@/lib/athletes";
import { Counter, Magnetic, Reveal } from "../motion";
import { useInquiry } from "../inquiry";

export function Vitals({ a }: { a: Athlete }) {
  return (
    <section aria-label="At a glance" className="border-y hairline bg-carbon">
      <div className="wrap">
        <dl className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {a.vitals.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.05} className={`border-b hairline py-7 pr-4 xl:border-b-0 ${i % 2 ? "border-l pl-4 md:pl-6" : ""} ${i % 3 && i % 2 === 0 ? "md:border-l md:pl-6" : ""} ${i > 0 ? "xl:border-l xl:pl-6" : ""}`}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">{v.label}</dt>
              <dd className={`mt-2 text-lg ${v.label === "Representation" ? "text-gold" : "text-alabaster"}`}>{v.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Story({ a }: { a: Athlete }) {
  const [first, ...rest] = a.narrative;
  return (
    <section className="bg-obsidian py-24 sm:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-6">Career Narrative</p>
          <h2 className="display text-[clamp(40px,5vw,80px)]">{a.headline.lead}<br /><em className="text-gold">{a.headline.em}</em></h2>
          <ul className="mt-12 grid grid-cols-2 gap-px border hairline bg-white/10">
            {a.counters.map((c) => (
              <li key={c.label} className="bg-obsidian p-6">
                <Counter to={c.to} decimals={c.decimals} suffix={c.suffix} className="block font-mono text-4xl text-gold" />
                <span className="mt-2 block text-xs text-slate">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-[68ch]">
          <Reveal as="p" className="font-serif text-[clamp(24px,2.4vw,32px)] leading-snug text-alabaster first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[5.2em] first-letter:leading-[0.8] first-letter:text-gold">
            {first}
          </Reveal>
          <div className="mt-10 grid gap-6 text-[17px] leading-[1.75] text-alabaster/75">
            {rest.map((p, i) => (
              <Reveal as="p" key={i}>{p}</Reveal>
            ))}
          </div>
          {a.quote && (
            <Reveal as="figure" className="my-14 border-l border-gold pl-8">
              <blockquote className="display text-[clamp(30px,3.4vw,48px)] italic leading-[1.1]">&ldquo;{a.quote.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-slate">
                {a.quote.by} ·{" "}
                <a href={a.quote.href} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">{a.quote.source}</a>
              </figcaption>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function Brand({ a }: { a: Athlete }) {
  const { openInquiry } = useInquiry();
  return (
    <section className="bg-obsidian py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6">Off-Field · Brand & Community</p>
            <h2 className="display text-[clamp(40px,5vw,80px)]">The brand <em className="text-gold">behind the number.</em></h2>
          </div>
          <Reveal as="p" className="max-w-xl font-serif text-2xl italic leading-snug text-alabaster/85">{a.brand.ethos}</Reveal>
        </div>
        <div className="mt-16 grid gap-px border hairline bg-white/10 md:grid-cols-3">
          {a.brand.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="group relative bg-obsidian p-8 transition-colors duration-500 hover:bg-graphite">
              <span className="index-num text-xs">0{i + 1}.</span>
              <h3 className="display mt-6 text-3xl">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">{p.body}</p>
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="mr-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate">Partnership fit</span>
          {a.brand.fit.map((f) => (
            <button key={f} onClick={() => openInquiry({ athlete: a.slug, type: f.toLowerCase().includes("camp") ? "Camp / Community Event" : f.toLowerCase().includes("speak") ? "Appearance / Speaking" : "Endorsement / Sponsorship" })}
              className="rounded-full border hairline px-4 py-2 text-sm text-alabaster/85 transition-colors hover:border-gold hover:text-gold">
              {f}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Media({ a }: { a: Athlete }) {
  return (
    <section className="border-t hairline bg-carbon py-24 sm:py-32">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">Media & Press</p>
            <h2 className="display text-[clamp(40px,5vw,80px)]">In the <em className="text-gold">record.</em></h2>
          </div>
        </div>
        <ul className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.media.map((m, i) => {
            const big = m.image && i === 0;
            const inner = m.image ? (
              <figure className="group relative h-full min-h-[260px] overflow-hidden">
                <Image src={m.image} alt={m.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" style={{ objectPosition: a.heroFocus }} />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(9,9,11,0.9))] p-5 pt-16">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{m.kind}</span>
                  <span className="mt-1 block text-alabaster">{m.title}</span>
                </figcaption>
              </figure>
            ) : (
              <a href={m.href} target="_blank" rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between border hairline bg-obsidian p-6 transition-colors duration-500 hover:border-gold/60">
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {m.kind} · {m.source} <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </span>
                <span className="display mt-10 text-2xl leading-tight">{m.title}</span>
              </a>
            );
            return (
              <Reveal as="li" key={m.title} delay={(i % 4) * 0.06} className={big ? "sm:col-span-2 sm:row-span-2" : m.image ? "sm:col-span-2" : ""}>
                {inner}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function BookingBar({ a }: { a: Athlete }) {
  const { openInquiry } = useInquiry();
  return (
    <section className="relative overflow-hidden bg-gold text-obsidian">
      <div className="wrap flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center">
        <h2 className="display max-w-3xl text-[clamp(30px,3.6vw,54px)] leading-[1.02]">
          Inquire about appearances, endorsements & partnerships for <em>{a.name}</em>
        </h2>
        <Magnetic>
          <button onClick={() => openInquiry({ athlete: a.slug, type: "Endorsement / Sponsorship" })}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-obsidian px-8 py-5 text-paper transition-colors hover:bg-carbon">
            Open inquiry <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </Magnetic>
      </div>
    </section>
  );
}

export function NextAthlete({ next }: { next: Athlete }) {
  return (
    <Link href={`/athletes/${next.slug}`} className="group relative block overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <Image src={next.portrait} alt="" fill sizes="100vw" className="object-cover opacity-30 grayscale transition duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0" style={{ objectPosition: next.heroFocus }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.95),rgba(9,9,11,0.4))]" />
      </div>
      <div className="wrap relative flex flex-wrap items-end justify-between gap-8 py-24 sm:py-32">
        <div>
          <p className="eyebrow mb-5">Next Athlete · {next.index}.</p>
          <p className="display text-[clamp(52px,8vw,136px)]">{next.first} <em className="text-gold">{next.last}</em></p>
          <p className="mt-4 text-slate">{next.position} · {next.college}</p>
        </div>
        <motion.span className="grid h-20 w-20 place-items-center rounded-full border border-gold text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-obsidian">
          <ArrowRight size={28} className="transition-transform duration-500 group-hover:translate-x-1" />
        </motion.span>
      </div>
    </Link>
  );
}
