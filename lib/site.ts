export const site = {
  name: "Infinity Athletic Group",
  short: "IAG",
  url: "https://www.iathleticg.com",
  email: "shaheed@iathleticg.com",
  founder: "Shaheed Samuel",
  address: { street: "1037 NW 3rd Ave", city: "Miami", region: "FL", country: "US" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1037+NW+3rd+Ave+Miami+FL",
  tagline: "On the field. Off the field. And beyond.",
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const nav: NavItem[] = [
  {
    label: "Roster",
    href: "/#roster",
    children: [
      { label: "Quinton Dunbar", href: "/athletes/quinton-dunbar", note: "Cornerback · Washington" },
      { label: "Rashad Greene", href: "/athletes/rashad-greene", note: "Wide Receiver · Jacksonville" },
    ],
  },
  {
    label: "Four Pillars",
    href: "/#what-we-do",
    children: [
      { label: "Representation & Contracts", href: "/pillars/representation" },
      { label: "Brand & Content", href: "/pillars/brand" },
      { label: "Community & Legacy", href: "/pillars/community" },
      { label: "Concierge & Wealth", href: "/pillars/concierge" },
    ],
  },
  { label: "Case Studies", href: "/#case-studies" },
  {
    label: "Partnerships",
    href: "/partnerships",
    children: [
      { label: "Brands & Sponsors", href: "/partnerships#brands" },
      { label: "Advisors & Professionals", href: "/partnerships#advisors" },
      { label: "Families & Prospects", href: "/partnerships#families" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Founder Story", href: "/about/founder" },
      { label: "Meet the Team", href: "/team" },
      { label: "Our Approach", href: "/about" },
    ],
  },
];

export const inquiryTypes = [
  "Representation",
  "Endorsement / Sponsorship",
  "Appearance / Speaking",
  "Media / Interview",
  "Camp / Community Event",
  "Other",
];
