# AI image prompts — all 26 products

Use your **reference hero shots** (dark chrome, navy rim light) as **style reference** in Midjourney (`--sref`), Flux, or ChatGPT image **+ attach reference**.

**Export size:** hero **1200×1200** or **1200×1500** · mounted **1200×1500** · PNG or JPEG (sources)

**Save to:** `public/catalog/products/{folder}/hero.png` (or `.jpeg`) — then run `pnpm images:optimize` to generate deployable WebP/AVIF in `{folder}/optimized/`. Sources are gitignored; commit only `optimized/` + manifest.

Every product uses exactly **two** images: **hero** + **mounted**.

**Reference images:** Attach the catalog PDF crop or your approved hero (`image_f1437c.png` / `image_f14381.png`) for every hero generation. Prompts say *MUST REFERENCE UPLOADED IMAGE* — swap in your actual file name.

---

## Brand colors (all hero shots)

```
Background: pure void black #09090b
Rim light: navy blue #003d81 + icy cyan #9ccdef
Accent glow: navy #003d81 at low opacity
Mood: moody studio, cinematic extreme macro, editorial tech-surrealist, B2B truck parts — NOT consumer ecommerce
```

---

## Hero shape rule (critical — read this)

Two different things — do **not** confuse them:

| ✅ YES — studio environment | ❌ NO — badge part |
|------------------------------|-------------------|
| Dark **carbon-fiber textured surface** (studio floor) | Rectangular **backing plate** behind letters |
| Moody studio, void black `#09090b` behind | Metal **badge substrate** / mount panel |
| Letters **rest on** the carbon-fiber floor | Letters fused to a visible **base plate** |

Hero = **standalone raised letterforms** sitting on carbon fiber in a moody studio — like your 750 reference prompt. **Not** floating in empty void. **Not** letters on a rectangular chrome plate.

**Typography (مورب):** Cab letterform badges use **italic forward-leaning slant** — typical Volvo OEM cab-door / cab-side angle. **Not** upright horizontal text. Match slant from reference image.

Hub caps: dome resting on carbon-fiber floor — **no white border ring**.

**Installation badges only (21–24: L / V / IV / VI):** flat glossy vinyl compliance sticker on carbon-fiber floor, no extra plate behind disk — **thick uniform white circular border exactly at the outer edge of the circle** (green fill stops at inner edge of white ring, zero gap, no green beyond white border, white ring = outermost edge of emblem). **NOT** arrow shapes, **NOT** metal arms, **NOT** neon green. **Do not apply this white-border rule to letter badges, HP numbers, VOLVO, hub caps, or any other product.**

---

## Hero boilerplate (identical on every product — do not shorten)

Every hero prompt must end with this **exact** studio block (only the `MUST REFERENCE` line may add product-specific notes):

```
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact shape, proportions, and finish,
no truck visible, no people, no watermark, no extra text,
centered composition, product fills 70% of frame, 1:1 aspect ratio, 8K quality
```

Letter badges: use `letterforms fill 70%` instead of `product fills 70%`. Hub caps: `cap fills 70%`. Green disks: `disk fills 70%`.

---

## Master prompt — HERO (cinematic extreme macro)

All heroes share the same **look family**: letterforms resting on dark carbon-fiber studio floor, void black behind, intense rim light, ultra-shallow DOF, 70% frame fill, 1:1.

```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "{BADGE_TEXT}",
{BADGE_TYPE}, {FINISH}, raised embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling, resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on letter shoulders, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact letter shapes, proportions, and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

### Finish modifiers

| Finish | Text for `{FINISH}` |
|--------|---------------------|
| **matte** | `satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture` |
| **matte-glossy** | `dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish` |
| **glossy** | `piano black lacquer surface, deep mirror reflections, high-gloss automotive finish` |
| **steel** | `polished stainless steel finish, mirror chrome, bright specular highlights` |

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
| HP badges (420–750) | `lower cab side door panel below window line` |
| VOLVO grille badges (07, 17) | `front grille center (جلوپنجره), VOLVO lettering prominent` |
| FH model badge (16) | `front cab badge area below grille` |
| DAF XF (18) | `DAF XF front grille area (جلوپنجره), XF model badge visible` |
| Emissions / EEV | `cab side or chassis fairing near door, small norm badge` |
| I-Shift / I-SAVE | `cab side technology badge zone near door` |
| NH 12 / FM9 | `cab front model badge area on classic Volvo conventional cab` |
| Hub caps | `rear axle wheel hub, cap installed on truck wheel` |
| Installation **L** | `front grille (جلوپنجره), **left side** of grille — L is always mounted on the left` |
| Installation **V, IV, VI** | `front grille (جلوپنجره), **right side** of grille — V / IV / VI always on the right` |

> **Installation badge rule (ثابت):** `L` = چپ (left of grille). `V`, `IV`, `VI` = راست (right of grille). Do not swap sides.

### Master prompt — INSTALLATION HERO (green compliance disk — **L / V / IV / VI only**)

All four installation badges share **identical** studio setup and realism rules — only the center letter changes. **This white-border geometry does not apply to any other product.**

```
Cinematic extreme macro product hero shot of an authentic OEM European heavy truck compliance sticker badge,
small flat circular glossy vinyl sticker approximately 5 cm diameter,
deep forest green fill — rich British Racing Green tone, glossy factory vinyl with subtle reflections, NOT neon, NOT lime,
centered bold white sans-serif "{LETTER}" — clean factory typography, same pure white as the border ring,
thick uniform white circular border ring exactly at the outer edge of the circle — white ring IS the outermost edge of the emblem, green fill stops precisely at inner edge of white ring with zero gap, NO green visible beyond the white border, NO space between green disk and white ring, NOT arrow shapes, NOT decorative arms, NOT metal brackets,
real adhesive-backed compliance marker as seen on Volvo FH/FM grilles,
standalone circular sticker only — NO backing plate, NO metal substrate behind the disk,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on disk rim, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact disk shape, deep green tone, white letter form, and white border flush with circle edge,
no truck visible, no people, no watermark, no extra text,
centered composition, disk fills 70% of frame, 1:1 aspect ratio, 8K quality
```

### Master prompt — INSTALLATION MOUNTED

```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "{LETTER}" clearly visible on front grille (جلوپنجره) on the {LEFT or RIGHT} side of the grille,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck grille compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

# All 26 products — copy-paste prompts

---

## 01-nh-12 · NH 12 (matte model badge)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "NH 12",
standalone Volvo classic "NH 12" raised letterforms with curved cab letter profile, satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo classic conventional cab truck in fleet yard,
"NH 12" model badge clearly visible and readable on cab front model badge area,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 02-fm9 · FM9 (matte model badge)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "FM9",
standalone Volvo FM "FM9" raised italic letterforms with forward-leaning curved cab profile, satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FM series truck in fleet yard,
"FM9" model badge clearly visible and readable on cab front or door model badge area,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo FM cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 03-420 · 420 HP (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "420",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
"420" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 04-460 · 460 HP matte

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "460",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish — must look duller/matte than 14-460-mg,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"460" matte horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 05-440 · 440 HP (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "440",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"440" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 06-480 · 480 HP (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "480",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"480" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 07-volvo-fh12 · VOLVO grille matte (FH12)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "VOLVO",
standalone VOLVO raised letterforms, wide horizontal chrome letters, satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact VOLVO letterforms and matte finish — duller than 17-volvo,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH12 truck in fleet yard,
"VOLVO" grille lettering clearly visible and readable at front grille center (جلوپنجره), letters prominent,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 08-eev · EEV (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EEV",
small regulatory emissions badge, clean regulatory typography,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
small "EEV" emissions badge clearly visible and readable on cab side or chassis fairing near door,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 09-i-shift · I-Shift (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "I-Shift",
modern Volvo technology badge with hyphenated italic typography, forward-leaning cab-side slant,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"I-Shift" badge clearly visible and readable on cab side technology badge zone near door,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 10-500 · 500 HP (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "500",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"500" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 11-euro-4 · EURO 4 (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EURO 4",
regulatory emissions badge, clean regulatory typography,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"EURO 4" emissions badge clearly visible and readable on cab side or chassis fairing,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 12-euro-5 · EURO 5 (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EURO 5",
regulatory emissions badge, clean regulatory typography,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"EURO 5" emissions badge clearly visible and readable on cab side emissions badge location,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 13-euro-6 · EURO 6 (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EURO 6",
regulatory emissions badge, italic slanted regulatory typography, forward-leaning cab-side angle,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"EURO 6" emissions badge clearly visible and readable on cab side emissions location,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 14-460-mg · 460 HP matte-glossy

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "460",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish — more shine than matte 04-460,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and glossy finish — must differ visually from 04-460,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
glossy "460" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 15-540 · 540 HP (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "540",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo truck in fleet yard,
"540" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 16-fh · FH (matte-glossy model)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "FH",
standalone FH raised letterforms, Volvo FH series front letter proportion, compact bold italic lettering, forward-leaning cab-side slant,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"FH" model badge clearly visible and readable on front cab badge area below grille,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 17-volvo · VOLVO grille matte-glossy

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "VOLVO",
standalone VOLVO raised letterforms, wide horizontal chrome letters,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish — brighter highlights than 07-volvo-fh12,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and glossy letter finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"VOLVO" grille lettering clearly visible and readable at front grille center (جلوپنجره), letters prominent,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 18-xf-daf · DAF XF (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "XF",
standalone DAF XF raised "XF" letterforms, DAF cab styling not Volvo, curved italic letter profile, forward-leaning cab-side slant,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact DAF XF badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real DAF XF truck in fleet yard,
"XF" model badge clearly visible and readable on front grille area (جلوپنجره), DAF cab styling,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic DAF truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 19-i-save · I-SAVE (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "I-SAVE",
Volvo fuel technology badge, hyphenated italic typography, forward-leaning cab-side slant,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH truck in fleet yard,
"I-SAVE" badge clearly visible and readable on cab side technology badge zone near door,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 20-750 · 750 HP (matte-glossy)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "750",
large numeric horsepower badge, bold italic industrial font, forward-leaning cab-door slant, cab door size proportion, premium FH16 prestige styling, largest numeric badge,
dual-tone matte body with glossy raised lettering, mixed satin and polished chrome highlights finish,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE "image_f1437c.png" OR "image_f14381.png" for exact badge shape and finish,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH16 truck in fleet yard,
"750" horsepower badge clearly visible and readable on lower cab side door panel below window line,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 21-install-l · Installation L

**hero**
```
Cinematic extreme macro product hero shot of an authentic OEM European heavy truck compliance sticker badge,
small flat circular glossy vinyl sticker approximately 5 cm diameter,
deep forest green fill — rich British Racing Green tone, glossy factory vinyl with subtle reflections, NOT neon, NOT lime,
centered bold white sans-serif "L" — Lärmarm low-noise regulatory marker, clean factory typography, same pure white as the border ring,
thick uniform white circular border ring exactly at the outer edge of the circle — white ring IS the outermost edge of the emblem, green fill stops precisely at inner edge of white ring with zero gap, NO green visible beyond the white border, NO space between green disk and white ring, NOT arrow shapes, NOT decorative arms, NOT metal brackets,
real adhesive-backed compliance marker as seen on Volvo FH/FM grilles,
standalone circular sticker only — NO backing plate, NO metal substrate behind the disk,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on disk rim, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact disk shape, deep green tone, white letter form, and white border flush with circle edge,
no truck visible, no people, no watermark, no extra text,
centered composition, disk fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "L" clearly visible on front grille (جلوپنجره) on the LEFT side of the grille,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck grille compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
L badge always mounted left — ثابت on چپ,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 22-install-v · Installation V

**hero**
```
Cinematic extreme macro product hero shot of an authentic OEM European heavy truck compliance sticker badge,
small flat circular glossy vinyl sticker approximately 5 cm diameter,
deep forest green fill — rich British Racing Green tone, glossy factory vinyl with subtle reflections, NOT neon, NOT lime,
centered bold white sans-serif "V" — clean factory typography, same pure white as the border ring,
thick uniform white circular border ring exactly at the outer edge of the circle — white ring IS the outermost edge of the emblem, green fill stops precisely at inner edge of white ring with zero gap, NO green visible beyond the white border, NO space between green disk and white ring, NOT arrow shapes, NOT decorative arms, NOT metal brackets,
real adhesive-backed compliance marker as seen on Volvo FH/FM grilles,
standalone circular sticker only — NO backing plate, NO metal substrate behind the disk,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on disk rim, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact disk shape, deep green tone, white letter form, and white border flush with circle edge,
no truck visible, no people, no watermark, no extra text,
centered composition, disk fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "V" clearly visible on front grille (جلوپنجره) on the RIGHT side of the grille,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck grille compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
V always mounted right — راست,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 23-install-iv · Installation IV

**hero**
```
Cinematic extreme macro product hero shot of an authentic OEM European heavy truck compliance sticker badge,
small flat circular glossy vinyl sticker approximately 5 cm diameter,
deep forest green fill — rich British Racing Green tone, glossy factory vinyl with subtle reflections, NOT neon, NOT lime,
centered bold white sans-serif "IV" — clean factory typography, same pure white as the border ring,
thick uniform white circular border ring exactly at the outer edge of the circle — white ring IS the outermost edge of the emblem, green fill stops precisely at inner edge of white ring with zero gap, NO green visible beyond the white border, NO space between green disk and white ring, NOT arrow shapes, NOT decorative arms, NOT metal brackets,
real adhesive-backed compliance marker as seen on Volvo FH/FM grilles,
standalone circular sticker only — NO backing plate, NO metal substrate behind the disk,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on disk rim, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact disk shape, deep green tone, white roman numeral form, and white border flush with circle edge,
no truck visible, no people, no watermark, no extra text,
centered composition, disk fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "IV" clearly visible on front grille (جلوپنجره) on the RIGHT side of the grille,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck grille compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
IV always mounted right — راست,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 24-install-vi · Installation VI

**hero**
```
Cinematic extreme macro product hero shot of an authentic OEM European heavy truck compliance sticker badge,
small flat circular glossy vinyl sticker approximately 5 cm diameter,
deep forest green fill — rich British Racing Green tone, glossy factory vinyl with subtle reflections, NOT neon, NOT lime,
centered bold white sans-serif "VI" — Euro 6 related compliance marker, clean factory typography, same pure white as the border ring,
thick uniform white circular border ring exactly at the outer edge of the circle — white ring IS the outermost edge of the emblem, green fill stops precisely at inner edge of white ring with zero gap, NO green visible beyond the white border, NO space between green disk and white ring, NOT arrow shapes, NOT decorative arms, NOT metal brackets,
real adhesive-backed compliance marker as seen on Volvo FH/FM grilles,
standalone circular sticker only — NO backing plate, NO metal substrate behind the disk,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges on disk rim, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact disk shape, deep green tone, white roman numeral form, and white border flush with circle edge,
no truck visible, no people, no watermark, no extra text,
centered composition, disk fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo FH or FM truck in fleet yard,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "VI" clearly visible on front grille (جلوپنجره) on the RIGHT side of the grille,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck grille compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
VI always mounted right — راست,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic Volvo truck cab, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 25-hub-steel · Hub Steel (steel chrome)

**hero**
```
Cinematic extreme macro product hero shot of a polished stainless steel truck wheel hub cap,
mirror chrome convex dome, center bore visible, circular wheel cap shape,
polished stainless steel finish, mirror chrome, bright specular highlights,
hub cap dome only — NO badge-style backing plate,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact hub cap dome shape and chrome finish,
no wheel, no truck, no people, no watermark, no extra text,
centered composition, cap fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real Volvo or DAF truck rear axle in fleet yard,
polished steel hub cap installed on truck wheel hub, clearly visible and readable scale,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## 26-hub-black · Hub Black (glossy)

**hero**
```
Cinematic extreme macro product hero shot of a piano black glossy truck wheel hub cap,
deep black lacquer mirror reflections, convex circular dome, center bore,
piano black lacquer surface, deep mirror reflections, high-gloss automotive finish,
hub cap dome only — NO badge-style backing plate,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact hub cap shape and piano black finish,
no wheel, no truck, no people, no watermark, no extra text,
centered composition, cap fills 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic documentary photograph, real truck rear axle in fleet yard,
glossy black hub cap installed on wheel with smoked rim, clearly visible,
natural overcast daylight, 35mm lens, shallow depth of field,
authentic truck, slightly weathered professional fleet condition,
B2B commercial catalog photography, no people, realistic colors not CGI, 4:5 vertical crop
```

---

## Tool tips

### Midjourney
```
/imagine prompt: [hero prompt above] --ar 1:1 --style raw --sref [your reference URL] --sw 100
```

### ChatGPT / DALL-E
Attach reference hero + catalog PDF crop. Ask: "Match reference lighting, void black studio, and badge shape exactly. Text must read {BADGE_TEXT} correctly."

### Flux / SD
Reference image at 0.4–0.6 strength for hero. Negative prompt (all products):
```
white background, daylight, truck, people, watermark, blurry text, wrong spelling,
cartoon, illustration, oversaturated, warm orange light, flat lighting,
floating in empty void with no surface, rectangular backing plate, badge substrate, metal base plate behind letters,
upright horizontal letters, no italic slant, straight vertical typography
```

**Installation badges only (21–24)** — add to negative prompt when generating L / V / IV / VI:
```
neon green, lime green, glossy plastic toy, arrow shapes, decorative arms, metal brackets on compliance disk,
gap between green fill and white border, green bleed beyond white ring, inset white ring with margin, separate outer green halo
```

### After generation
1. Crop to 1:1 (hero) or 4:5 (mounted)  
2. Hero should already sit on void `#09090b` — touch up if AI added gray  
3. Verify text spelling matches spec exactly  
4. Save as `hero.png`, `mounted.png` in correct folder  
5. Run `pnpm images:optimize`

---

## Quick count

| Type | Files | AI style |
|------|-------|----------|
| All 26 products | hero + mounted | hero = cinematic studio macro · mounted = realistic fleet yard |
| **Total** | **52 images** | |
