
## Goal
Add real customer proof to the landing page using the 5 testimonials the CS team provided, and show client logos for the companies that approved logo use.

## Placement
Insert a new `Testimonials` section in `src/routes/index.tsx` between the existing Features ("What proof looks like") section and the Compliance section. This puts social proof right after the product story and before the legal/trust content — the natural conversion path.

Update the small "Trusted by 300+ teams" strip under the hero to become a lightweight logo marquee (grayscale, hover-color) using only the approved logos.

## Content rules (respecting CS team permissions)
- **Show quote + company name + logo + website link:** Cloudspace Tek, Xtrac IT
- **Show quote + company name + website link, no logo:** Unicom Tec
- **Hold back for now (pending CEO approval):** Techlogyx, Amzur — keep their data ready in a commented-out block in the same file so we can flip them on with a one-line change once approval lands. Not rendered until then.

So the live section ships with 3 testimonials and 2 logos. Once approvals come in, we uncomment to reach 5 testimonials and up to 4 logos.

## Section design
Header: section label "LOVED BY TEAMS" + heading "What customers say" (matches existing SectionLabel / heading pattern already used on the page).

Layout: responsive card grid — 1 column mobile, 2 columns md, 3 columns lg. Cards use the same white surface + subtle border + rounded-lg + hover lift already used by the compliance cards, so it feels native to the page (no new visual pattern).

Each card:
- Opening quote mark (decorative, muted)
- Testimonial text (Lato, body size, `text-wrap: balance`)
- Divider
- Company logo (if approved) OR company monogram fallback (if not) — fixed height ~28px, `object-contain`
- Company name (Montserrat semibold) linking to their website, `target="_blank"` + `rel="noopener noreferrer"`

Below the grid: a thin horizontal logo strip ("Trusted by teams like") showing the approved logos larger, grayscale by default, full color on hover. This replaces the current generic "Trusted by 300+ teams" line — we keep the "300+ teams" copy above it.

## Animations
Reuse existing motion vocabulary — no new CSS keyframes:
- Cards fade/slide in on scroll via the existing intersection pattern already used elsewhere on the page (staggered by index).
- Hover: subtle `translate-y-[-2px]` + shadow, matching compliance cards.
- Logo strip: gentle opacity transition on hover (grayscale → color).

## Assets
Download the two approved logos from the company sites, optimize, and drop into `public/assets/logos/`:
- `public/assets/logos/cloudspacetek.png` (or .svg if available)
- `public/assets/logos/xtracit.png`

Reference directly as `/assets/logos/<file>` (same pattern as the existing `/video-thumb.png` and `/assets/esignright-logo.png` — works on Vercel without asset pointers). No Supabase/Lovable asset CDN.

If the site doesn't expose a clean logo asset, I'll flag it and ask for a direct upload.

## Technical details
- All changes confined to `src/routes/index.tsx` plus new logo files under `public/assets/logos/`.
- New data lives as a typed `const testimonials` array at the top of the file, with a `logoApproved: boolean` flag so hiding/showing an entry is a one-property change.
- Uses existing `SectionLabel`, spacing (`py-20`), and container widths — no new design tokens, no styles.css changes.
- Links use `rel="noopener noreferrer"` and `target="_blank"` since they leave the site.
- Alt text on every logo (`alt="{Company} logo"`) for a11y and SEO.

## Out of scope
- No CMS / admin UI to manage testimonials — this is a static array; new quotes are a code edit.
- No carousel/slider — grid is faster to scan and better on mobile.
- No pulling logos automatically from client sites at runtime — we host them ourselves for reliability.
