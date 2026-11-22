"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { athletes } from "@/lib/athletes";
import { MaskLines, Reveal, ease } from "../motion";

export function Roster() {
  return (
    <section id="roster" className="relative scroll-mt-24 bg-obsidian py-28 sm:py-36">
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-6">The Roster</p>
            <h2 className="display text-[clamp(44px,6.5vw,104px)]">
              <MaskLines lines={["Proven on", <em key="e" className="text-gold">Sundays.</em>]} />
            </h2>
          </div>
          <Reveal className="max-w-md text-slate">
            Two IAG clients, two very different roads to the NFL: an undrafted receiver who became a starting cornerback, and a national champion who rewrote Florida State&apos;s record book.
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {athletes.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.12}>
              <Link href={`/athletes/${a.slug}`} data-cursor="View" className="group relative block overflow-hidden border hairline bg-carbon">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
                  <Image src={a.portrait} alt={a.portraitAlt} fill sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" style={{ objectPosition: a.heroFocus }} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0)_35%,rgba(9,9,11,0.95))]" />
                  <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 font-serif text-[220px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(200,169,110,0.45)]">{a.number}</span>
                  <span className="index-num absolute left-6 top-6 text-sm">{a.index}.</span>
                  <span className="absolute right-6 top-6 rounded-full border border-gold/50 bg-obsidian/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur">
                    {a.league} · {a.position.split(" · ")[0]} · {a.teamShort}
                  </span>

                  <div className="absolute inset-x-6 bottom-6">
                    <h3 className="display text-[clamp(44px,5vw,76px)]">{a.first} <em className="text-gold">{a.last}</em></h3>
                    <p className="mt-3 max-w-md text-alabaster/80">{a.hook}</p>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <ul className="mt-6 grid grid-cols-3 gap-4 border-t hairline pt-5">
                          {a.highlights.map((h) => (
                            <li key={h.label}>
                              <span className="block font-mono text-2xl text-gold tabular-nums">{h.value}</span>
                              <span className="text-xs text-slate">{h.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="text-sm text-slate">{a.college}</span>
                  <span className="inline-flex items-center gap-2 text-sm text-alabaster">
                    View Athlete Profile
                    <motion.span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-obsidian"
                      whileHover={{ rotate: 45 }} transition={{ duration: 0.4, ease }}>
                      <ArrowUpRight size={16} />
                    </motion.span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
