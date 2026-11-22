"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { MaskLines, Magnetic, ease } from "../motion";
import { useInquiry } from "../inquiry";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { openInquiry } = useInquiry();

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-obsidian" aria-label="Introduction">
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { scale, y }}>
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/img/hero-wide-poster.webp" aria-hidden>
          <source src="/video/hero-wide.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,9,11,0.55)_0%,rgba(9,9,11,0.35)_40%,rgba(9,9,11,0.96)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_0%_100%,rgba(9,9,11,0.9),transparent)]" />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="wrap relative pb-16 pt-40 sm:pb-20">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }} className="eyebrow mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-gold" /> Infinity Athletic Group · Miami, FL
        </motion.p>
        <h1 className="display max-w-[14ch] text-[clamp(52px,9.4vw,152px)]">
          <MaskLines delay={0.6} lines={["Built around", <>the athlete. <em className="text-gold">Run</em></>, <><em className="text-gold">like a business.</em></>]} />
        </h1>

        <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.1 }}
            className="max-w-xl text-lg leading-relaxed text-alabaster/80">
            A boutique, hands-on sports agency. Led by NFLPA-certified agent Shaheed Samuel, Infinity Athletic Group handles contract negotiation, brand architecture and post-career wealth for every athlete it represents.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.25 }} className="flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/#roster" className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-medium text-obsidian transition-colors duration-500 hover:bg-gold-soft">
                Explore the Roster <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <button onClick={() => openInquiry({ type: "Representation" })} className="inline-flex items-center gap-3 rounded-full border border-alabaster/30 px-7 py-4 text-alabaster transition-colors duration-500 hover:border-alabaster hover:bg-alabaster hover:text-obsidian">
                Partner With IAG
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex items-center justify-between border-t hairline pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
          <span>NFLPA Certified · Since 2012</span>
          <Link href="/#impact" className="flex items-center gap-2 hover:text-alabaster">Scroll <ArrowDown size={14} className="animate-bounce" /></Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
