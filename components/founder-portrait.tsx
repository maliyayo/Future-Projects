import Image from "next/image";
import { founder } from "@/lib/founder";

/** Shaheed's portrait, cropped to frame his upper body, with an optional NFLPA badge. */
export function FounderPortrait({ className = "", badge = true }: { className?: string; badge?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-bone ${className}`}>
      <Image src={founder.photo} alt={founder.photoAlt} fill sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover" style={{ objectPosition: "50% 18%" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgba(9,9,11,0.45))]" />
      {badge && (
        <span className="absolute bottom-5 left-5 rounded-full bg-obsidian px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          NFLPA Certified · 2012
        </span>
      )}
    </div>
  );
}
