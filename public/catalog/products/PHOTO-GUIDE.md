# Product photo guide — all 27 SKUs

Drop **source** files into each product folder below. Accepted formats: **PNG, JPEG, or WebP**, sRGB, dark background `#020812` (match site void).

The site does **not** serve these files directly. Run `pnpm images:optimize` locally to generate WebP/AVIF variants in `{slug}/optimized/` and update `src/data/catalog-image-manifest.ts`.

**Git:** source files (`hero.*`, `mounted.*`) stay **local only** (gitignored). Commit `optimized/` + `src/data/catalog-image-manifest.ts` — ~8 MB total, fast pushes.

## Source file names (same for every product)

| File | Used in | Size | What to shoot |
|------|---------|------|----------------|
| `hero.png` / `hero.jpeg` | **Gallery grid** + detail slide 1 | **1200×1200** (1:1) or **1200×1500** (4:5) | Badge/product centered, fills ~75% of frame, no white PDF margins |
| `mounted.*` | Detail slide 2 | **1200×1500** (4:5) | Same badge **on the correct truck** (cab door, grille, wheel, or compliance mount point) |

Every product — model, HP, emissions, technology, installation, and hub caps — uses exactly **two** photos: **hero** + **mounted**.

## Workflow when replacing photos

1. Put source files in `public/catalog/products/{slug}/` (e.g. `hero.png`, `mounted.png`) — **local only**
2. Run `pnpm images:optimize`
3. Commit `optimized/` (including `.optimize-cache.json`) + `src/data/catalog-image-manifest.ts`
4. Push — sources are not in git; keep a backup copy outside the repo if needed

> Until AI/real shoots are ready, catalog scans are copied into each slot. Replace sources in place, then re-run optimize.

---

## Photo counts summary

| Category | Products | Photos each | Total |
|----------|----------|-------------|-------|
| All categories | 27 | **2** | **54** |

Grid always uses **`hero.webp` only**. Detail view uses **hero** + **mounted**.

---

## Per-product checklist

### Model badges (2 photos: hero + mounted)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `01-nh-12` | ATP-NH-12 | NH 12 | matte | hero, mounted (classic Volvo cab) |
| `02-fm9` | ATP-FM9 | FM9 | matte | hero, mounted (**FM cab front** model-badge zone) |
| `07-volvo-fh12` | ATP-VOLVO | VOLVO grille | matte | hero, mounted (**جلوپنجره** / FH12 grille center) |
| `16-fh` | ATP-FH | FH | matte-glossy | hero, mounted (FH front below grille) |
| `17-volvo` | ATP-VOLVO-MG | VOLVO grille | matte-glossy | hero, mounted (**جلوپنجره** / FH grille center) — **different finish from page 7** |
| `18-xf-daf` | ATP-XF | XF (DAF) | matte | hero, mounted (**جلوپنجره** / DAF XF grille) |

### Horsepower badges (2 photos: hero + mounted)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `03-420` | ATP-420 | 420 | matte | hero, mounted (cab **side door**) |
| `04-460` | ATP-460 | 460 | matte | hero, mounted (cab side) |
| `05-440` | ATP-440 | 440 | matte | hero, mounted (cab side) |
| `06-480` | ATP-480 | 480 | matte | hero, mounted (cab side) |
| `10-500` | ATP-500 | 500 | matte-glossy | hero, mounted (cab side) |
| `14-460-mg` | ATP-460-MG | 460 | matte-glossy | hero, mounted — **show gloss finish, not same as page 4** |
| `15-540` | ATP-540 | 540 | matte-glossy | hero, mounted (cab side) |
| `20-750` | ATP-750 | 750 | matte-glossy | hero, mounted (FH16 cab side) |

### Emissions badges (2 photos: hero + mounted)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `08-eev` | ATP-EEV | EEV | matte-glossy | hero, mounted (**cab side door** — same door-emblem zone as HP) |
| `11-euro-4` | ATP-EURO-4 | EURO 4 | matte | hero, mounted (**cab side door**) |
| `12-euro-5` | ATP-EURO-5 | EURO 5 | matte | hero, mounted (**cab side door**) |
| `13-euro-6` | ATP-EURO-6 | EURO 6 | matte-glossy | hero, mounted (**cab side door**) |

### Technology badges (2 photos: hero + mounted)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `09-i-shift` | ATP-I-Shift | I-Shift | matte-glossy | hero, mounted (**cab side door** exterior) |
| `19-i-save` | ATP-I-SAVE | I-SAVE | matte-glossy | hero, mounted (**cab side door** exterior) |

### Installation badges (2 photos: hero + mounted)

Mount on the **black upper fascia** beside the Volvo **iron mark** (below windshield / above main grille) — inspired by real FH front. **L = چپ (left of iron mark). V / IV / VI = راست (right of iron mark).**

| Folder | Code | Spec | Photos |
|--------|------|------|--------|
| `21-install-l` | ATP-Installation-L | L (low noise) | hero (green L badge), mounted (**left of iron mark**) |
| `22-install-v` | ATP-Installation-V | V | hero, mounted (**right of iron mark**) |
| `23-install-iv` | ATP-Installation-IV | IV | hero, mounted (**right of iron mark**) |
| `24-install-vi` | ATP-Installation-VI | VI | hero, mounted (**right of iron mark**) |

### Accessories — hub caps (2 photos: hero + mounted)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `25-hub-steel` | ATP-Hub-Steel | Hub Steel | steel | hero (cap face), mounted (**tandem white-steel duals** + leaf spring + dirt — ref `image_d80999.png`, steel caps on hubs) |
| `26-hub-black` | ATP-Hub-Black | Hub Black | glossy | hero (family studio lock), mounted (**front-on** polished rim + glossy hub + ATIS) |
| `27-hub-black-matte` | ATP-HUB-BLACK-M | Hub Black | matte | hero (**twin of 26**, matte only), mounted (**twin of 26 framing**, matte hub only) |

---

## Shooting notes by photo type

**hero** — Standalone raised letterforms on **dark carbon-fiber studio floor**, void black `#09090b` behind, navy/cyan rim light. **NO rectangular backing plate** behind the letters — letters rest on carbon fiber, not on a metal badge plate.

**mounted** — Real truck; buyer must see **OEM-standard place, position, and camera way**. Door badges (HP, EURO, EEV, I-Shift, I-SAVE) = **straight side-door**. Grille letters (VOLVO, XF) = **head-on جلوپنجره**. Installation L/V/IV/VI = **black upper fascia beside iron mark** (L left, V/IV/VI right). FH / NH 12 / FM9 = **front panel**. Hub = reference-matched axle/wheel setup.

---

## Legacy files

Old `public/catalog/page-XX.jpeg` files have been removed. All product images live under `public/catalog/products/{slug}/`.
