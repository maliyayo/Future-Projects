"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Athlete } from "@/lib/athletes";
import { MaskLines, ease } from "../motion";

export function AthleteHero({ a }: { a: Athlete }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const numY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-obsidian pt-28">
      <motion.span aria-hidden style={reduce ? undefined : { y: numY }}
        className="pointer-events-none absolute -right-[4vw] top-10 -z-10 select-none font-serif text-[clamp(280px,48vw,760px)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(200,169,110,0.28)]">
        {a.number}
      </motion.span>

      <div className="wrap">
        <Link href="/#roster" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate transition-colors hover:text-gold">
          <ArrowLeft size={14} /> The Roster
        </Link>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="pb-4 lg:pb-16">
            <p className="eyebrow mb-6">{a.index}. · {a.league} · {a.position}</p>
            <h1 className="display text-[clamp(64px,10vw,168px)]">
              <MaskLines delay={0.3} lines={[a.first, <em key="l" className="text-gold">{a.last}</em>]} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.7 }} className="mt-8 max-w-lg text-lg text-alabaster/80">
              {a.dek}
            </motion.p>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t hairline pt-6 text-sm">
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">Most recent team</dt><dd className="mt-1">{a.team}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">College</dt><dd className="mt-1">{a.college}</dd></div>
            </motion.dl>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 1 }} className="mt-8 flex flex-wrap gap-2">
              {a.profiles.map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-xs text-alabaster/80 transition-colors hover:border-gold hover:text-gold">
                  {p.label} <ArrowUpRight size={12} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
            <motion.div className="absolute inset-[-6%_0]" style={reduce ? undefined : { y: imgY }}>
              <Image src={a.portrait} alt={a.portraitAlt} fill priority sizes="(min-width:1024px) 52vw, 100vw" className="object-cover" style={{ objectPosition: a.heroFocus }} />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(9,9,11,0.85))]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <span className="rounded-full border border-gold/50 bg-obsidian/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur">No. {a.number} · {a.numberNote}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
