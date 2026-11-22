import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../motion";
import { InquireButton } from "../inquire-button";

/** Client-supplied copy (verbatim apart from brand-name spelling). */
const brands = ["Under Armour", "Nike", "Adidas", "Gatorade", "Samsung", "Sprint", "AT&T", "Verizon", "Topps", "Panini", "Burger King", "EA Sports", "Visa", "Pepsi", "Coca-Cola", "Reebok", "Sony", "General Motors (GM)", "McDonald's", "FedEx", "Papa John's"];
const deals = ["Shoe and apparel contracts", "Trading card signings", "Personal appearances", "Corporate endorsements", "Automobile promotions", "Print and broadcast mediums"];

export function Marketing() {
  return (
    <section id="marketing" className="relative scroll-mt-24 overflow-hidden bg-obsidian py-28 sm:py-36" aria-labelledby="marketing-title">
      <div className="wrap">
        <Reveal as="h2" className="text-center font-serif text-[clamp(34px,4.6vw,72px)] font-semibold leading-[1.05] text-alabaster">
          <span id="marketing-title">Marketing Deals <span className="text-logo-red">/</span> Sponsorships <span className="text-logo-red">/</span> Endorsements</span>
        </Reveal>
        <Reveal as="p" delay={0.08} className="mx-auto mt-10 max-w-4xl text-center text-[clamp(18px,1.6vw,22px)] leading-[1.7] text-alabaster/80">
          Infinity Athletic Group has relationships to secure, negotiate, draft endorsement and personal service contracts with prominent companies like Under Armour, Nike, Adidas, Gatorade, Samsung, Sprint, AT&amp;T, Verizon, Topps, Panini, Burger King, EA Sports, Visa, Pepsi, Coca-Cola, Reebok, Sony, General Motors (GM), McDonald&apos;s, FedEx, Papa John&apos;s, among others. These deals include shoe and apparel contracts, trading card signings, personal appearances, corporate endorsements, automobile promotions, print and broadcast mediums.
        </Reveal>
      </div>

      <div aria-hidden className="mt-16 grid gap-3">
        {[0, 1].map((row) => {
          const list = row ? [...brands].reverse() : brands;
          return (
            <div key={row} className={`overflow-hidden border-y hairline py-5 ${row ? "bg-carbon" : ""}`}>
              <div className="flex w-max gap-12 whitespace-nowrap" style={{ animation: `marquee ${row ? 60 : 50}s linear infinite ${row ? "reverse" : ""}` }}>
                {[...list, ...list].map((b, i) => (
                  <span key={i} className="flex items-center gap-12 font-serif text-[clamp(26px,2.6vw,40px)] text-alabaster/85">
                    {b}<span className="text-logo-red">/</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="wrap mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <ul className="grid gap-3 sm:grid-cols-2">
          {deals.map((d, i) => (
            <Reveal as="li" key={d} delay={i * 0.05} className="flex items-center gap-3 border hairline px-5 py-4 text-alabaster/90">
              <span className="h-2 w-2 shrink-0 rounded-full bg-logo-red" />{d}
            </Reveal>
          ))}
        </ul>
        <Reveal className="relative aspect-[16/10] overflow-hidden">
          <Image src="/img/basketball.webp" alt="A player rising for a shot in front of a packed arena" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 bg-[linear-gradient(transparent,rgba(9,9,11,0.9))] p-6 pt-16">
            <InquireButton type="Endorsement / Sponsorship" label="Partner with IAG talent" variant="gold" />
            <Link href="/pillars/brand" className="group inline-flex items-center gap-2 text-sm text-alabaster">
              Brand & Content <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
