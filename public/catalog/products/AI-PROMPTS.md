# AI image prompts — all 26 products

Use your **reference hero shots** (dark chrome, navy rim light) as **style reference** in Midjourney (`--sref`), Flux, or ChatGPT image **+ attach reference**.

**Export size:** hero **1200×1200** or **1200×1500** · mounted/detail **1200×1500** · PNG or JPEG (sources)

**Save to:** `public/catalog/products/{folder}/hero.png` (or `.jpeg`) — then run `pnpm images:optimize` to generate deployable WebP/AVIF in `{folder}/optimized/`

---

## Brand colors (always include in hero prompts)

```
Background: void black #09090b, subtle navy fog #003d81 at 15% opacity
Rim light: cool cyan-blue #84bce8 / #9ccdef
Accent glow: navy #003d81
Mood: premium industrial vault, B2B truck parts, cinematic macro, NOT consumer ecommerce
```

---

## Master prompt — HERO (artistic, all badges)

Copy this block, then replace `{BADGE_TEXT}`, `{FINISH}`, `{BADGE_TYPE}`.

```
Cinematic macro product hero shot of an OEM truck cab badge reading "{BADGE_TEXT}",
{BADGE_TYPE}, {FINISH} finish, embossed metallic lettering, premium European heavy truck styling,
floating at slight angle on pure void black background #09090b,
dramatic rim lighting from upper right in navy blue #003d81 and cyan highlight #9ccdef,
sharp specular edges, soft falloff shadows, shallow depth of field,
industrial vault aesthetic, hyper-detailed 3D product photography,
no truck visible, no people, no watermark, no extra text,
centered composition badge fills 70% of frame, 1:1 aspect ratio, 8K quality
```

### Finish modifiers (pick one)

| Finish | Add to prompt |
|--------|----------------|
| **matte** | `satin matte chrome, soft diffuse reflections, no mirror shine, brushed metal texture` |
| **matte-glossy** | `dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights` |
| **glossy (piano black)** | `piano black lacquer surface, deep mirror reflections, glossy black hub cap or badge` |
| **steel (chrome)** | `polished stainless steel, mirror chrome, bright specular highlights, classic wheel cap look` |

### Badge type modifiers

| Type | Add to prompt |
|------|----------------|
| Model badge | `rectangular cab model badge with curved profile matching Volvo/DAF cab contour` |
| HP numeric | `large numeric horsepower badge "XXX", bold industrial font, cab door size proportion` |
| Emissions | `small regulatory emissions badge "EURO X" or "EEV", clean regulatory typography` |
| Technology | `technology feature badge "I-Shift" or "I-SAVE", modern Volvo truck styling` |
| Installation | `small circular green regulatory sticker badge with white letter/roman numeral, European truck compliance marker` |
| Hub cap | `circular truck wheel hub cap, convex dome shape, center bore visible` |

---

## Master prompt — MOUNTED (realistic photo)

```
Photorealistic documentary photograph, real European heavy truck in fleet yard,
{BADGE_TEXT} badge clearly visible and readable at {MOUNT_LOCATION},
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo/DAF truck cab, slightly weathered but professional fleet condition,
B2B commercial catalog photography, no people, no logos except badge,
realistic colors, not CGI, not artistic lighting, 4:5 vertical crop
```

### Mount locations

| Product group | `{MOUNT_LOCATION}` |
|---------------|-------------------|
| HP badges | `lower cab side door panel below window line` |
| Model FH/FM/VOLVO grille | `front grille center, VOLVO lettering prominent` |
| Emissions / EEV | `cab side or chassis fairing near door, small norm badge` |
| I-Shift / I-SAVE | `cab side technology badge zone near door` |
| DAF XF | `DAF XF cab front model badge area` |
| Hub caps | `rear axle wheel hub, cap installed on truck wheel` |
| Installation L/V/IV/VI | `cab front corner or door area where green compliance badge is mounted` |

---

## Master prompt — DETAIL (realistic macro)

```
Extreme macro photograph, real physical truck badge NOT CGI,
close-up of {DETAIL_FOCUS} on "{BADGE_TEXT}" badge,
{FINISH} finish texture visible, factory-quality edges,
soft workshop diffused light, neutral gray background blur,
photorealistic, sharp focus on lettering edge and surface grain,
commercial parts catalog detail shot, 4:5 vertical, no watermark
```

| Finish | `{DETAIL_FOCUS}` |
|--------|------------------|
| matte | `satin matte metal grain and embossed letter shoulder` |
| matte-glossy | `contrast between matte base and glossy raised numbers` |
| glossy | `piano black lacquer surface and reflection curve` |
| steel | `polished chrome rim and mirror reflection on dome edge` |

---

## Master prompt — INSTALL (realistic diagram)

```
Clean technical installation diagram photograph,
Volvo FH/FM truck cab line drawing or simplified side silhouette in light gray,
green circular compliance badge {BADGE_MARK} shown at correct factory mount position,
arrow or dashed line indicating placement, white background or light workshop table,
documentary style scan of OEM Pc.24 installation guide, legible at mobile size,
photorealistic flat lay of printed technical sheet, 4:5 vertical
```

---

# All 26 products — copy-paste prompts

---

## 01-nh-12 · NH 12 (matte model badge)

**hero.webp**
```
Cinematic macro product hero shot of an OEM truck cab badge reading "NH 12",
Volvo classic model badge rectangular with curved profile, satin matte chrome finish, soft diffuse reflections,
embossed metallic lettering, premium European heavy truck styling,
floating at slight angle on pure void black background #09090b,
dramatic rim lighting navy #003d81 and cyan #9ccdef, shallow depth of field,
industrial vault aesthetic, hyper-detailed 3D product photography,
no truck, centered, badge fills 70% of frame, 1:1, 8K
```

**mounted.webp** — Volvo classic conventional cab, "NH 12" badge on cab front/side model area, photorealistic fleet yard.

**detail.webp** — Macro satin matte grain on "NH 12" letter edges.

---

## 02-fm9 · FM9 (matte model badge)

**hero:** `{BADGE_TEXT}` = `FM9`, matte, model badge  
**mounted:** Volvo FM series cab, FM9 badge on door or front model zone  
**detail:** Macro matte emboss on "FM9"

---

## 03-420 · 420 HP (matte)

**hero:** `{BADGE_TEXT}` = `420`, matte, HP numeric badge, bold industrial numbers  
**mounted:** Volvo FH/FM cab side door, "420" badge visible  
**detail:** Macro matte number "420" edge profile

---

## 04-460 · 460 HP matte

**hero:** `{BADGE_TEXT}` = `460`, matte, HP numeric  
**mounted:** Volvo cab side door "460"  
**detail:** Macro matte "460" — **must look duller than 14-460-mg**

---

## 05-440 · 440 HP (matte)

**hero:** `440`, matte HP badge  
**mounted:** Volvo cab side door  
**detail:** Macro matte "440"

---

## 06-480 · 480 HP (matte)

**hero:** `480`, matte HP badge  
**mounted:** Volvo cab side door  
**detail:** Macro matte "480"

---

## 07-volvo-fh12 · VOLVO grille matte (FH12)

**hero:** `{BADGE_TEXT}` = `VOLVO`, matte, large grille lettering badge, wide horizontal chrome letters  
**mounted:** Volvo FH12 front grille, VOLVO letters centered  
**detail:** Macro matte VOLVO letter "V" shoulder — **dull satin, not glossy**

---

## 08-eev · EEV (matte-glossy)

**hero:** `EEV`, matte-glossy emissions badge, dual-tone satin base glossy letters  
**mounted:** Volvo cab side small EEV emissions badge  
**detail:** Macro dual-tone EEV letters

---

## 09-i-shift · I-Shift (matte-glossy)

**hero:** `I-Shift`, matte-glossy technology badge, modern Volvo typography with hyphen  
**mounted:** Volvo FH cab side I-Shift badge area  
**detail:** Macro glossy "I-Shift" text on matte base

---

## 10-500 · 500 HP (matte-glossy)

**hero:** `500`, matte-glossy HP badge, large numbers dual-tone finish  
**mounted:** Volvo FH cab side "500"  
**detail:** Macro gloss numbers on satin base

---

## 11-euro-4 · EURO 4 (matte)

**hero:** `EURO 4`, matte emissions badge, regulatory typography  
**mounted:** Volvo cab side/chassis EURO 4 badge  
**detail:** Macro matte "EURO 4" text

---

## 12-euro-5 · EURO 5 (matte)

**hero:** `EURO 5`, matte emissions badge  
**mounted:** Volvo cab EURO 5 badge location  
**detail:** Macro matte "EURO 5"

---

## 13-euro-6 · EURO 6 (matte-glossy)

**hero:** `EURO 6`, matte-glossy modern emissions badge  
**mounted:** Volvo FH cab EURO 6 badge  
**detail:** Macro modern glossy EURO 6 lettering

---

## 14-460-mg · 460 HP matte-glossy

**hero:** `460`, matte-glossy HP badge, **glossy raised numbers on matte base, more shine than matte version**  
**mounted:** Volvo cab side "460"  
**detail:** Macro showing gloss vs matte contrast on "460" — **must differ from 04-460**

---

## 15-540 · 540 HP (matte-glossy)

**hero:** `540`, matte-glossy HP badge  
**mounted:** Volvo cab side "540"  
**detail:** Macro dual-tone "540"

---

## 16-fh · FH (matte-glossy model)

**hero:** `FH`, matte-glossy model badge, Volvo FH series front badge proportion  
**mounted:** Volvo FH cab front "FH" badge  
**detail:** Macro FH letter gloss detail

---

## 17-volvo · VOLVO grille matte-glossy

**hero:** `VOLVO`, matte-glossy grille lettering, **brighter highlights than 07-volvo-fh12**  
**mounted:** Volvo FH front grille VOLVO letters  
**detail:** Macro glossy VOLVO letter edge — **more reflection than page 7**

---

## 18-xf-daf · DAF XF (matte)

**hero:** `XF`, matte DAF model badge, DAF XF cab styling not Volvo  
**mounted:** DAF XF cab front "XF" badge, photorealistic  
**detail:** Macro matte DAF XF badge texture

---

## 19-i-save · I-SAVE (matte-glossy)

**hero:** `I-SAVE`, matte-glossy technology badge, hyphenated Volvo fuel tech styling  
**mounted:** Volvo FH cab I-SAVE badge zone  
**detail:** Macro I-SAVE lettering finish

---

## 20-750 · 750 HP (matte-glossy)

**hero:** `750`, matte-glossy large HP badge, premium FH16 prestige styling, largest numeric badge  
**mounted:** Volvo FH16 cab side door "750"  
**detail:** Macro glossy "750" on matte base

---

## 21-install-l · Installation L

**hero:**
```
Cinematic macro of small circular green European truck compliance badge,
white letter "L" center, matte finish, Lärmarm low-noise marker,
void black background #09090b, navy cyan rim light, vault aesthetic, 1:1
```

**install.webp:** Technical diagram Volvo FH/FM side view, green "L" badge mount position Pc.24 guide style.

---

## 22-install-v · Installation V

**hero:** Green circular badge white letter `V`, same hero style as 21  
**install.webp:** FH/FM diagram with V badge placement

---

## 23-install-iv · Installation IV

**hero:** Green circular badge white roman numeral `IV`  
**install.webp:** FH/FM diagram IV placement

---

## 24-install-vi · Installation VI

**hero:** Green circular badge white roman numeral `VI`, EURO 6 related compliance  
**install.webp:** FH/FM diagram VI placement

---

## 25-hub-steel · Hub Steel (steel chrome)

**hero:**
```
Cinematic macro of polished stainless steel truck wheel hub cap,
mirror chrome dome, convex circular shape, center bore,
void black #09090b, navy cyan rim light #003d81 #9ccdef,
industrial vault product hero, reflective chrome highlights, 1:1, no wheel
```

**mounted:** Photorealistic hub cap installed on Volvo/DAF truck rear wheel axle  
**detail:** Macro chrome dome edge reflection

---

## 26-hub-black · Hub Black (glossy)

**hero:**
```
Cinematic macro of piano black glossy truck wheel hub cap,
deep black lacquer mirror reflections, convex circular dome,
void black background, subtle navy cyan edge light, premium dark edition styling, 1:1
```

**mounted:** Glossy black hub cap on truck wheel with smoked rim  
**detail:** Macro piano black surface curve and reflection

---

## Tool tips

### Midjourney
```
/imagine prompt: [hero prompt above] --ar 1:1 --style raw --sref [your reference URL] --sw 100
```

### ChatGPT / DALL-E
Attach your reference hero + catalog PDF crop of correct badge shape. Ask: "Match reference lighting and colors exactly. Text must read {BADGE_TEXT} correctly."

### Flux / SD
Use reference image at 0.4–0.6 strength for hero. Negative prompt:
```
white background, daylight, truck, people, watermark, blurry text, wrong spelling,
cartoon, illustration, oversaturated, warm orange light
```

### After generation
1. Crop to 1:1 (hero) or 4:5 (mounted/detail)  
2. Place on `#09090b` if AI added gray background (hero only)  
3. Verify text spelling matches spec exactly  
4. Save as `hero.webp`, `mounted.webp`, `detail.webp` in correct folder

---

## Quick count

| Type | Files | AI style |
|------|-------|----------|
| 20 badges | hero + mounted + detail | hero = artistic · others = realistic |
| 4 installation | hero + install | hero = artistic · install = diagram photo |
| 2 hub caps | hero + mounted + detail | hero = artistic · others = realistic |
| **Total** | **74 images** | |
