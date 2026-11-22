"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { pillars } from "@/lib/pillars";
import { MaskLines, Reveal, ease } from "../motion";

export function Pillars() {
  const [open, setOpen] = useState(0);
  return (
    <section id="what-we-do" className="relative scroll-mt-24 bg-paper py-28 text-obsidian sm:py-36">
      <div className="wrap">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6 !text-gold-deep">What We Do</p>
            <h2 className="display text-[clamp(44px,6.5vw,104px)]">
              <MaskLines lines={["Four disciplines.", <em key="e" className="text-gold-deep">One blueprint.</em>]} />
            </h2>
          </div>
          <Reveal className="max-w-md text-slate-dark lg:justify-self-end">
            Most athletes juggle an agent, a publicist, an accountant and a lawyer who never talk to each other. At IAG every discipline answers to one plan, built around you.
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="border-t hairline-dark">
            {pillars.map((p, i) => {
              const active = open === i;
              return (
                <div key={p.n} className="border-b hairline-dark">
                  <h3>
                    <button
                      onClick={() => setOpen(i)}
                      onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setOpen(i)}
                      aria-expanded={active}
                      aria-controls={`pillar-${p.n}`}
                      className="group flex w-full items-baseline gap-6 py-7 text-left"
                    >
                      <span className={`index-num text-sm transition-colors ${active ? "!text-gold-deep" : "!text-slate-dark"}`}>{p.n}.</span>
                      <span className={`display flex-1 text-[clamp(28px,3.4vw,48px)] transition-colors duration-500 ${active ? "text-obsidian" : "text-obsidian/40 group-hover:text-obsidian/70"}`}>{p.title}</span>
                      <motion.span animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.5, ease }} className="text-gold-deep"><Plus size={22} /></motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div id={`pillar-${p.n}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden">
                        <div className="pb-8 pl-[calc(1.5rem+2ch)]">
                          <p className="mb-5 max-w-lg text-lg text-slate-dark">{p.lede}</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {p.included.flatMap((g) => g.items).slice(0, 4).map((pt) => (
                              <li key={pt} className="flex gap-3 text-sm text-obsidian/80"><span className="mt-2 h-px w-4 shrink-0 bg-gold-deep" />{pt}</li>
                            ))}
                          </ul>
                          <Link href={`/pillars/${p.slug}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-obsidian">
                            <span className="link-underline">Explore {p.short}</span> <ArrowRight size={16} className="text-gold-deep transition-transform duration-500 group-hover:translate-x-1" />
                          </Link>
                          <div className="relative mt-6 aspect-[16/10] overflow-hidden lg:hidden">
                            <Image src={p.image} alt={p.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: p.focus }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-obsidian">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={open} className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }} animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }} exit={{ opacity: 0.4 }}
                  transition={{ duration: 1, ease }}>
                  <Image src={pillars[open].image} alt={pillars[open].alt} fill sizes="40vw" className="object-cover" style={{ objectPosition: pillars[open].focus }} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(9,9,11,0.8))]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-paper">
                <span className="display text-[120px] leading-none text-gold">{pillars[open].n}</span>
                <span className="max-w-[16ch] text-right font-mono text-[11px] uppercase tracking-[0.2em]">{pillars[open].title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
