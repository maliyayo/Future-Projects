# Infinity Athletic Group (IAG): Website v2

An editorial, luxury sports-agency site for Infinity Athletic Group (iathleticg.com), led by NFLPA Certified Contract Advisor Shaheed Samuel in Miami, FL.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 12 · Three.js (hero ribbon) · Lucide icons. Deploys on Vercel with no extra configuration.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; all routes are statically prerendered
```

## Routes
| Route | What it is |
|---|---|
| `/` | Hub: full-bleed video hero, pillars bar, roster showcase (`01.` / `02.`), four disciplines (`01`–`04`), case studies (modals), founder pull-quote, brand & partnership inquiry |
| `/athletes/quinton-dunbar` | Athlete profile: hero, vitals strip, career narrative, stats tabs (Pro / College / Testing / Timeline scrubber), brand & community, media & press, booking bar, next-athlete switcher |
| `/athletes/rashad-greene` | Same structure |
| `/about` | IAG story, Shaheed Samuel, boutique vs. mega-agency, team |
| `/athletes` | Redirects to `/#roster` |

## Design system: "Obsidian Editorial"
| Token | Hex | Use |
|---|---|---|
| Obsidian / Carbon | `#09090B` / `#0F1115` | Canvas |
| Paper | `#F8F8F6` | Editorial light sections |
| Alabaster | `#F4F4F5` | Primary text |
| Slate | `#9CA3AF` | Secondary text |
| Champagne gold | `#C8A96E` (`#9C8048` on light) | Index numbers, borders, hovers, CTAs |
| Logo blue / red | `#203878` / `#E81828` | 3D infinity ribbon only |

Type: **Cormorant Garamond** (display and quotes), **Inter** (body), **JetBrains Mono** with tabular numerals (index numbers and stats).

## Where content lives
- `lib/athletes.ts`: all athlete copy, stats and timelines. See `RESEARCH.md` before changing any fact.
- `lib/site.ts`: address, email, nav and inquiry types.
- `components/home/*`, `components/athlete/*`: page sections.

## Inquiry forms
Both forms (the homepage form and the slide-in drawer) validate input, then open the visitor's email app with a pre-filled message to `shaheed@iathleticg.com`. Before launch, connect a form backend (Formspree, Resend, HubSpot, etc.) so leads are captured even if the visitor never presses send.

## Before launch (client to confirm)
1. **Representation wording.** The site calls both athletes "IAG Client". The NFLPA profile shows no current contracts, and a 2021 ESPN report named a different agency for Dunbar's Detroit deal. Confirm the athletes approve being featured and that IAG can field appearance and endorsement inquiries for them.
2. **Street address.** 1037 NW 3rd Ave was supplied by the client; public records only confirm ZIP 33136.
3. **Testimonial.** The pull-quote band uses Shaheed's own words. Add a real, approved client quote when available. Never invent one.
4. **Photos.** The athlete photos are the 2015-era banner crops from the old site (about 490px tall). Supply high-resolution portraits and action shots for best results.
5. **Team.** Staff names and titles come from the 2015 site; confirm they're current.
6. **Socials.** No verified athlete or agency social handles were found; profile links point to ESPN, NFL.com and school pages.

## Media credits
Client photos and logo from iathleticg.com (used with the owner's permission). Video from Mixkit (Mixkit License). Photos from Pexels (Pexels License).
