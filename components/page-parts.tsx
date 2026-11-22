import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { pillars } from "@/lib/pillars";
import { MaskLines, Reveal } from "./motion";

/** Editorial page hero: eyebrow, two-tone serif headline, lede, optional image. */
export function PageHero({ eyebrow, lead, em, lede, image, imageAlt, focus, children }: {
  eyebrow: string; lead: ReactNode; em: ReactNode; lede?: ReactNode; image?: string; imageAlt?: string; focus?: string; children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-obsidian pb-20 pt-40 sm:pb-28">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover opacity-35" style={{ objectPosition: focus }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.6),rgba(9,9,11,0.97))]" />
        </div>
      )}
      <div className="wrap">
        <p className="eyebrow mb-8 flex items-center gap-3"><span className="h-px w-10 bg-gold" />{eyebrow}</p>
        <h1 className="display max-w-[18ch] text-[clamp(48px,8vw,128px)]">
          <MaskLines delay={0.3} lines={[lead, <em key="em" className="text-gold">{em}</em>]} />
        </h1>
        {lede && <Reveal as="p" delay={0.4} className="mt-10 max-w-2xl text-lg leading-relaxed text-alabaster/80">{lede}</Reveal>}
        {children}
      </div>
    </section>
  );
}

export function Checklist({ items, dark = true }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {items.map((it) => (
        <li key={it} className={`flex gap-3 border-b pb-3 ${dark ? "hairline text-alabaster/85" : "hairline-dark text-obsidian/80"}`}>
          <Check size={18} className={`mt-0.5 shrink-0 ${dark ? "text-gold" : "text-gold-deep"}`} />{it}
        </li>
      ))}
    </ul>
  );
}

/** "More from IAG": cross-links to the other disciplines (excluding the current one). */
export function MorePillars({ exclude, title = "Explore the firm." }: { exclude?: string; title?: string }) {
  const list = pillars.filter((p) => p.slug !== exclude).slice(0, 3);
  return (
    <section className="bg-paper py-24 text-obsidian sm:py-32">
      <div className="wrap">
        <p className="eyebrow mb-5 !text-gold-deep">More from IAG</p>
        <h2 className="display mb-12 text-[clamp(40px,5vw,80px)]">{title}</h2>
        <div className="grid gap-px border hairline-dark bg-obsidian/10 md:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="bg-paper">
              <Link href={`/pillars/${p.slug}`} className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-bone">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-deep">{p.n} · {p.short}</span>
                <h3 className="display mt-6 text-3xl">{p.headline.lead} <em className="text-gold-deep">{p.headline.em}</em></h3>
                <p className="mt-4 flex-1 text-sm text-slate-dark">{p.lede}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm">
                  Explore {p.short} <ArrowRight size={16} className="text-gold-deep transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
