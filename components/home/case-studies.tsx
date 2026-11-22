"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { MaskLines, Reveal, ease } from "../motion";

const cases = [
  {
    id: "conversion",
    athlete: "Quinton Dunbar",
    slug: "quinton-dunbar",
    tag: "Career Breakthrough",
    title: "The Conversion",
    stat: "UDFA → $10.5M",
    image: "/img/quinton-1.webp",
    summary: "An undrafted receiver became a starting NFL cornerback, and then one of the league's best in coverage.",
    body: [
      "Undrafted in 2015, Dunbar signed with Washington as a wide receiver. In his first training camp, coaches moved him to cornerback.",
      "He went from the practice squad to the active roster in five weeks and made his first interception that November. On January 1, 2018, Washington signed him to a three-year, $10.5 million extension.",
      "In 2019 he led the team with four interceptions in 11 starts, and PFF graded him the league's No. 2 cornerback in coverage (as reported by NFL.com). Seattle traded for him the following March.",
    ],
  },
  {
    id: "record-book",
    athlete: "Rashad Greene",
    slug: "rashad-greene",
    tag: "Championship Pedigree",
    title: "The Record Book",
    stat: "270 · 3,830",
    image: "/img/rashad-2.webp",
    summary: "A national title, two All-ACC selections and Florida State's career receptions and receiving-yards records.",
    body: [
      "In the BCS National Championship Game on January 6, 2014, Greene caught nine passes for 147 yards, including a 49-yard catch on the game-winning drive in Florida State's 34-31 win over Auburn.",
      "As a senior captain in 2014 he caught 99 passes and passed Ron Sellers to become the school's career leader in receptions (270) and receiving yards (3,830).",
      "Jacksonville drafted him in the fifth round in 2015. He caught a touchdown in his NFL debut and scored on a 73-yard punt return as a rookie.",
    ],
  },
  {
    id: "second-act",
    athlete: "Rashad Greene",
    slug: "rashad-greene",
    tag: "Life Beyond the Game",
    title: "The Second Act",
    stat: "Degree + Business",
    image: "/img/sprint-start.webp",
    summary: "Finishing a degree and building a family business: the off-field blueprint, made real.",
    body: [
      "After the NFL, Greene went back to Florida State to complete his bachelor's degree in sport management, finishing in May 2020 with a 3.25 GPA in his major.",
      "Florida State Athletics reported in 2020 that he and his wife, Jasmine, co-own All About Me Childcare, a Tallahassee business serving local families near Doak Campbell Stadium.",
      "It's the 'CEO of your own enterprise' philosophy IAG brings to every client: the career is a chapter, not the whole book.",
    ],
  },
];

export function CaseStudies() {
  const [active, setActive] = useState<string | null>(null);
  const cs = cases.find((c) => c.id === active);
  useEffect(() => {
    if (!active) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section id="case-studies" className="relative scroll-mt-24 bg-obsidian py-28 sm:py-36">
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-6">Case Studies</p>
            <h2 className="display text-[clamp(44px,6.5vw,104px)]">
              <MaskLines lines={["Careers,", <em key="e" className="text-gold">by the numbers.</em>]} />
            </h2>
          </div>
          <Reveal className="max-w-md text-slate">Defining moments from IAG client careers, on the field and beyond it. All figures from public records.</Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <button onClick={() => setActive(c.id)} data-cursor="Read" className="group block w-full text-left">
                <motion.div layoutId={`case-img-${c.id}`} className="relative aspect-[3/4] overflow-hidden">
                  <Image src={c.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover grayscale transition duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(9,9,11,0.92))]" />
                  <span className="index-num absolute left-5 top-5 text-xs">0{i + 1}.</span>
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{c.tag} · {c.athlete}</p>
                    <h3 className="display mt-3 text-4xl">{c.title}</h3>
                    <p className="mt-2 font-mono text-lg text-alabaster tabular-nums">{c.stat}</p>
                  </div>
                </motion.div>
                <p className="mt-5 text-sm text-slate">{c.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-alabaster">
                  <span className="link-underline">View Case Study</span> <ArrowUpRight size={16} className="text-gold transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cs && (
          <motion.div className="fixed inset-0 z-[85] grid place-items-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close case study" className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActive(null)} />
            <motion.article role="dialog" aria-modal="true" aria-labelledby="case-title"
              className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto border hairline bg-carbon md:grid-cols-2"
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.6, ease }}>
              <motion.div layoutId={`case-img-${cs.id}`} className="relative min-h-[260px]">
                <Image src={cs.image} alt="" fill sizes="50vw" className="object-cover" />
              </motion.div>
              <div className="p-8 sm:p-10">
                <button onClick={() => setActive(null)} autoFocus className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border hairline bg-obsidian/70 hover:border-gold" aria-label="Close"><X size={16} /></button>
                <p className="eyebrow">{cs.tag} · {cs.athlete}</p>
                <h3 id="case-title" className="display mt-4 text-5xl">{cs.title}</h3>
                <p className="mt-3 font-mono text-xl text-gold tabular-nums">{cs.stat}</p>
                <div className="mt-6 grid gap-4 text-alabaster/80">{cs.body.map((p) => <p key={p}>{p}</p>)}</div>
                <Link href={`/athletes/${cs.slug}`} onClick={() => setActive(null)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-obsidian hover:bg-gold-soft">
                  View {cs.athlete.split(" ")[0]}&apos;s full profile <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
