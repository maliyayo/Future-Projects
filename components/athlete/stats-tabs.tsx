"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import type { Athlete, StatTable } from "@/lib/athletes";
import { ease } from "../motion";
import { Timeline } from "./timeline";

const tabs = ["Pro Career", "College", "Testing", "Timeline"] as const;

export function StatsTabs({ a }: { a: Athlete }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Pro Career");
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + tabs.length) % tabs.length;
    setTab(tabs[n]);
    refs.current[n]?.focus();
  };

  return (
    <section id="stats" className="scroll-mt-24 bg-paper py-24 text-obsidian sm:py-32">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 !text-gold-deep">Career Stats & Milestones</p>
            <h2 className="display text-[clamp(40px,5vw,80px)]">The <em className="text-gold-deep">ledger.</em></h2>
          </div>
          <div role="tablist" aria-label="Career data" className="no-scrollbar -mx-4 flex max-w-full gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {tabs.map((t, i) => (
              <button key={t} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${id}-tab-${i}`} aria-selected={tab === t} aria-controls={`${id}-panel`}
                tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)} onKeyDown={(e) => onKey(e, i)}
                className="relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors">
                {tab === t && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-obsidian" transition={{ duration: 0.5, ease }} />}
                <span className={`relative ${tab === t ? "text-paper" : "text-obsidian/60 hover:text-obsidian"}`}>{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tabs.indexOf(tab)}`}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
              {tab === "Pro Career" && <Table t={a.proStats} />}
              {tab === "College" && <Table t={a.collegeStats} />}
              {tab === "Testing" && (
                <div>
                  <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">{a.testing.caption}</p>
                  <ul className="grid grid-cols-2 border-l border-t hairline-dark sm:grid-cols-3 lg:grid-cols-6">
                    {a.testing.items.map((it) => (
                      <li key={it.label} className="border-b border-r hairline-dark p-6">
                        <span className="block font-mono text-3xl tabular-nums">{it.value}</span>
                        <span className="mt-2 block text-xs text-slate-dark">{it.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-slate-dark">{a.testing.note}</p>
                </div>
              )}
              {tab === "Timeline" && <Timeline items={a.timeline} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Table({ t }: { t: StatTable }) {
  return (
    <div>
      <div className="overflow-x-auto border hairline-dark">
        <table className="w-full min-w-[560px] text-left text-sm tabular-nums">
          <caption className="border-b hairline-dark p-4 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">{t.caption}</caption>
          <thead>
            <tr className="border-b hairline-dark bg-bone/60">
              {t.columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-slate-dark">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, i) => (
              <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.5, ease }}
                className="border-b hairline-dark transition-colors hover:bg-gold/10">
                {r.map((c, j) => <td key={j} className={`px-4 py-3.5 ${j === 0 ? "font-mono" : ""}`}>{c}</td>)}
              </motion.tr>
            ))}
          </tbody>
          {t.totals && (
            <tfoot>
              <tr className="bg-obsidian text-paper">
                {t.totals.map((c, j) => <td key={j} className={`px-4 py-4 ${j === 0 ? "font-mono uppercase tracking-[0.15em] text-gold" : "font-medium"}`}>{c}</td>)}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {t.note && <p className="mt-4 text-xs text-slate-dark">{t.note}</p>}
    </div>
  );
}
