import Image from "next/image";
import { founder } from "@/lib/founder";

/** Shaheed's cut-out portrait on a light panel with a soft infinity mark behind him. */
export function FounderPortrait({ className = "", badge = true }: { className?: string; badge?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-bone ${className}`}>
      <svg aria-hidden viewBox="0 0 100 50" className="absolute left-[-20%] top-[22%] w-[120%] text-gold/25" fill="none" stroke="currentColor" strokeWidth="5">
        <path d="M50,25 C38,8 14,6 10,25 C6,44 38,42 50,25 C62,8 86,6 90,25 C94,44 62,42 50,25 Z" />
      </svg>
      <Image src={founder.photo} alt={founder.photoAlt} width={265} height={912} sizes="(min-width:1024px) 280px, 55vw"
        className="absolute bottom-0 right-0 h-[94%] w-auto max-w-none object-contain object-bottom" />
      {badge && (
        <span className="absolute bottom-5 left-5 rounded-full bg-obsidian px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          NFLPA Certified · 2012
        </span>
      )}
    </div>
  );
}
