# AI image prompts — all 27 products

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

**Critical — OEM mount first:** Every mounted shot must show the badge in its **real factory / aftermarket-standard position** on the correct truck. Do **not** invent alternate places (fairing, bumper, wrong panel). Place is fixed per product group below. Only **truck color + daylight mood** may vary slightly so photos are not identical clones.

Shared realism rules:

```
Photorealistic handheld documentary photograph of a real European heavy truck,
{BADGE_TEXT} badge sharp and clearly readable at the OEM-standard {MOUNT_LOCATION},
mounted the factory way — correct height, alignment, and orientation for that badge type,
authentic paint imperfections, fine road dust, micro-scratches on paint, real panel gaps,
natural daylight only — no studio softboxes, no rim-light glow, no CGI sheen,
{CAMERA_WAY}, badge is the clear focal point,
B2B parts catalog photography, no people, no extra logos except OEM badges already on the truck,
realistic color science, not CGI, not stock-photo perfection, 4:5 vertical crop
```

### OEM-standard mount table (do not change place or camera way)

| Product group | Standard place `{MOUNT_LOCATION}` | Standard position & way | Standard camera `{CAMERA_WAY}` |
|---------------|-----------------------------------|-------------------------|--------------------------------|
| **HP** 420–750 | Cab **side door** outer skin | Lower door panel **below the window line**, roughly mid-door height, factory door-emblem zone (OEM “door cover” / PS badge); italic HP digits leaning forward; both doors get the same badge in real life — show **one door clearly**. **Exception — 500:** mount **beside / around the door handle** (اینور دستگیره), same framing as I-Shift | Straight side-door view, 50–85mm, badge centered, door handle and window edge for scale. **500:** tight handle + badge crop like I-Shift |
| **EURO 4 / 5 / 6 / EEV** | Cab **side door** outer skin | Same door-emblem family as HP — lower/mid door panel below window; emissions text on door skin (not chassis fairing, not bumper). **EURO 4:** same as EURO 5 but **tighter crop**, badge a bit **smaller** in frame. **EURO 5:** **pure matte** + **tight crop like I-Shift** (اینور دستگیره، کاپ) | Straight side-door; EURO 5 = 50mm tight handle + badge crop like I-Shift; EURO 4 = tighter crop |
| **I-Shift / I-SAVE** | Cab **side door** exterior | Technology side badge on the **cabin door skin** beside / around the **door handle** (اینور دستگیره) | Straight side-door view, 50mm, tight handle + badge crop |
| **VOLVO** (07, 17) | Front **grille center** (جلوپنجره) | Horizontal **VOLVO** letters centered on the main grille face | Head-on grille crop, slight low angle, 35–50mm |
| **FH** (16) | Front **lower logo panel** | **FH** letters on the front panel **below the windscreen / below the main grille** (FH4 front lower logo zone) | Head-on or slight 3/4 front, 35mm, front panel + grille context |
| **DAF XF** (18) | DAF **front grille center** (جلوپنجره) | **XF** emblem centered on the main grille panel — DAF cab styling, not Volvo | Head-on grille crop, 35mm |
| **NH 12** (01) | Classic Volvo **NH cab front** | Model badge on the **front cab face** / front model-badge zone above bumper | Head-on or slight 3/4 front, 35mm |
| **FM9** (02) | Volvo **FM cab front** | Model badge on the **front cab panel** / front model-badge zone (FM series) | Head-on or slight 3/4 front, 35mm |
| **Install L** | Upper front fascia **LEFT of iron mark** | Green circular sticker on smooth **black upper panel** below windshield / above honeycomb grille, immediately **LEFT** of centered Volvo iron mark — ثابت چپ — inspired by real FH install | Head-on eye-level front crop, iron mark + L sharp, 35–50mm |
| **Install V / IV / VI** | Upper front fascia **RIGHT of iron mark** | Same black upper panel, immediately **RIGHT** of centered Volvo iron mark — ثابت راست — same layout as L/VI pair on reference FH | Head-on eye-level front crop, iron mark + badge sharp, 35–50mm |
| **Hub Steel** (25) | **Tandem axle** — dual white steel rims | Inspired by `image_d80999.png`: two tire sets, white steel rims with wear/dirt, leaf spring + undercarriage between wheels, asphalt + faded yellow line; **Hub Steel chrome caps** on protruding hubs | Ground-level documentary, 35–50mm |
| **Hub Black glossy** (26) | **Single polished aluminum wheel** | Catalog wheel: Michelin X LINE, polished aluminum/chrome rim, circular cutouts, **glossy black** center hub + ATIS hose; **front-on centered**, dark gray studio backdrop | Identical camera/light to 27 |
| **Hub Black matte** (27) | **Same as 26** | **Exact same** mounted camera, crop, lighting, rim, tire, ATIS, background as 26 — only hub finish is **satin matte black** | Copy 26 framing 1:1 |

### Hub family — shared HERO style (25 / 26 / 27)

**Canonical look = approved Hub Black glossy hero** (carbon floor + blue rim + high three-quarter). All hub heroes must clone this studio, not invent a new one.

```
STYLE REFERENCE: attach 26-hub-black/hero.png (or the approved hub hero) as --sref / image reference for EVERY hub hero

CAMERA LOCK (match reference exactly):
- high three-quarter / near-isometric angle looking DOWN from upper-front-left
- hub centered, sitting grounded on the floor, fills ~70% of frame
- show thick side wall + beveled top edge + recessed top face in one view
- 1:1 square crop, product photography, ultra-shallow DOF

LIGHT LOCK (match reference exactly):
- KEY: bright cool-white light from TOP-LEFT → sharp highlight on the beveled top edge / left rim
- RIM/ACCENT: strong navy #003d81 + icy cyan #9ccdef from UPPER-RIGHT → blue glow on the right side of the hub AND blue wash on the carbon floor to the right
- LEFT/FRONT of hub stays in deep shadow for high contrast
- pure void black background #09090b behind (no gray studio cyclorama)

SURFACE LOCK:
- dark carbon-fiber weave textured floor under the hub (diagonal weave readable where blue light hits)
- hub rests ON the carbon fiber — not floating

ONLY CHANGE between hubs: material/finish (steel chrome / piano black gloss / satin matte black)
```

### Hub Black mounted family (26 + 27 — keep identical except finish)

```
CAMERA LOCK: perfectly front-on, eye-level to hub center, wheel perfectly centered and symmetrical in frame, 50mm, 4:5 vertical
LIGHT LOCK: soft even studio softbox lighting, smooth broad highlights on polished rim, no harsh sun, no handheld grit
SCENE LOCK: single commercial truck wheel, dark gray seamless studio backdrop, Michelin X LINE tire, polished aluminum/chrome rim with circular cutouts, ATIS air hose on rim face, clean catalog look
ONLY CHANGE between 26 and 27: hub center finish (piano gloss vs satin matte) — camera, crop, light, tire, rim, hose, background stay the same
```

> **Installation badge rule (ثابت):** Mount on the **black upper fascia** flanking the Volvo iron mark (not deep in honeycomb mesh, not on bumper, not on door). `L` = چپ (left of iron mark). `V`, `IV`, `VI` = راست (right of iron mark). Do not swap sides.

### What you may vary (only these)

Truck paint color · soft overcast vs midday sun · light road dust / wet ground · depot vs yard background **behind** the truck.  
**Do not vary:** mount place, door vs grille, left/right for installation, camera way listed above.

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

Place and side are **fixed** — inspired by real Volvo FH front: green disks flanking the iron mark on the black upper fascia. Only truck color / daylight may change:

```
Photorealistic head-on eye-level photograph of a real Volvo FH truck front,
authentic deep forest green circular OEM vinyl compliance sticker with bold white "{LETTER}" sharp and readable on the smooth BLACK UPPER FASCIA PANEL below the windshield / above the main honeycomb grille,
positioned immediately {LEFT or RIGHT} of the centered circular Volvo iron-mark emblem — same install layout as real FH "arm" badges flanking the logo,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter, white ring is the outermost edge of the emblem,
deep forest green glossy vinyl matching real European truck compliance markers, NOT CGI glow, NOT neon green, NOT arrow graphics,
NOT on bumper, NOT on door, NOT deep inside honeycomb mesh — only on the black upper panel beside the iron mark,
head-on front crop, 35–50mm, iron mark + green sticker are the clear focal point, grille/VOLVO/FH lettering may be softly visible for context,
natural daylight, authentic paint and panel gaps, no people, realistic colors not CGI, 4:5 vertical crop
```

---

# All 27 products — copy-paste prompts

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
Photorealistic handheld documentary photograph of a white Volvo NH classic conventional cab tractor,
OEM-standard mount: "NH 12" raised model badge on the FRONT CAB FACE model-badge zone above the bumper — not on the door, not on the bumper itself,
head-on or slight three-quarter front, 35mm, cab front fills frame, badge sharp and clearly readable,
soft overcast daylight, light road dust on white paint, authentic aged conventional cab proportions,
natural daylight only, no CGI sheen, no people, realistic colors, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a dark blue Volvo FM series truck,
OEM-standard mount: "FM9" model badge on the FRONT CAB PANEL / front model-badge zone of the FM cab — not on the side door, not on the bumper,
head-on or slight three-quarter front, 35mm, front panel and badge sharp and clearly readable,
bright midday sun, dark blue fleet paint with light dust, authentic FM cab front proportions,
natural daylight only, no CGI sheen, no people, realistic colors, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a red Volvo FH tractor,
OEM-standard mount: "420" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone (mid-door height), italic forward-leaning digits,
straight side-door camera, 50–85mm, badge centered, door handle and window edge visible for scale — not on grille, not on fairing,
soft overcast daylight, red paint with light road grit on lower door, exact text "420",
natural daylight only, no CGI glow, no people, realistic colors, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a silver metallic Volvo FH or FM tractor,
OEM-standard mount: matte "460" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits (duller than glossy 460),
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale,
soft daylight, silver paint with light dust film, exact text "460",
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a grey Volvo FH tractor,
OEM-standard mount: "440" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits,
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale,
soft overcast daylight, grey paint with fine micro-scratches, exact text "440",
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a black Volvo FH tractor,
OEM-standard mount: "480" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits,
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale — not rear-side angle, not grille,
soft flat daylight, black paint with fine swirl marks and light road dust, exact text "480",
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a white Volvo FH12 tractor,
OEM-standard mount: "VOLVO" lettering centered on the FRONT GRILLE FACE (جلوپنجره) — horizontal letters across grille center only, not on bumper, not on door,
head-on grille crop with slight low angle, 35–50mm, VOLVO band sharp and correctly spaced, grille mesh visible,
soft cool daylight, matte chrome VOLVO (duller than glossy VOLVO variant), white cab with light road film,
natural daylight only, no CGI glow, no people, realistic colors, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a yellow Volvo FH or FM tractor,
OEM-standard mount: small "EEV" emissions badge on the CAB SIDE DOOR outer skin — lower/mid door panel below the window line, same door-emblem family as HP badges — NOT on chassis fairing, NOT on bumper,
straight side-door camera, 50–85mm, badge sharp and readable, door handle and window edge for scale,
soft daylight, yellow fleet paint with light dust, dual-tone EEV finish exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a dark green Volvo FH tractor,
OEM-standard mount: "I-Shift" technology badge on the CAB SIDE DOOR exterior skin — placed beside / around the door handle zone (اینور دستگیره), factory side-badge placement — not on grille, not on bumper, not low on the skirt,
straight side-door camera, 50mm, tight crop on handle + badge: door handle clearly visible next to the badge for scale,
soft midday daylight, dark green paint with light chalk dust, dual-tone I-Shift lettering with hyphen exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a white Volvo FH tractor,
OEM-standard mount: "500" horsepower badge on the CAB SIDE DOOR outer skin — same framing as I-Shift: beside / around the door handle zone (اینور دستگیره), mid-door height near the handle — not low skirt, not grille,
straight side-door camera, 50mm, tight crop on handle + badge like I-Shift mounted shot: door handle clearly visible next to the "500" badge for scale,
soft overcast daylight, white cab with light road grit, dual-tone matte-glossy "500" exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
```

---

## 11-euro-4 · EURO 4 (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EURO 4",
regulatory emissions badge, clean regulatory typography — same style family as EURO 5, slightly smaller letterforms / more compact badge presence than EURO 5,
satin matte chrome finish, soft diffuse reflections, no mirror shine, brushed metal texture on letter shoulders,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape and finish — match EURO 5 look but slightly smaller / tighter,
no truck visible, no people, no watermark, no extra text,
centered composition, letterforms fill about 55–60% of frame (slightly smaller than EURO 5), 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic handheld documentary photograph of a red Volvo FH or FM tractor,
OEM-standard mount: "EURO 4" emissions badge on the CAB SIDE DOOR outer skin — same place and style as EURO 5 (lower/mid door panel below window) — NOT on chassis fairing, NOT on bumper,
MATCH EURO 5 mounted framing but tighter crop (کاپ): pull in closer on the badge, badge reads a bit smaller / finer in frame than a wide door shot,
straight side-door camera, 50–85mm tight crop, door handle edge barely in frame for scale, soft overcast daylight,
red paint with light dust, satin matte EURO 4 lettering exact — same matte family as EURO 5,
natural daylight only, no people, not CGI, 4:5 vertical crop
```

---

## 12-euro-5 · EURO 5 (matte)

**hero**
```
Cinematic extreme macro product hero shot of standalone OEM truck cab lettering reading "EURO 5",
regulatory emissions badge, clean regulatory typography,
PURE satin matte chrome finish only — soft diffuse reflections, NO mirror shine, NO glossy highlights, NO dual-tone gloss, brushed metal texture on letter shoulders, fully matte,
embossed metallic letterforms only — NO backing plate, NO rectangular base plate, NO badge substrate behind the text,
premium European heavy truck styling,
resting on a dark carbon-fiber textured surface in a moody studio environment, pure void black background #09090b,
intense dramatic rim lighting from the upper right in navy blue #003d81 and icy cyan #9ccdef,
sharp specular edges kept soft/matte (not polished chrome), deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED IMAGE for exact badge shape — finish MUST stay matte, not glossy,
no truck visible, no people, no watermark, no extra text,
centered composition letterforms fill 70% of frame, 1:1 aspect ratio, 8K quality
```

**mounted**
```
Photorealistic handheld documentary photograph of a blue Volvo FH tractor,
OEM-standard mount: "EURO 5" emissions badge on the CAB SIDE DOOR outer skin — beside / around the door handle zone (اینور دستگیره), same tight framing as I-Shift — NOT on fairing, NOT on bumper, not a wide full-door shot,
straight side-door camera, 50mm, TIGHT CROP (کاپ) on handle + badge like I-Shift: door handle clearly visible next to the badge for scale, badge fills more of the frame,
soft daylight, blue fleet paint with light road film, PURE satin matte EURO 5 lettering — no gloss, no shine, dull matte chrome only, exact text,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a white Volvo FH tractor,
OEM-standard mount: "EURO 6" emissions badge on the CAB SIDE DOOR outer skin — lower/mid door panel below the window line, factory door-emblem zone — NOT on fairing, NOT near fuel tank only, NOT on bumper,
straight side-door camera, 50–85mm, badge sharp and readable with italic OEM slant, door handle and window edge for scale,
soft morning daylight, white paint with light chalk dust, dual-tone EURO 6 lettering exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a dark blue Volvo FH tractor,
OEM-standard mount: glossy dual-tone "460" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits — shinier than matte 460,
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale,
bright midday sun with soft speculars on glossy raised digits, dark blue paint with fine swirl marks, exact text "460",
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a silver Volvo FH tractor,
OEM-standard mount: "540" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits,
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale — not low three-quarter inventing another angle,
soft overcast daylight, silver metallic paint with light grit, dual-tone "540" exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a red Volvo FH tractor,
OEM-standard mount: "FH" model badge on the FRONT LOWER LOGO PANEL — below the windscreen / below the main grille (FH4 front lower logo zone) — not on the door, not on the bumper alone,
head-on or slight three-quarter front, 35mm, front panel + grille context, FH letters sharp and clearly readable,
soft overcast daylight, red paint with light dust, dual-tone FH lettering exact,
natural daylight only, authentic Volvo FH front styling, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a black Volvo FH tractor,
OEM-standard mount: "VOLVO" lettering centered on the FRONT GRILLE FACE (جلوپنجره) — horizontal letters across grille center only — glossier dual-tone finish than matte FH12 VOLVO,
head-on grille crop with slight low angle, 35–50mm, VOLVO band sharp and correctly spaced, grille mesh visible,
soft daylight, black paint with fine dust on bumper, exact VOLVO spacing,
natural daylight only, no CGI glow, no people, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a white DAF XF tractor,
OEM-standard mount: "XF" model badge centered on the DAF FRONT GRILLE PANEL (جلوپنجره) — main grille center emblem position — DAF cab styling clearly not Volvo,
head-on grille crop, 35mm, XF badge and DAF grille geometry dominant and sharp,
bright midday sun, white DAF paint with light road film, satin matte XF lettering exact,
natural daylight only, no people, realistic colors not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a grey Volvo FH tractor,
OEM-standard mount: "I-SAVE" technology badge on the CAB SIDE DOOR exterior skin — outside cabin door badge zone (I-Save package side badge) — not on grille, not on bumper,
straight side-door camera, 50mm, badge and door panel relationship clear, door handle visible for scale,
soft overcast daylight, grey paint with light dust, dual-tone I-SAVE lettering with hyphen exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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
Photorealistic handheld documentary photograph of a dark blue Volvo FH16 tractor,
OEM-standard mount: "750" horsepower badge on the CAB SIDE DOOR outer skin — lower door panel below the window line, factory door-emblem zone, italic forward-leaning digits — largest numeric HP badge presence on FH16,
straight side-door camera, 50–85mm, badge centered, door handle and window edge for scale,
soft daylight, dark blue paint with fine swirl marks, dual-tone "750" exact,
natural daylight only, no people, not CGI, 4:5 vertical crop
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

**mounted** — inspired by real FH: L left of iron mark on upper black fascia
```
Photorealistic head-on eye-level photograph of a white Volvo FH truck front on asphalt,
OEM-standard install: authentic deep forest green circular OEM vinyl compliance sticker with bold white "L" on the smooth BLACK UPPER FASCIA PANEL below the windshield, immediately LEFT of the centered Volvo iron-mark emblem — ثابت چپ — same layout as real FH arm badges,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter,
deep forest green glossy vinyl, NOT neon, NOT arrow graphics, NOT on bumper, NOT on door, NOT deep in honeycomb mesh,
head-on front crop, 35–50mm, iron mark + green "L" sticker sharp and readable as the focal point, main grille / VOLVO lettering softly in context below,
natural daylight, authentic white cab and black fascia, no people, not CGI, 4:5 vertical crop,
MUST REFERENCE UPLOADED FH FRONT REFERENCE for panel placement beside iron mark — keep only the L badge on the left (do not invent a second badge unless generating a pair shot)
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

**mounted** — inspired by real FH: V right of iron mark on upper black fascia
```
Photorealistic head-on eye-level photograph of a white Volvo FH truck front on asphalt,
OEM-standard install: authentic deep forest green circular OEM vinyl compliance sticker with bold white "V" on the smooth BLACK UPPER FASCIA PANEL below the windshield, immediately RIGHT of the centered Volvo iron-mark emblem — ثابت راست — same layout as real FH arm badges,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter,
deep forest green glossy vinyl, NOT neon, NOT arrow graphics, NOT on bumper, NOT on door, NOT deep in honeycomb mesh,
head-on front crop, 35–50mm, iron mark + green "V" sticker sharp and readable as the focal point, main grille / FH lettering softly in context below,
natural daylight, authentic white cab and black fascia, no people, not CGI, 4:5 vertical crop,
MUST REFERENCE UPLOADED FH FRONT REFERENCE for panel placement beside iron mark — keep only the V badge on the right
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

**mounted** — inspired by real FH: IV right of iron mark on upper black fascia
```
Photorealistic head-on eye-level photograph of a white Volvo FH truck front on asphalt,
OEM-standard install: authentic deep forest green circular OEM vinyl compliance sticker with bold white "IV" on the smooth BLACK UPPER FASCIA PANEL below the windshield, immediately RIGHT of the centered Volvo iron-mark emblem — ثابت راست — same layout as real FH arm badges,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter,
deep forest green glossy vinyl, NOT neon, NOT arrow graphics, NOT on bumper, NOT on door, NOT deep in honeycomb mesh,
head-on front crop, 35–50mm, iron mark + green "IV" sticker sharp and readable as the focal point, main grille / FH lettering softly in context below,
natural daylight, authentic white cab and black fascia, no people, not CGI, 4:5 vertical crop,
MUST REFERENCE UPLOADED FH FRONT REFERENCE for panel placement beside iron mark — keep only the IV badge on the right
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

**mounted** — inspired by real FH: VI right of iron mark on upper black fascia
```
Photorealistic head-on eye-level photograph of a white Volvo FH truck front on asphalt,
OEM-standard install: authentic deep forest green circular OEM vinyl compliance sticker with bold white "VI" on the smooth BLACK UPPER FASCIA PANEL below the windshield, immediately RIGHT of the centered Volvo iron-mark emblem — ثابت راست — same layout as the real FH reference with L left / VI right of the iron mark,
thick white circular border exactly at outer edge of sticker — no gap between green fill and white ring, no green beyond white perimeter,
deep forest green glossy vinyl, NOT neon, NOT arrow graphics, NOT on bumper, NOT on door, NOT deep in honeycomb mesh,
head-on front crop, 35–50mm, iron mark + green "VI" sticker sharp and readable as the focal point, main grille / FH lettering softly in context below,
natural daylight, authentic white cab and black fascia, no people, not CGI, 4:5 vertical crop,
MUST REFERENCE UPLOADED FH FRONT REFERENCE for panel placement beside iron mark — product shot focuses on VI on the right
```

---

## 25-hub-steel · Hub Steel (steel chrome)

**hero**
```
Cinematic extreme macro product hero shot of a polished stainless steel truck wheel hub cap,
mirror chrome convex dome / circular hub-cap form, center bore or center dimple visible,
polished stainless steel finish, mirror chrome, bright specular highlights,
hub cap only — NO badge-style backing plate, NO wheel, NO tire, NO people,
CLONE THE APPROVED HUB HERO STUDIO (attach 26-hub-black/hero.png as style reference):
CAMERA: high three-quarter near-isometric looking down from upper-front-left, hub centered, thick side wall + top face visible, fills 70% of 1:1 frame,
SURFACE: resting on dark carbon-fiber weave floor, pure void black #09090b behind,
LIGHT: bright cool-white KEY from TOP-LEFT on the bevel/edge; strong navy #003d81 + icy cyan #9ccdef RIM from UPPER-RIGHT painting blue glow on the right side of the hub and blue wash on the carbon floor; deep shadow on left/front for contrast,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED 26-hub-black hero for camera/light/floor — only material is polished steel,
no watermark, no extra text, 8K quality
```

**mounted** — inspired by reference `image_d80999.png`
```
Photorealistic real-world ground-level view of a heavy-duty truck or trailer TANDEM axle setup,
two visible sets of heavy-duty tires mounted on WHITE STEEL rims showing typical wear and dirt — not polished aluminum,
between the wheels the heavy-duty LEAF SPRING suspension and undercarriage clearly visible,
vehicle parked on asphalt with a faded yellow painted line on the ground,
OEM product placement: polished stainless steel HUB CAPS (Hub Steel) seated on the protruding drive hubs of the dual wheels — chrome dome caps clearly readable as the product focal point,
low ground-level crop matching documentary fleet photography, 35–50mm, tandem duals dominate the frame,
natural harsh outdoor daylight, industrial gritty realism, not CGI, not studio, 4:5 vertical crop,
MUST REFERENCE UPLOADED IMAGE "image_d80999.png" for tandem layout, white steel rims, dirt/wear, leaf spring, asphalt and yellow line — install Hub Steel caps on the hubs
```

---

## 26-hub-black · Hub Black (glossy)

**hero**
```
Cinematic extreme macro product hero shot of a piano black glossy truck wheel hub cap,
thick low puck / disc hub: vertical side wall, wide beveled top edge, large shallow recessed circular top face,
tiny center dimple in the recessed face — SAME continuous piano black as the body, NOT silver, NOT chrome, NOT brass hex screw,
thin vertical notch/slot on the outer ring sidewall (lower-front),
deep black lacquer, high-gloss automotive piano-black — sharp white and blue reflections on the gloss — NOT matte,
hub cap only — NO badge-style backing plate, NO wheel, NO tire,
CANONICAL HUB HERO STUDIO (this is the look all hub heroes copy):
CAMERA: high three-quarter near-isometric looking DOWN from upper-front-left, hub centered and grounded, show side wall + bevel + recessed top together, fills ~70% of 1:1 frame,
SURFACE: dark carbon-fiber weave floor under the hub, pure void black #09090b behind,
LIGHT: bright cool-white KEY from TOP-LEFT → crisp highlight along the beveled top edge; strong navy #003d81 + icy cyan #9ccdef RIM from UPPER-RIGHT → blue glow on the right side of the hub and blue wash across the carbon floor on the right; left/front face in deep shadow, high contrast,
sharp specular edges, deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED approved hub hero for exact camera, light, and carbon floor — center stays black,
no people, no watermark, no extra text, 8K quality
```

**mounted** — Hub Black mounted family (lock this framing for 27 too)
```
Photorealistic clean high-resolution catalog photograph of a single modern commercial truck wheel,
MATCH HUB BLACK MOUNTED CAMERA LOCK: perfectly FRONT-ON, eye-level to hub center, wheel perfectly centered and symmetrical in frame — NOT three-quarter, NOT low angle, NOT tilted,
50mm, 4:5 vertical crop, dark gray seamless studio backdrop,
MATCH LIGHT LOCK: soft even studio softbox lighting, smooth broad highlights on polished rim, no harsh daylight, no handheld grit,
tire: Michelin "X LINE" sidewall branding sharp and readable,
rim: highly polished shiny aluminum/chrome with circular cutouts — reflective catalog chrome,
OEM product: GLOSSY piano-black center hub cap (Hub Black glossy) at wheel center — protruding glossy black cover is the clear product focal point, center dimple SAME black not silver,
visible lug nuts around the hub, CRUCIAL: external ATIS air hose on the rim face connected toward the hub — do not omit,
perfectly clean surfaces, commercial B2B catalog look, no people, not CGI,
MUST REFERENCE UPLOADED IMAGE "image_d8099c.png" OR approved 26-hub-black mounted for exact front-on framing, rim polish, ATIS path, and lighting — keep glossy finish
```

---

## 27-hub-black-matte · Hub Black (matte)

**hero** — SAME studio as the glossy hub hero you showed; matte finish only
```
Cinematic extreme macro product hero shot of a satin matte black truck wheel hub cap,
CLONE the approved glossy Hub Black hero EXACTLY for camera, lights, carbon floor, crop, and proportions — only the finish is matte:
thick low puck / disc hub: vertical side wall, wide beveled top edge, large shallow recessed circular top face,
tiny center dimple — SAME continuous matte black as the body, NOT silver, NOT chrome, NOT brass hex screw, NO bright metallic pin highlight in the center,
thin vertical notch/slot on the outer ring sidewall (lower-front),
PURE satin matte black finish — soft diffuse shading that still shows the SAME light DIRECTIONS as the glossy hero (cool-white from top-left, blue rim from upper-right, blue wash on carbon floor) but WITHOUT mirror lacquer pools or sharp glass-like speculars — duller than glossy, still premium,
hub cap only — NO badge-style backing plate, NO wheel, NO tire,
CANONICAL HUB HERO STUDIO (identical to glossy):
CAMERA: high three-quarter near-isometric looking DOWN from upper-front-left, hub centered and grounded, show side wall + bevel + recessed top together, fills ~70% of 1:1 frame — SAME height/tilt as glossy hero,
SURFACE: dark carbon-fiber weave floor, pure void black #09090b behind,
LIGHT: cool-white KEY from TOP-LEFT on the bevel; navy #003d81 + icy cyan #9ccdef RIM from UPPER-RIGHT with blue glow on the right hub side and blue wash on the carbon floor; deep shadow on left/front,
deep shadows with soft falloff, ultra-shallow depth of field,
sleek high-end editorial and tech-surrealist aesthetic, hyper-detailed conceptual product photography,
MUST REFERENCE UPLOADED glossy hub hero (26-hub-black/hero.png) as the style twin — change ONLY finish to matte black; center stays black,
attach glossy hero as --sref / image reference at high strength,
no people, no watermark, no extra text, 8K quality
```

**mounted** — twin of 26; only hub finish changes
```
Photorealistic clean high-resolution catalog photograph of a single modern commercial truck wheel,
MATCH 26-hub-black mounted EXACTLY for camera, crop, light, tire, rim, hose, background — only the hub finish differs,
CAMERA LOCK: perfectly FRONT-ON, eye-level to hub center, wheel perfectly centered and symmetrical — NOT three-quarter, NOT angled, NOT low ground tilt,
50mm, 4:5 vertical crop, dark gray seamless studio backdrop (same as 26, not light gray),
LIGHT LOCK: soft even studio softbox lighting identical to 26 — smooth broad highlights on polished rim,
tire: Michelin "X LINE" sidewall branding, same catalog tire look as 26,
rim: highly polished shiny aluminum/chrome with circular cutouts — same reflective rim as 26,
OEM product: SATIN MATTE black center hub cap (Hub Black matte) at wheel center — same size/placement as glossy 26 hub, but PURE matte black with soft diffuse shading, NO piano gloss, NO mirror reflections on the hub face, center dimple SAME matte black not silver,
visible lug nuts, CRUCIAL: external ATIS air hose on the rim face — same path/placement family as 26,
perfectly clean surfaces, commercial B2B catalog look, no people, not CGI,
MUST REFERENCE UPLOADED 26-hub-black mounted.png as layout/lighting twin — swap only hub finish to matte; MUST REFERENCE product shape from matte hero,
attach 26 mounted as composition reference
```

---

## Tool tips

### Midjourney
```
/imagine prompt: [hero prompt above] --ar 1:1 --style raw --sref [your reference URL] --sw 100
```

### ChatGPT / DALL-E
Attach reference hero + catalog PDF crop. Ask: "Match reference lighting, void black studio, and badge shape exactly. Text must read {BADGE_TEXT} correctly."

For **mounted**: keep the **OEM-standard place and camera way** from each product prompt (door vs grille vs hub). Only truck color / daylight may change when regenerating.

### Flux / SD
Reference image at 0.4–0.6 strength for hero. Negative prompt (all products):
```
white background, daylight, truck, people, watermark, blurry text, wrong spelling,
cartoon, illustration, oversaturated, warm orange light, flat lighting,
floating in empty void with no surface, rectangular backing plate, badge substrate, metal base plate behind letters,
upright horizontal letters, no italic slant, straight vertical typography
```

**Mounted shots** — add to negative prompt:
```
identical stock photo, same truck color every time, studio softbox, CGI sheen, perfect showroom paint,
neon glow, rim light, cinematic color grade, synthetic plastic look, repeated template composition
```

**Installation badges only (21–24)** — add to negative prompt when generating L / V / IV / VI:
```
neon green, lime green, glossy plastic toy, arrow shapes, decorative arms, metal brackets on compliance disk,
gap between green fill and white border, green bleed beyond white ring, inset white ring with margin, separate outer green halo
```

**Hub Black matte / glossy (26–27)** — add to negative prompt:
```
silver center, chrome center screw, brass fastener, metal hex bolt in hub center, steel Allen key socket, shiny metallic center dimple
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
| All 27 products | hero + mounted | hero = cinematic studio macro · mounted = OEM-standard place + way, light color/light variation only |
| **Total** | **54 images** | |
