"use client";

import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useState } from "react";

// Lemniscate drawn in a 100x50 box: the infinity mark from the IAG logo.
const LOOP = "M50,25 C38,8 14,6 10,25 C6,44 38,42 50,25 C62,8 86,6 90,25 C94,44 62,42 50,25 Z";

/**
 * Infinity cursor: a precise gold dot at the pointer plus a trailing infinity loop
 * in the logo's blue and red, with a light tracing the loop. It tilts with motion,
 * grows over links, and shows a label over elements with [data-cursor].
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const vx = useVelocity(sx);
  const tilt = useSpring(useTransform(vx, [-2000, 0, 2000], [-28, 0, 28]), { stiffness: 200, damping: 20 });
  const untilt = useTransform(tilt, (r) => -r);

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
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const scale = (mode === "label" ? 1.9 : mode === "link" ? 1.45 : 1) * (down ? 0.82 : 1);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* precise pointer */}
      <motion.div className="fixed left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x, y }} animate={{ opacity: mode === "label" ? 0 : 1 }} />

      {/* trailing infinity */}
      <motion.div className="fixed left-0 top-0" style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", rotate: tilt }}>
        <motion.div animate={{ scale }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="relative">
          <svg width="46" height="23" viewBox="0 0 100 50" className="block overflow-visible drop-shadow-[0_0_6px_rgba(200,169,110,0.35)]">
            <defs>
              <linearGradient id="iag-cursor-grad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3553b8" />
                <stop offset="0.46" stopColor="#3553b8" />
                <stop offset="0.54" stopColor="#e81828" />
                <stop offset="1" stopColor="#e81828" />
              </linearGradient>
            </defs>
            {/* soft fill when hovering a link or label */}
            <motion.path d={LOOP} fill="rgba(200,169,110,0.18)" animate={{ opacity: mode === "idle" ? 0 : 1 }} transition={{ duration: 0.3 }} />
            {/* the loop, in logo colors */}
            <path d={LOOP} fill="none" stroke="url(#iag-cursor-grad)" strokeWidth={mode === "idle" ? 7 : 5} strokeLinecap="round" strokeLinejoin="round" />
            {/* light tracing around the loop */}
            <motion.path d={LOOP} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" pathLength={1}
              strokeDasharray="0.12 0.88" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -1 }}
              transition={{ duration: mode === "idle" ? 2.4 : 1.1, repeat: Infinity, ease: "linear" }} />
          </svg>
        </motion.div>
        <motion.span
          className="absolute left-1/2 top-[calc(100%+14px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-obsidian"
          initial={false} animate={{ opacity: mode === "label" ? 1 : 0, y: mode === "label" ? 0 : -6 }} transition={{ duration: 0.25 }}
          style={{ rotate: untilt }}>
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
