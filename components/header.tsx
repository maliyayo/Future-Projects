"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { nav, site, type NavItem } from "@/lib/site";
import { useInquiry } from "./inquiry";
import { Magnetic, ease } from "./motion";

export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const { openInquiry } = useInquiry();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    const hide = y > prev && y > 600 && !menu;
    setHidden(hide);
    if (hide) setOpenDrop(null);
  });
  useEffect(() => { setMenu(false); setOpenDrop(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const isActive = (n: NavItem) =>
    pathname === n.href || (n.href !== "/" && !n.href.includes("#") && pathname.startsWith(n.href)) ||
    !!n.children?.some((c) => pathname === c.href.split("#")[0]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gold" style={{ scaleX: scrollYProgress }} aria-hidden />
      <motion.header className="fixed inset-x-0 top-0 z-[70]" animate={{ y: hidden ? -110 : 0 }} transition={{ duration: 0.6, ease }}>
        <div className="mx-auto mt-3 flex max-w-[1440px] items-center px-[clamp(16px,4vw,56px)]">
          <div className={`flex w-full items-center gap-6 rounded-full border py-2 pl-3 pr-2 transition-all duration-500 ${scrolled || menu || openDrop ? "glass hairline" : "border-transparent"}`}>
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} home`}>
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-paper p-1">
                <Image src="/img/iag-logo.png" alt="" width={187} height={155} className="h-auto w-full" priority />
              </span>
              <span className="hidden font-mono text-[10px] uppercase leading-tight tracking-[0.24em] text-alabaster sm:block">Infinity<br />Athletic Group</span>
            </Link>

            <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setOpenDrop(null)}>
              {nav.map((n) => (
                <DesktopItem key={n.label} item={n} active={isActive(n)} open={openDrop === n.label}
                  onOpen={() => setOpenDrop(n.label)} onClose={() => setOpenDrop((o) => (o === n.label ? null : o))} />
              ))}
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

      <MobileMenu open={menu} onClose={() => setMenu(false)} onInquire={() => { setMenu(false); openInquiry(); }} />
    </>
  );
}

function DesktopItem({ item, active, open, onOpen, onClose }: { item: NavItem; active: boolean; open: boolean; onOpen: () => void; onClose: () => void }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const base = `rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${active ? "text-gold" : "text-alabaster/80 hover:text-alabaster"}`;

  if (!item.children) return <Link href={item.href} className={base}>{item.label}</Link>;

  const enter = () => { if (timer.current) clearTimeout(timer.current); onOpen(); };
  const leave = () => { timer.current = setTimeout(onClose, 140); };

  return (
    <div ref={wrap} className="relative" onMouseEnter={enter} onMouseLeave={leave}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node)) onClose(); }}
      onKeyDown={(e) => { if (e.key === "Escape") { onClose(); (wrap.current?.querySelector("button") as HTMLButtonElement | null)?.focus(); } }}>
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => (open ? onClose() : onOpen())}
        className={`${base} inline-flex items-center gap-1.5 ${open ? "text-alabaster" : ""}`}>
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-300 ${open ? "rotate-180 text-gold" : "text-slate"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.28, ease }}
            className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-4">
            <div className="min-w-[260px] border hairline bg-carbon/95 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <Link href={item.href} className="mb-1 flex items-center justify-between border-b hairline px-4 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft">
                {item.label} overview <ArrowUpRight size={12} />
              </Link>
              <ul>
                {item.children.map((c, i) => (
                  <li key={c.href}>
                    <Link href={c.href} className="group flex items-baseline gap-3 px-4 py-2.5 text-sm text-alabaster/80 transition-colors hover:bg-white/5 hover:text-alabaster">
                      <span className="index-num text-[10px]">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="block">{c.label}</span>
                        {c.note && <span className="block text-xs text-slate">{c.note}</span>}
                      </span>
                      <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100 text-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose, onInquire }: { open: boolean; onClose: () => void; onInquire: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" className="fixed inset-0 z-[60] overflow-y-auto bg-obsidian lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}>
          <nav aria-label="Mobile" className="wrap flex min-h-full flex-col justify-center gap-1 pb-10 pt-28">
            {nav.map((n, i) => (
              <motion.div key={n.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }} className="border-b hairline">
                {n.children ? (
                  <>
                    <button onClick={() => setExpanded((e) => (e === n.label ? null : n.label))} aria-expanded={expanded === n.label}
                      className="flex w-full items-baseline gap-4 py-4 text-left">
                      <span className="index-num text-xs">0{i + 1}.</span>
                      <span className="display flex-1 text-[42px]">{n.label}</span>
                      <ChevronDown size={20} className={`self-center text-gold transition-transform duration-300 ${expanded === n.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === n.label && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden pl-10">
                          {[{ label: `${n.label} overview`, href: n.href }, ...n.children].map((c) => (
                            <li key={c.href}><Link href={c.href} onClick={onClose} className="block py-2.5 text-lg text-alabaster/80">{c.label}</Link></li>
                          ))}
                          <li className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={n.href} onClick={onClose} className="flex items-baseline gap-4 py-4">
                    <span className="index-num text-xs">0{i + 1}.</span>
                    <span className="display text-[42px]">{n.label}</span>
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} onClick={onInquire}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-medium text-obsidian">
              Inquire / Partner <ArrowUpRight size={18} />
            </motion.button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
