# Product photo guide — all 26 SKUs

Drop **source** files into each product folder below. Accepted formats: **PNG, JPEG, or WebP**, sRGB, dark background `#020812` (match site void).

The site does **not** serve these files directly. Run `pnpm images:optimize` (also runs automatically before `pnpm build`) to generate WebP/AVIF variants in `{slug}/optimized/` and update `src/data/catalog-image-manifest.ts`.

## Source file names (same for every product type)

| File | Used in | Size | What to shoot |
|------|---------|------|----------------|
| `hero.png` / `hero.jpeg` | **Gallery grid** + detail slide 1 | **1200×1200** (1:1) or **1200×1500** (4:5) | Badge/product centered, fills ~75% of frame, no white PDF margins |
| `mounted.*` | Detail slide 2 | **1200×1500** (4:5) | Same badge **on the correct truck** (cab door, grille, or wheel) |
| `detail.*` | Detail slide 3 (optional but recommended) | **1200×1500** | Close-up: lettering edge, finish texture, or back/clips |

**Installation** products use `install.*` instead of `mounted.*` (placement diagram / Pc.24 guide).

## Workflow when replacing photos

1. Put source files in `public/catalog/products/{slug}/` (e.g. `hero.png`, `mounted.png`, `detail.png`)
2. Run `pnpm images:optimize`
3. Commit sources + `optimized/` + `src/data/catalog-image-manifest.ts`
4. Refresh — no code changes per SKU

> Until AI/real shoots are ready, catalog scans are copied into each slot. Replace sources in place, then re-run optimize.
---

## Photo counts summary

| Category | Products | Photos each | Total |
|----------|----------|-------------|-------|
| Model / HP / Emissions / Tech badges | 20 | **3** | **60** |
| Installation badges | 4 | **2** | **8** |
| Hub cap accessories | 2 | **3** | **6** |
| **Grand total** | **26** | — | **74** |

Grid always uses **`hero.webp` only**. Detail view uses all files in the folder (2 or 3).

---

## Per-product checklist

### Model badges (3 photos: hero + mounted + detail)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `01-nh-12` | ATP-NH-12 | NH 12 | matte | hero, mounted (classic Volvo cab), detail |
| `02-fm9` | ATP-FM9 | FM9 | matte | hero, mounted (FM cab door/front), detail |
| `07-volvo-fh12` | ATP-VOLVO | VOLVO grille | matte | hero, mounted (FH12 grille), detail |
| `16-fh` | ATP-FH | FH | matte-glossy | hero, mounted (FH front), detail |
| `17-volvo` | ATP-VOLVO-MG | VOLVO grille | matte-glossy | hero, mounted (FH grille), detail — **different finish from page 7** |
| `18-xf-daf` | ATP-XF | XF (DAF) | matte | hero, mounted (DAF XF cab), detail |

### Horsepower badges (3 photos: hero + mounted + detail)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `03-420` | ATP-420 | 420 | matte | hero, mounted (cab **side door**), detail |
| `04-460` | ATP-460 | 460 | matte | hero, mounted (cab side), detail |
| `05-440` | ATP-440 | 440 | matte | hero, mounted (cab side), detail |
| `06-480` | ATP-480 | 480 | matte | hero, mounted (cab side), detail |
| `10-500` | ATP-500 | 500 | matte-glossy | hero, mounted (cab side), detail |
| `14-460-mg` | ATP-460-MG | 460 | matte-glossy | hero, mounted, detail — **show gloss finish, not same as page 4** |
| `15-540` | ATP-540 | 540 | matte-glossy | hero, mounted (cab side), detail |
| `20-750` | ATP-750 | 750 | matte-glossy | hero, mounted (FH16 cab side), detail |

### Emissions badges (3 photos: hero + mounted + detail)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `08-eev` | ATP-EEV | EEV | matte-glossy | hero, mounted (cab/chassis norm location), detail |
| `11-euro-4` | ATP-EURO-4 | EURO 4 | matte | hero, mounted, detail |
| `12-euro-5` | ATP-EURO-5 | EURO 5 | matte | hero, mounted, detail |
| `13-euro-6` | ATP-EURO-6 | EURO 6 | matte-glossy | hero, mounted, detail |

### Technology badges (3 photos: hero + mounted + detail)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `09-i-shift` | ATP-I-Shift | I-Shift | matte-glossy | hero, mounted (cab tech badge area), detail |
| `19-i-save` | ATP-I-SAVE | I-SAVE | matte-glossy | hero, mounted, detail |

### Installation badges (2 photos: hero + install)

| Folder | Code | Spec | Photos |
|--------|------|------|--------|
| `21-install-l` | ATP-Installation-L | L (low noise) | hero (green L badge), **install** (Pc.24 placement diagram) |
| `22-install-v` | ATP-Installation-V | V | hero, install |
| `23-install-iv` | ATP-Installation-IV | IV | hero, install |
| `24-install-vi` | ATP-Installation-VI | VI | hero, install |

### Accessories — hub caps (3 photos: hero + mounted + detail)

| Folder | Code | Spec | Finish | Photos |
|--------|------|------|--------|--------|
| `25-hub-steel` | ATP-Hub-Steel | Hub Steel | steel | hero (cap face), mounted (**on wheel/axle**), detail (chrome edge) |
| `26-hub-black` | ATP-Hub-Black | Hub Black | glossy | hero, mounted (on wheel), detail |

---

## Shooting notes by photo type

**hero** — Flat lay or straight-on; dark background; readable spec text; used small (grid tile) and large (detail).

**mounted** — Real truck or realistic mock; buyer must see **where it goes** and **scale**.

**detail** — Macro of finish (matte vs matte-glossy must look different on pages 4 vs 14, 7 vs 17).

**install** — Scan/diagram from Pc.24 guide showing position on FH/FM; legible at phone size.

---

## Legacy files

Old `public/catalog/page-XX.jpeg` files have been removed. All product images live under `public/catalog/products/{slug}/`.
