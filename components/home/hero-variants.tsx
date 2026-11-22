"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { MaskLines, Magnetic, ease } from "../motion";
import { useInquiry } from "../inquiry";
import { athletes } from "@/lib/athletes";

function Ctas({ light = false }: { light?: boolean }) {
  const { openInquiry } = useInquiry();
  return (
    <div className="flex flex-wrap gap-3">
      <Magnetic>
        <Link href="/#roster" className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 font-medium transition-colors duration-500 ${light ? "bg-obsidian text-paper hover:bg-carbon" : "bg-gold text-obsidian hover:bg-gold-soft"}`}>
          Explore the Roster <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </Magnetic>
      <Magnetic>
        <button onClick={() => openInquiry({ type: "Representation" })}
          className={`inline-flex items-center gap-3 rounded-full border px-7 py-4 transition-colors duration-500 ${light ? "border-obsidian/30 text-obsidian hover:border-obsidian" : "border-alabaster/30 text-alabaster hover:border-alabaster hover:bg-alabaster hover:text-obsidian"}`}>
          Partner With IAG
        </button>
      </Magnetic>
    </div>
  );
}

const Video = ({ className = "" }: { className?: string }) => (
  <video className={`h-full w-full object-cover ${className}`} autoPlay muted loop playsInline preload="auto" poster="/img/hero-wide-poster.webp" aria-hidden>
    <source src="/video/hero-wide.mp4" type="video/mp4" />
  </video>
);

/* B · Split editorial: headline panel left, framed video right with live client stats. */
export function HeroSplit() {
  return (
    <section className="relative grid min-h-[100svh] bg-obsidian pt-24 lg:grid-cols-[1fr_1fr]" aria-label="Introduction">
      <div className="wrap flex flex-col justify-end pb-14 pt-16 lg:!pr-10 lg:pb-20">
        <p className="eyebrow mb-8 flex items-center gap-3"><span className="h-px w-10 bg-gold" /> NFLPA Certified · Miami, FL</p>
        <h1 className="display text-[clamp(52px,7vw,120px)]">
          <MaskLines delay={0.4} lines={["Your career", "is a business.", <em key="e" className="text-gold">We run it like one.</em>]} />
        </h1>
        <p className="mt-8 max-w-lg text-lg text-alabaster/75">Boutique, hands-on representation from Shaheed Samuel: contracts, brand, community and wealth, built into one plan around you.</p>
        <div className="mt-10"><Ctas /></div>
      </div>
      <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ duration: 1.4, ease, delay: 0.2 }}
        className="relative min-h-[60vh] overflow-hidden lg:m-4 lg:ml-0 lg:min-h-0">
        <Video />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(9,9,11,0.9))]" />
        <div className="absolute inset-x-6 bottom-6 grid grid-cols-2 gap-px border hairline bg-white/10 backdrop-blur">
          {[["UDFA → $10.5M", "Quinton Dunbar, Washington"], ["270 · 3,830", "Rashad Greene, FSU record holder"]].map(([v, l]) => (
            <div key={l} className="bg-obsidian/70 p-5">
              <span className="block font-mono text-xl text-gold tabular-nums">{v}</span>
              <span className="text-xs text-slate">{l}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* C · Monumental centered: giant outline wordmark, arched video portal, centered headline. */
export function HeroPortal() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden bg-obsidian pt-28 text-center" aria-label="Introduction">
      <span aria-hidden className="pointer-events-none absolute top-[9%] -z-10 select-none font-serif text-[30vw] leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(200,169,110,0.16)]">Infinity</span>
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease }}
        className="relative mt-6 h-[38vh] w-[min(420px,72vw)] overflow-hidden rounded-t-full border border-gold/40">
        <Video />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(9,9,11,0.55))]" />
      </motion.div>
      <div className="wrap mt-10 flex flex-col items-center pb-16">
        <p className="eyebrow mb-6">Infinity Athletic Group · Miami, FL</p>
        <h1 className="display max-w-[16ch] text-[clamp(44px,6.4vw,104px)]">
          <MaskLines delay={0.5} lines={["On the field. Off the field.", <em key="e" className="text-gold">And beyond.</em>]} />
        </h1>
        <p className="mt-6 max-w-xl text-lg text-alabaster/75">A boutique sports agency led by NFLPA Certified Contract Advisor Shaheed Samuel, building careers that last long after the final whistle.</p>
        <div className="mt-10 flex justify-center"><Ctas /></div>
        <ArrowDown size={18} className="mt-10 animate-bounce text-gold" />
      </div>
    </section>
  );
}

/* D · Roster-led: the two clients as full-height duotone panels with the headline across them. */
export function HeroRoster() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-obsidian" aria-label="Introduction">
      <div className="absolute inset-0 -z-10 grid grid-cols-2">
        {athletes.map((a, i) => (
          <motion.div key={a.slug} initial={{ y: i ? "-100%" : "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, ease, delay: 0.1 * i }} className="relative overflow-hidden">
            <Image src={a.altImage} alt="" fill priority sizes="50vw" className="object-cover opacity-60 grayscale" style={{ objectPosition: "50% 20%" }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.3),rgba(9,9,11,0.95))] mix-blend-multiply" />
            <div className="absolute inset-0 bg-gold/10 mix-blend-color" />
            <Link href={`/athletes/${a.slug}`} className="absolute bottom-8 left-6 right-6 hidden text-left sm:block">
              <span className="index-num text-xs">{a.index}.</span>
              <span className="display mt-1 block text-3xl">{a.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">{a.position.split(" · ")[0]} · {a.teamShort}</span>
            </Link>
          </motion.div>
        ))}
        <span className="absolute inset-y-0 left-1/2 hidden w-px bg-gold/40 sm:block" />
      </div>
      <div className="wrap flex min-h-[100svh] flex-col items-center justify-center pb-24 pt-32 text-center">
        <p className="eyebrow mb-8">The IAG Roster</p>
        <h1 className="display max-w-[15ch] text-[clamp(52px,8vw,136px)]">
          <MaskLines delay={0.6} lines={["Proven on Sundays.", <em key="e" className="text-gold">Built for what&apos;s next.</em>]} />
        </h1>
        <p className="mt-8 max-w-xl text-lg text-alabaster/80">An undrafted rookie turned starting cornerback. A national champion and record-holder. Represented by Infinity Athletic Group.</p>
        <div className="mt-10 flex justify-center"><Ctas /></div>
      </div>
    </section>
  );
}

/* E · Light editorial: paper background, black serif headline, cinematic letterbox video strip. */
export function HeroLight() {
  return (
    <section className="relative bg-paper pt-32 text-obsidian" aria-label="Introduction">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[84px] bg-obsidian" />
      <div className="wrap grid gap-10 pb-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <h1 className="display text-[clamp(52px,8.6vw,148px)]">
          <MaskLines delay={0.3} lines={["The agency", <>built around <em className="text-gold-deep">you.</em></>]} />
        </h1>
        <div className="pb-3">
          <p className="mb-8 text-lg text-obsidian/70">Infinity Athletic Group is a Miami boutique agency led by NFLPA Certified Contract Advisor Shaheed Samuel. Contracts, brand, community and wealth: one plan, one team.</p>
          <Ctas light />
        </div>
      </div>
      <motion.div initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ duration: 1.5, ease, delay: 0.4 }}
        className="relative aspect-[21/9] w-full overflow-hidden bg-obsidian sm:aspect-[2.6/1]">
        <Video />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(transparent,rgba(9,9,11,0.8))] px-[clamp(16px,4vw,56px)] pb-5 pt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
          <span>NFLPA Certified · Since 2012</span><span className="hidden sm:inline">Miami · National reach</span>
        </div>
      </motion.div>
    </section>
  );
}
