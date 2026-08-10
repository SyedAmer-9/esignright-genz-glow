# Plan: New Feature Cards, Pricing Line Items & Sliding Integrations

## Overview

Three changes to `src/routes/index.tsx`: expand the Features grid with three new capability cards, add those capabilities as line items in the pricing tiers, and add a new sliding "Integrations" logo strip (Google Drive, OneDrive, Dropbox).

---

## 1. Features Grid — 3 New Cards (edit 1, add 2)

**File:** `src/routes/index.tsx`

**Imports:** Add `DownloadCloud`, `ClipboardCheck`, `CloudDownload` to the lucide-react import block (lines 3-26).

**Edit existing card** (currently "Secure Audit Trail", line 465-468) → replace with:

- Icon: `ClipboardCheck`
- Title: **Comprehensive Activity Logs**
- Body: "Maintain total visibility. Track exactly who viewed, sent, or signed documents with detailed audit trails — perfect for teams sharing centralized accounts."

**Add two new cards** to the `features` array (after the last existing entry, before the closing `]` at line 509):


| Icon            | Title                    | Body                                                                                                                                                                |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DownloadCloud` | One-Click Bulk Downloads | Stop downloading files one by one. Export all your completed, legally binding documents instantly in a single batch.                                                |
| `CloudDownload` | Cloud Drive Auto-Sync    | Connect your personal or company-wide Google Drive, OneDrive, or Dropbox. Signed documents automatically sync to your secure folders the moment they are completed. |


**Grid layout note:** The grid uses `flex flex-wrap justify-center`, so a partial final row (15 cards in a 4-col grid → last row of 3) auto-centers. No layout change needed.

---

## 2. Pricing Table — Add Line Items to Business & Enterprise

**File:** `src/routes/index.tsx`, `tiers` array (lines 799-857)

**Any paid tier** append three items to the `features` array:

- `"Cloud Drive Auto-Sync (Google Drive, OneDrive, Dropbox)"`
- `"Advanced Activity & Audit Logs"`
- `"Bulk Document Download"`
- &nbsp;

---

## 3. Integrations — New Sliding Logo Strip

**File:** `src/routes/index.tsx`

Create a new `Integrations` component with a horizontal CSS marquee (infinite scroll) showing brand logos for **Google Drive, OneDrive, and Dropbox**. The logos will be inline SVGs (simple-icons paths) duplicated for seamless looping.

**Marquee CSS:** Add a `@keyframes marquee` animation to `src/styles.css` (translateX 0 → -50% on a duplicated logo set for seamless loop).

**Component structure:**

```
<section> "Integrations" label
  <div class="marquee-track" animate>
    [Google Drive] [OneDrive] [Dropbox] [Google Drive] [OneDrive] [Dropbox]  (duplicated for seamless loop)
  </div>
</section>
```

Each logo: inline SVG icon + brand name label, grayscale by default with color-on-hover (matching the existing LogoCloud pattern).

**Placement in page layout** (line 1094-1106 `LandingPage`):
Insert `<Integrations />` after `<Features />` and before `<Testimonial />`.

---

## Files Changed

- `src/routes/index.tsx` — feature cards, pricing items, new Integrations component + placement
- `src/styles.css` — marquee keyframe animation