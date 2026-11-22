import { Hero } from "@/components/home/hero";
import { Metrics } from "@/components/home/metrics";
import { Roster } from "@/components/home/roster";
import { Pillars } from "@/components/home/pillars";
import { Marketing } from "@/components/home/marketing";
import { CaseStudies } from "@/components/home/case-studies";
import { PullQuote } from "@/components/home/pull-quote";
import { Partner } from "@/components/home/partner";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Roster />
      <Pillars />
      <Marketing />
      <CaseStudies />
      <PullQuote />
      <Partner />
    </>
  );
}
