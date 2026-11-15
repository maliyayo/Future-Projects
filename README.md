# Infinity Athletic Group (IAG): Website Redesign

A complete redesign of iathleticg.com. It is a static site with no build step: open `index.html` or serve the folder.

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Design direction: "Midnight Stadium"
| Token | Hex | Use |
|---|---|---|
| Midnight navy | `#0A0F2C` / `#10173A` / `#19214B` | Page background and raised surfaces (client-approved Option A) |
| Chalk | `#F4F1EA` | Light accents, hero cards |
| Midnight ink | `#0A0F2C` | Type, dark sections |
| Electric cobalt | `#2B44FF` | Primary brand color, echoes the logo blue |
| Signal coral | `#FF5A36` | Every conversion CTA, echoes the logo red |
| Volt | `#DCFF4F` | Micro-accents, energy |

Type: **Archivo** (variable width axis, for condensed sports headlines), **Manrope** (body), **JetBrains Mono** (labels).

## What's in it
- **3D hero**: a Three.js iridescent infinity ribbon (from the logo mark) with a comet racing along it and a reactive particle field. It breaks out of the video frame and follows the cursor.
- **Video**: hero reel montage, a yard-line background for pre-draft, and a crowd reel inside a scroll-expanding mask.
- **Motion**: preloader, word-by-word reveals, scroll-scrubbed text, stacking Mission/Vision/Philosophy cards, a pinned horizontal combine-drill gallery with animated SVG drill diagrams, velocity-skewed ticker, brand marquees, parallax and animated counters.
- **Cursor**: custom dot and ring with contextual labels (Watch, Proof, Train…), magnetic buttons, and 3D tilt cards.
- **Conversion**: a direct-response copy layer (hook, subhead, benefit bullets, value equation, offer stack, risk reversal), a sticky mobile CTA dock, and a 2-step lead form.
- Respects `prefers-reduced-motion`. Without WebGL or JS the content still renders.

## Before launch (client to confirm)
1. **Lead form**: it currently opens the visitor's email app pre-filled to `shaheed@iathleticg.com`. Connect it to a real form backend (Formspree, HubSpot, a CRM) to capture leads reliably.
2. **Social links**: Facebook / X / YouTube point to `#`. The live site didn't expose the URLs.
3. **New marketing claims** need client sign-off: "free 30-minute Career Blueprint Call", "Now Recruiting 2026–27", "IAG is selective / limited number of athletes".
4. **Founder photo**: Shaheed Samuel is shown as an "SS" monogram. Swap in a headshot if available.
5. **Typos fixed from the original copy**: "Dumbar" → Dunbar, "Combine-Specic" → Specific, "Wonderlich" → Wonderlic.

## Media credits
- Client photos (athletes, staff, logo) are from the existing iathleticg.com, used with the owner's permission.
- Stock video from [Mixkit](https://mixkit.co) (Mixkit License). Stock photos from [Pexels](https://www.pexels.com) (Pexels License).
