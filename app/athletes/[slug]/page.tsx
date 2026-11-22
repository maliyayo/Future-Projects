import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athletes, getAthlete, nextAthlete } from "@/lib/athletes";
import { site } from "@/lib/site";
import { AthleteHero } from "@/components/athlete/athlete-hero";
import { StatsTabs } from "@/components/athlete/stats-tabs";
import { Vitals, Story, Brand, Media, BookingBar, NextAthlete } from "@/components/athlete/sections";

export const dynamicParams = false;
export function generateStaticParams() {
  return athletes.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAthlete(slug);
  if (!a) return {};
  return {
    title: `${a.name}: ${a.position}`,
    description: `${a.hook} Career story, stats, milestones and partnership inquiries for ${a.name}, an Infinity Athletic Group client.`,
    openGraph: { images: [a.portrait] },
  };
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAthlete(slug);
  if (!a) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: `Professional football player (${a.position})`,
    alumniOf: a.college,
    sameAs: a.profiles.map((p) => p.href),
    affiliation: { "@type": "SportsOrganization", name: site.name },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AthleteHero a={a} />
      <Vitals a={a} />
      <Story a={a} />
      <StatsTabs a={a} />
      <Brand a={a} />
      <Media a={a} />
      <BookingBar a={a} />
      <NextAthlete next={nextAthlete(a.slug)} />
    </>
  );
}
