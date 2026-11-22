"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FounderPortrait } from "../founder-portrait";

const quote = "Unboundedly formulating a blueprint for your professional athletic career and beyond.";

export function PullQuote() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const words = quote.split(" ");
  return (
    <section ref={ref} className="relative overflow-hidden border-y hairline bg-carbon py-28 sm:py-40" aria-label="Founder's philosophy">
      <span aria-hidden className="pointer-events-none absolute -left-6 -top-24 font-serif text-[420px] leading-none text-gold/10">&ldquo;</span>
      <div className="wrap relative grid items-end gap-14 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
        <p className="eyebrow mb-10">The IAG Philosophy</p>
        <blockquote>
          <p className="display max-w-[22ch] text-[clamp(36px,5.4vw,88px)] italic leading-[1.02]">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce}>{w}</Word>
            ))}
          </p>
          <footer className="mt-12 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <cite className="not-italic">
              <span className="block text-alabaster">Shaheed Samuel</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">Founder · NFLPA Certified Contract Advisor</span>
            </cite>
          </footer>
        </blockquote>
        <p className="mt-16 max-w-2xl border-l border-gold/40 pl-6 text-lg text-alabaster/70">
          &ldquo;You are the CEO of your own enterprise. Being a professional athlete is an opportunity to expand into many other ventures in life.&rdquo;
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-slate">The IAG philosophy, as Shaheed teaches it to every client</span>
        </p>
        </div>
        <FounderPortrait className="hidden aspect-[3/4] w-full lg:block" />
      </div>
    </section>
  );
}

function Word({ children, progress, range, reduce }: { children: string; progress: import("framer-motion").MotionValue<number>; range: [number, number]; reduce: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={reduce ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}
