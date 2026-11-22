"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import { athletes } from "@/lib/athletes";
import { nav, site } from "@/lib/site";
import { useInquiry } from "./inquiry";
import { Magnetic } from "./motion";

export function Footer() {
  const { openInquiry } = useInquiry();
  return (
    <footer className="relative overflow-hidden border-t hairline bg-obsidian pt-24">
      <div className="wrap">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Infinity Athletic Group · Miami, FL</p>
            <h2 className="display text-[clamp(44px,7vw,112px)]">
              The next chapter<br /><em className="text-gold">starts here.</em>
            </h2>
            <Magnetic className="mt-10">
              <button onClick={() => openInquiry()} className="group inline-flex items-center gap-3 rounded-full border border-gold px-7 py-4 text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian">
                Start an inquiry <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
              </button>
            </Magnetic>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="eyebrow mb-5">Explore</p>
              <ul className="grid gap-3">
                {nav.map((n) => <li key={n.href}><Link className="link-underline text-alabaster/80 hover:text-alabaster" href={n.href}>{n.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Roster</p>
              <ul className="grid gap-3">
                {athletes.map((a) => <li key={a.slug}><Link className="link-underline text-alabaster/80 hover:text-alabaster" href={`/athletes/${a.slug}`}>{a.name}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-2 grid gap-4 border-t hairline pt-8 sm:grid-cols-2">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-alabaster/80 hover:text-alabaster">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>Headquarters<br />{site.address.street}<br />{site.address.city}, {site.address.region}</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex gap-3 text-alabaster/80 hover:text-alabaster">
                <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>Direct line<br />{site.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-4 border-y hairline py-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-gold/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> NFLPA Certified Contract Advisor · {site.founder}
          </span>
          <span className="text-sm text-slate">Boutique, hands-on representation built around the athlete.</span>
        </div>

        <div aria-hidden className="pointer-events-none select-none py-6 text-center font-serif text-[22vw] leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(200,169,110,0.35)]">
          Infinity
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t hairline py-8 text-xs text-slate">
          <span className="flex items-center gap-3">
            <Image src="/img/iag-logo.png" alt="" width={36} height={30} className="rounded bg-paper p-0.5" />
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
