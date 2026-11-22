"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Refined champagne cursor: dot + trailing ring, grows on links, shows labels from [data-cursor]. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const lab = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, input, select, textarea, label, [role=tab]");
      if (lab) { setMode("label"); setLabel(lab.dataset.cursor ?? ""); }
      else setMode(link ? "link" : "idle");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "label" ? 92 : mode === "link" ? 56 : 34;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" style={{ x, y, opacity: mode === "label" ? 0 : 1 }} />
      <motion.div
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-solid"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size, height: size,
          backgroundColor: mode === "label" ? "rgba(200,169,110,1)" : mode === "link" ? "rgba(200,169,110,0.12)" : "rgba(200,169,110,0)",
          borderColor: mode === "label" ? "rgba(200,169,110,1)" : "rgba(200,169,110,0.6)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-obsidian transition-opacity duration-200 ${mode === "label" ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </motion.div>
    </div>
  );
}
