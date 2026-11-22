"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { useInquiry } from "./inquiry";
import { Magnetic, ease } from "./motion";

export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openInquiry } = useInquiry();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 600 && !menu);
  });
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gold" style={{ scaleX: scrollYProgress }} aria-hidden />
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className={`mx-auto mt-3 flex max-w-[1440px] items-center gap-6 px-[clamp(16px,4vw,56px)] transition-all duration-500`}>
          <div className={`flex w-full items-center gap-6 rounded-full border py-2 pl-3 pr-2 transition-all duration-500 ${scrolled || menu ? "glass hairline" : "border-transparent"}`}>
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} home`}>
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-paper p-1">
                <Image src="/img/iag-logo.png" alt="" width={187} height={155} className="h-auto w-full" priority />
              </span>
              <span className="hidden font-mono text-[10px] uppercase leading-tight tracking-[0.24em] text-alabaster sm:block">
                Infinity<br />Athletic Group
              </span>
            </Link>

            <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
              {nav.map((n) => {
                const active = n.href === pathname || (n.href === "/about" && pathname.startsWith("/about"));
                return (
                  <Link key={n.href} href={n.href}
                    className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active ? "text-gold" : "text-alabaster/80 hover:text-alabaster"}`}>
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2 lg:ml-2">
              <Magnetic>
                <button onClick={() => openInquiry()}
                  className="group hidden items-center gap-2 rounded-full bg-alabaster px-5 py-3 text-sm font-medium text-obsidian transition-colors duration-300 hover:bg-gold sm:inline-flex">
                  Inquire / Partner <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </Magnetic>
              <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? "Close menu" : "Open menu"}
                className="relative grid h-11 w-11 place-items-center rounded-full border hairline lg:hidden">
                <span className={`absolute h-px w-4 bg-alabaster transition-transform duration-500 ${menu ? "rotate-45" : "-translate-y-[3px]"}`} />
                <span className={`absolute h-px w-4 bg-alabaster transition-transform duration-500 ${menu ? "-rotate-45" : "translate-y-[3px]"}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div id="mobile-menu" className="fixed inset-0 z-[60] bg-obsidian lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}>
            <nav aria-label="Mobile" className="wrap flex h-full flex-col justify-center gap-2 pt-20">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }}>
                  <Link href={n.href} onClick={() => setMenu(false)} className="flex items-baseline gap-4 border-b hairline py-4">
                    <span className="index-num text-xs">0{i + 1}.</span>
                    <span className="display text-5xl">{n.label}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                onClick={() => { setMenu(false); openInquiry(); }}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-medium text-obsidian">
                Inquire / Partner <ArrowUpRight size={18} />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
