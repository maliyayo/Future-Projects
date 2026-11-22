"use client";

import { ArrowRight } from "lucide-react";
import { useInquiry } from "./inquiry";
import { Magnetic } from "./motion";

/** Dark pill that opens the inquiry drawer, optionally pre-filled. Usable from server pages. */
export function InquireButton({ label = "Open inquiry", type, athlete, variant = "dark" }: { label?: string; type?: string; athlete?: string; variant?: "dark" | "gold" }) {
  const { openInquiry } = useInquiry();
  const cls = variant === "gold" ? "bg-gold text-obsidian hover:bg-gold-soft" : "bg-obsidian text-paper hover:bg-carbon";
  return (
    <Magnetic>
      <button onClick={() => openInquiry({ type, athlete })} className={`group inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-5 transition-colors ${cls}`}>
        {label} <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
      </button>
    </Magnetic>
  );
}
