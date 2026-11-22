"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { athletes } from "@/lib/athletes";
import { inquiryTypes, site } from "@/lib/site";
import { ease } from "./motion";

type Prefill = { athlete?: string; type?: string };
const Ctx = createContext<{ openInquiry: (p?: Prefill) => void }>({ openInquiry: () => {} });
export const useInquiry = () => useContext(Ctx);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});
  const lastFocus = useRef<HTMLElement | null>(null);

  const openInquiry = useCallback((p: Prefill = {}) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setPrefill(p);
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, close]);

  const athleteName = athletes.find((a) => a.slug === prefill.athlete)?.name;

  return (
    <Ctx.Provider value={{ openInquiry }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close inquiry" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={athleteName ? `Inquiry about ${athleteName}` : "Partnership and representation inquiry"}
              className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l hairline bg-carbon px-6 pb-10 pt-6 sm:px-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="eyebrow">Inquiry · {athleteName ?? "IAG"}</span>
                <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full border hairline text-alabaster transition hover:border-gold hover:text-gold" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <h2 className="display mb-3 text-4xl sm:text-5xl">
                {athleteName ? <>Partner with <em className="text-gold">{athleteName}</em></> : <>Start the <em className="text-gold">conversation</em></>}
              </h2>
              <p className="mb-10 text-slate">Appearances, endorsements, media and representation. Every inquiry is read personally by {site.founder}.</p>
              <InquiryForm key={`${prefill.athlete}-${prefill.type}`} defaultAthlete={prefill.athlete} defaultType={prefill.type} autoFocus />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function InquiryForm({ defaultAthlete, defaultType, autoFocus }: { defaultAthlete?: string; defaultType?: string; autoFocus?: boolean }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<null | { mailto: string }>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const next: Errors = {};
    if (v("name").length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) next.email = "Please enter a valid email address.";
    if (v("message").length < 10) next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    const athlete = athletes.find((a) => a.slug === v("athlete"))?.name ?? "General / IAG";
    const subject = `${v("type")} inquiry: ${athlete} (${v("org") || v("name")})`;
    const body = [
      `Name: ${v("name")}`,
      `Email: ${v("email")}`,
      `Organization / Brand: ${v("org") || "-"}`,
      `Athlete of interest: ${athlete}`,
      `Inquiry type: ${v("type")}`,
      "",
      v("message"),
    ].join("\n");
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent({ mailto });
    window.location.href = mailto;
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="border hairline p-8" role="status">
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-obsidian"><Check /></div>
        <h3 className="display mb-3 text-3xl">Your inquiry is ready to send.</h3>
        <p className="text-slate">
          Your email app should have opened with everything filled in. Just hit send. If it didn&apos;t open,{" "}
          <a className="text-gold underline underline-offset-4" href={sent.mailto}>click here</a> or write to{" "}
          <a className="text-gold underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </motion.div>
    );
  }

  const label = "mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-slate";
  const err = (k: keyof Errors) =>
    errors[k] ? <p id={`${id}-${k}-err`} className="mt-2 text-sm text-red-400">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${id}-name`}>Full name *</label>
          <input id={`${id}-name`} name="name" className="field" autoComplete="name" autoFocus={autoFocus}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
          {err("name")}
        </div>
        <div>
          <label className={label} htmlFor={`${id}-email`}>Email *</label>
          <input id={`${id}-email`} name="email" type="email" className="field" autoComplete="email"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} />
          {err("email")}
        </div>
      </div>
      <div>
        <label className={label} htmlFor={`${id}-org`}>Organization / Brand</label>
        <input id={`${id}-org`} name="org" className="field" autoComplete="organization" placeholder="Company, team or school" />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${id}-athlete`}>Athlete of interest</label>
          <select id={`${id}-athlete`} name="athlete" className="field" defaultValue={defaultAthlete ?? ""}>
            <option value="">General / IAG representation</option>
            {athletes.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor={`${id}-type`}>Inquiry type</label>
          <select id={`${id}-type`} name="type" className="field" defaultValue={defaultType ?? inquiryTypes[0]}>
            {inquiryTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor={`${id}-message`}>Message *</label>
        <textarea id={`${id}-message`} name="message" rows={4} className="field resize-none" placeholder="Dates, goals, budget, anything that helps."
          aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
        {err("message")}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 font-medium text-obsidian transition hover:bg-gold-soft">
          Send Inquiry <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
        </button>
        <p className="text-xs text-slate">Confidential. Opens in your email app, ready to send.</p>
      </div>
    </form>
  );
}
