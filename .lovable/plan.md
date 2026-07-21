Implement the Indian-origin branding on the landing page as requested.

Changes:

1. **Top sticky banner** (Option 2) — Add a thin banner above the navbar in `src/routes/index.tsx` that reads `Made in India · Made for India`. It will use a small Indian flag color accent (saffron `#FF9933`, white `#FFFFFF`, green `#138808`) and sit directly above the main header.

2. **Hero badge** (Option 1) — Insert a compact badge below the hero tagline that reads `Trusted by 308+ teams · Made in India · Made for India`. This will use a bordered pill style with a subtle flag-color left edge or dot strip.

3. **Page title** — Update `src/routes/__root.tsx` to include "for India" in the title and meta tags. Current title: `eSignRight | Fast, Legal, and Secure E-Signatures`. New title: `eSignRight | Fast, Legal, and Secure E-Signatures for India`. Matching updates to `og:title` and `description` to reflect the India focus.

4. **Design tokens** — Add new semantic tokens for the Indian flag colors in `src/styles.css` (e.g., `--india-saffron`, `--india-white`, `--india-green`) so they can be reused and remain consistent with the design system.

No other pages or business logic are affected.