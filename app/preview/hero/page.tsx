// Client-review page for choosing a hero. Not linked anywhere and not indexed; remove after a hero is chosen.
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { HeroSplit, HeroPortal, HeroRoster, HeroLight } from "@/components/home/hero-variants";
import { Metrics } from "@/components/home/metrics";
import { Roster } from "@/components/home/roster";

export const metadata: Metadata = { title: "Hero options (preview)", robots: { index: false, follow: false } };

const options = [
  { k: "a", label: "A · Current", C: Hero },
  { k: "b", label: "B · Split + stats", C: HeroSplit },
  { k: "c", label: "C · Portal", C: HeroPortal },
  { k: "d", label: "D · Roster-led", C: HeroRoster },
  { k: "e", label: "E · Light editorial", C: HeroLight },
];

export default async function HeroPreview({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const v = (await searchParams).v ?? "a";
  const current = options.find((o) => o.k === v) ?? options[0];
  const H = current.C;
  return (
    <>
      <nav aria-label="Hero options" className="fixed inset-x-0 bottom-4 z-[85] flex justify-center px-3">
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-gold/40 bg-obsidian/90 p-1.5 shadow-2xl backdrop-blur-xl">
          {options.map((o) => (
            <a key={o.k} href={`/preview/hero?v=${o.k}`} aria-current={o.k === current.k ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${o.k === current.k ? "bg-gold text-obsidian" : "text-alabaster/80 hover:text-alabaster"}`}>
              {o.label}
            </a>
          ))}
        </div>
      </nav>
      <H />
      <Metrics />
      <Roster />
    </>
  );
}
