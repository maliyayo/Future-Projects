"use client";

import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "./inquiry";

export function AboutCTA() {
  const { openInquiry } = useInquiry();
  return (
    <button onClick={() => openInquiry({ type: "Representation" })} className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-medium text-obsidian transition-colors hover:bg-gold-soft">
      Talk to Shaheed <ArrowUpRight size={18} />
    </button>
  );
}
