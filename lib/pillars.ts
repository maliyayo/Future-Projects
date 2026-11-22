/** The four IAG disciplines. Copy is built from the original iathleticg.com service lists. */
export type Pillar = {
  slug: string;
  n: string;
  title: string;
  short: string;
  headline: { lead: string; em: string };
  lede: string;
  image: string;
  alt: string;
  focus?: string;
  intro: string[];
  included: { group: string; items: string[] }[];
  outcomes: string[];
  steps: { t: string; d: string }[];
  proof?: { athlete: string; slug: string; line: string };
};

export const pillars: Pillar[] = [
  {
    slug: "representation",
    n: "01",
    title: "Representation & Contracts",
    short: "Contracts",
    headline: { lead: "You play the game.", em: "We handle the deal." },
    lede: "Aggressive contract negotiation, roster positioning and long-term career mapping, led by an NFLPA Certified Contract Advisor.",
    image: "/img/contract-signing.webp",
    alt: "An advisor guiding a client's signature on a contract with a gold pen",
    focus: "62% 50%",
    intro: [
      "Every contract is a chapter in a longer plan. IAG negotiates for today's number and tomorrow's leverage: the guarantees, incentives and roster position that keep a career moving forward.",
      "It starts before the draft. Pre-draft publicity, combine and pro-day preparation and draft-day strategy are all built around one question: how do we put this athlete in the strongest possible position when teams decide?",
    ],
    included: [
      { group: "Negotiation", items: ["Contract negotiations", "Draft preparations", "Roster positioning & career mapping"] },
      { group: "Protection", items: ["Legal representation", "Representation at grievances", "Hearings & appeals"] },
      { group: "Combine readiness", items: ["Combine / pro-day training & preparation", "Combine-specific tests, drills & scouting reports", "Wonderlic testing", "Interview & media skill development"] },
    ],
    outcomes: ["A clear career map from draft to second contract", "Every guarantee and incentive negotiated with intent", "Disputes handled through the proper NFLPA process"],
    steps: [
      { t: "Evaluate", d: "Film, testing numbers, market and roster landscape: an honest read on where the athlete stands." },
      { t: "Position", d: "Pre-draft publicity, combine preparation and team conversations that shape how the athlete is seen." },
      { t: "Negotiate", d: "Terms, guarantees and incentives negotiated against the long-term plan, not just the headline number." },
    ],
    proof: { athlete: "Quinton Dunbar", slug: "quinton-dunbar", line: "Undrafted in 2015, Dunbar became a starting NFL cornerback and signed a three-year, $10.5M extension in 2018." },
  },
  {
    slug: "brand",
    n: "02",
    title: "Brand & Content Engine",
    short: "Brand",
    headline: { lead: "Your name is worth", em: "more than your contract." },
    lede: "Endorsements, NIL and commercial deals, media production and personal brand leverage.",
    image: "/img/basketball.webp",
    alt: "A player rising for a shot in front of a packed arena",
    intro: [
      "Infinity Athletic Group has relationships to secure, negotiate and draft endorsement and personal-service contracts with prominent companies like Under Armour, Nike, Adidas, Gatorade, Samsung, Sprint, AT&T, Verizon, Topps, Panini, Burger King, EA Sports, Visa, Pepsi, Coca-Cola, Reebok, Sony, General Motors, McDonald's, FedEx and Papa John's, among others.",
      "We treat an athlete's brand like a business: a clear identity, the right partners, content that compounds, and deals that fit the person rather than just the moment.",
    ],
    included: [
      { group: "Deals", items: ["Sponsorships & endorsements", "Shoe & apparel contracts", "Trading card signings", "Automobile promotions", "Paid promotions"] },
      { group: "Media", items: ["Public relations", "Media relations & coaching", "Print & broadcast", "Pre-draft publicity"] },
      { group: "Brand building", items: ["Image consulting", "Social media monetization", "Personal appearances", "Corporate endorsements"] },
    ],
    outcomes: ["Partners that fit the athlete's story and audience", "A brand that keeps earning after the season", "Confident, media-ready athletes"],
    steps: [
      { t: "Define", d: "Who the athlete is, who follows them and which categories genuinely fit." },
      { t: "Build", d: "Media coaching, content and publicity that grow the audience brands want to reach." },
      { t: "Monetize", d: "Endorsement, appearance and licensing deals negotiated and managed end to end." },
    ],
    proof: { athlete: "Rashad Greene", slug: "rashad-greene", line: "A national champion and Florida State's career receptions leader: a story built for Seminole and Florida audiences." },
  },
  {
    slug: "community",
    n: "03",
    title: "Community & Legacy",
    short: "Community",
    headline: { lead: "Brand equity that", em: "outlasts the game." },
    lede: "Youth camps, charitable foundations, hometown activations and high-equity appearances.",
    image: "/img/line-under-lights.webp",
    alt: "Football players lined up under stadium lights at dusk",
    intro: [
      "The most durable brands in sports are built at home: in the neighborhoods, schools and programs that made the athlete. IAG builds community work that is authentic to each client and meaningful to the people it serves.",
      "Done right, community is not a photo opportunity. It is a relationship, and it becomes the foundation for everything that comes after football.",
    ],
    included: [
      { group: "Programs", items: ["Youth football camps & clinics", "Charitable organizations & foundations", "School and mentorship programs"] },
      { group: "Activations", items: ["Hometown & alma-mater events", "Personal appearances", "Speaking engagements"] },
    ],
    outcomes: ["Real relationships with the communities athletes represent", "Programs that run year after year", "Goodwill that strengthens every brand partnership"],
    steps: [
      { t: "Listen", d: "Start with what the athlete cares about and where they come from." },
      { t: "Design", d: "Camps, foundations or events sized to the athlete's schedule and goals." },
      { t: "Sustain", d: "Partners, logistics and follow-through so the impact lasts beyond one event." },
    ],
    proof: { athlete: "Quinton Dunbar", slug: "quinton-dunbar", line: "A Booker T. Washington High School alum with natural roots in Miami youth football." },
  },
  {
    slug: "concierge",
    n: "04",
    title: "Concierge & Wealth Infrastructure",
    short: "Concierge & Wealth",
    headline: { lead: "Complete clarity,", em: "on and off the field." },
    lede: "24/7 relocation, travel, tax and entity coordination, and post-career business transition.",
    image: "/img/helmet-night.webp",
    alt: "A football helmet resting on the field at night",
    intro: [
      "A professional career moves fast: new cities, new money, new obligations. IAG coordinates the operational and financial layer around each athlete so nothing falls through the cracks.",
      "That includes the body. IAG has relationships with some of the top medical professionals in the sports industry, keeping clients at optimal health through meticulous preparation, from performance nutrition to pre-hab and recovery.",
    ],
    included: [
      { group: "Wealth", items: ["Wealth management & financial planning", "Tax planning", "Entity coordination with tax counsel"] },
      { group: "Life & logistics", items: ["Relocation & travel", "Medical & physical therapy coordination", "Off-season training, nutrition & conditioning"] },
      { group: "Beyond the game", items: ["Post-career counseling", "Business transition planning", "Charitable giving strategy"] },
    ],
    outcomes: ["One accountable point of contact for life off the field", "Money decisions made with a plan, not pressure", "A clear path into the next career"],
    steps: [
      { t: "Map", d: "Every account, entity, obligation and professional around the athlete, in one place." },
      { t: "Coordinate", d: "Advisors, tax counsel, medical and logistics partners working from the same plan." },
      { t: "Transition", d: "Education, ventures and post-career planning that start long before the last game." },
    ],
    proof: { athlete: "Rashad Greene", slug: "rashad-greene", line: "After the NFL, Greene completed his FSU sport-management degree and, per FSU Athletics (2020), co-owns a Tallahassee childcare business." },
  },
];

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
