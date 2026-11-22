import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { MaskLines, Reveal } from "@/components/motion";
import { AboutCTA } from "@/components/about-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About · Shaheed Samuel",
  description:
    "The story of Infinity Athletic Group and founder Shaheed Samuel, an NFLPA Certified Contract Advisor since 2012 based in Miami, FL, and why a boutique, high-touch model beats mega-agency volume.",
};

const compare = [
  { k: "Who you talk to", iag: "Shaheed Samuel, directly, every time", big: "A rotating junior agent or coordinator" },
  { k: "Roster philosophy", iag: "Selective. Every client gets personalized attention", big: "Volume. Hundreds of clients competing for time" },
  { k: "Career plan", iag: "One blueprint across contract, brand, body and wealth", big: "Separate departments, separate agendas" },
  { k: "Off-field", iag: "Post-career counseling and business transition built in", big: "Often ends when the playing contract does" },
  { k: "Standard", iag: "Never compromising ethics for a deal", big: "Varies by agent" },
];


export default function AboutPage() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-obsidian pb-24 pt-40">
        <div className="wrap">
          <p className="eyebrow mb-8">About · Infinity Athletic Group</p>
          <h1 className="display max-w-[16ch] text-[clamp(52px,8.6vw,140px)]">
            <MaskLines delay={0.3} lines={["Small by design.", <em key="e" className="text-gold">Relentless by nature.</em>]} />
          </h1>
          <div className="mt-14 grid gap-10 border-t hairline pt-10 lg:grid-cols-2">
            <Reveal as="p" className="font-serif text-[clamp(22px,2.2vw,30px)] leading-snug text-alabaster/90">
              Infinity Athletic Group (IAG) is a sports agency that strives to deliver an unparalleled relationship with its clients. With over a decade of negotiating and business experience, IAG builds strategic long-term career plans for athletes on and off the field, without ever compromising its ethical standards.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-lg leading-relaxed text-slate">
              Our success comes from separating ourselves from the competition with personalized attention, because every athlete is different. There is no barrier we are not willing to challenge to reach the highest level of success for the people we represent.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-obsidian sm:py-32" aria-labelledby="founder">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian">
              <Image src="/img/stadium-night.webp" alt="A stadium lit up at night" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(9,9,11,0.9))]" />
              <div className="absolute inset-x-8 bottom-8 text-paper">
                <span className="display block text-[120px] leading-none text-gold">SS</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Founder · Infinity Athletic Group</span>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 rounded-full bg-obsidian px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold sm:-right-6">
              NFLPA Certified · Since 2012
            </div>
          </Reveal>
          <div>
            <p className="eyebrow mb-6 !text-gold-deep">Leadership</p>
            <h2 id="founder" className="display text-[clamp(44px,6vw,96px)]">Shaheed <em className="text-gold-deep">Samuel</em></h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-dark">NFLPA Certified Contract Advisor since 2012 · {site.address.city}, {site.address.region}</p>
            <blockquote className="my-10 border-l-2 border-gold-deep pl-6 font-serif text-3xl italic leading-snug">
              &ldquo;Unboundedly formulating a blueprint for your professional athletic career and beyond.&rdquo;
            </blockquote>
            <div className="grid gap-5 text-[17px] leading-[1.75] text-obsidian/75">
              <p>Based on extensive market research, Shaheed Samuel saw a clear need for sports agents who are passionate, honest and dependable. He believes his faith, wisdom, moral character, drive, work ethic and sense of loyalty set him apart from every competitor.</p>
              <p>His philosophy is to empower each athlete&apos;s career path by helping them understand that they are the CEO of their own enterprise, and that being a professional athlete is an opportunity to expand into many other ventures in life.</p>
              <p>His dedication, consistency and tireless work have built a proven track record for clients at the highest ethical levels. Shaheed and Infinity Athletic Group are personally dedicated to the success of every individual they accept the responsibility of representing, from NFL draft preparation to the business that comes after the game.</p>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {["Faith", "Wisdom", "Moral Character", "Drive", "Work Ethic", "Loyalty"].map((t) => (
                <li key={t} className="rounded-full border hairline-dark px-4 py-2 text-sm">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24 sm:py-32" aria-labelledby="model">
        <div className="wrap">
          <p className="eyebrow mb-6">The Boutique Model</p>
          <h2 id="model" className="display max-w-[18ch] text-[clamp(40px,5.5vw,88px)]">Why boutique beats <em className="text-gold">mega-agency volume.</em></h2>
          <div className="mt-14 overflow-x-auto border hairline">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b hairline">
                  <th scope="col" className="p-5 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-slate">&nbsp;</th>
                  <th scope="col" className="bg-gold/10 p-5 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-gold">Infinity Athletic Group</th>
                  <th scope="col" className="p-5 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-slate">Typical mega-agency</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.k} className="border-b hairline last:border-0">
                    <th scope="row" className="p-5 text-left font-serif text-2xl font-normal">{r.k}</th>
                    <td className="bg-gold/5 p-5"><span className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-gold" />{r.iag}</span></td>
                    <td className="p-5 text-slate"><span className="flex gap-3"><Minus size={18} className="mt-0.5 shrink-0" />{r.big}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-carbon py-24 sm:py-32" aria-labelledby="go-deeper">
        <div className="wrap">
          <p className="eyebrow mb-6">Go deeper</p>
          <h2 id="go-deeper" className="display mb-12 text-[clamp(40px,5vw,80px)]">The people <em className="text-gold">behind IAG.</em></h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { href: "/about/founder", k: "01 · Founder Story", t: "It started with a better standard.", d: "Why Shaheed Samuel built a boutique agency around personalized attention.", img: "/img/stadium-night.webp" },
              { href: "/team", k: "02 · Meet the Team", t: "The people behind every client.", d: "PR, marketing, legal and client services, working one plan.", img: "/img/staff-lashan-coglin.webp" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group relative block min-h-[340px] overflow-hidden border hairline">
                <Image src={c.img} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover opacity-30 grayscale transition duration-[1200ms] group-hover:scale-105 group-hover:opacity-45" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(9,9,11,0.95))]" />
                <div className="absolute inset-x-8 bottom-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{c.k}</p>
                  <h3 className="display mt-4 text-4xl">{c.t}</h3>
                  <p className="mt-3 text-slate">{c.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm">Read more <ArrowRight size={16} className="text-gold transition-transform duration-500 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <h2 className="display text-[clamp(36px,4.6vw,72px)]">Meet the <em className="text-gold">roster.</em></h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/#roster" className="group inline-flex items-center gap-3 rounded-full border border-gold px-7 py-4 text-gold transition-colors hover:bg-gold hover:text-obsidian">
              Explore the Roster <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <AboutCTA />
          </div>
        </div>
      </section>
    </>
  );
}
