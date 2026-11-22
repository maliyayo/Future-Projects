"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Milestone } from "@/lib/athletes";
import { ease } from "../motion";

const eraLabel: Record<Milestone["era"], string> = { "high-school": "High School", college: "College", pro: "NFL", beyond: "Beyond" };

/** Draggable career scrubber: range input over milestones, with clickable year stops. */
export function Timeline({ items }: { items: Milestone[] }) {
  const [i, setI] = useState(items.length - 1 > 3 ? 3 : 0);
  const id = useId();
  const m = items[i];
  const pct = (i / (items.length - 1)) * 100;

  return (
    <div>
      <div className="relative px-1 pb-2 pt-10">
        <div className="absolute left-1 right-1 top-[54px] h-px bg-obsidian/15" />
        <motion.div className="absolute left-1 top-[54px] h-px bg-gold-deep" animate={{ width: `calc(${pct}% - 0.5rem)` }} transition={{ duration: 0.6, ease }} />
        <ol className="relative flex justify-between">
          {items.map((it, k) => (
            <li key={k} className="flex flex-col items-center">
              <button onClick={() => setI(k)} aria-label={`${it.date ?? it.year}: ${it.title}`} aria-current={k === i ? "step" : undefined}
                className="group flex flex-col items-center gap-3">
                <span className={`font-mono text-[11px] tabular-nums transition-colors ${k === i ? "text-gold-deep" : "text-slate-dark group-hover:text-obsidian"}`}>{it.year}</span>
                <span className={`block h-3 w-3 rounded-full border transition-all duration-500 ${k <= i ? "border-gold-deep bg-gold-deep" : "border-obsidian/30 bg-paper"} ${k === i ? "scale-150" : ""}`} />
              </button>
            </li>
          ))}
        </ol>
      </div>
      <label htmlFor={`${id}-scrub`} className="sr-only">Scrub through career milestones</label>
      <input id={`${id}-scrub`} type="range" min={0} max={items.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))}
        className="mt-4 w-full cursor-grab accent-[#9c8048] active:cursor-grabbing" aria-valuetext={`${m.date ?? m.year}: ${m.title}`} />

      <div className="mt-10 grid gap-8 border-t hairline-dark pt-10 md:grid-cols-[auto_1fr]">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }} className="contents">
            <div>
              <span className="display block text-[clamp(64px,8vw,120px)] leading-none text-gold-deep tabular-nums">{m.year}</span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">{eraLabel[m.era]} · {m.date}</span>
            </div>
            <div className="self-end">
              <h3 className="display text-4xl">{m.title}</h3>
              <p className="mt-3 max-w-xl text-lg text-obsidian/70">{m.body}</p>
              <p className="mt-6 font-mono text-[11px] text-slate-dark">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
