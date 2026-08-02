# AI image prompts — all 27 products

Use your **reference hero shots** (dark chrome, navy rim light) as **style reference** in Midjourney (`--sref`), Flux, or ChatGPT image **+ attach reference**.

**Export size:** hero **1200×1200** or **1200×1500** · mounted **1200×1500** · package **1200×1200** · PNG or JPEG (sources)

**Save to:** `public/catalog/products/{folder}/hero.png`, `mounted.png`, optional `package.png` — then run `pnpm images:optimize` to generate deployable WebP/AVIF in `{folder}/optimized/`. Sources are gitignored; commit only `optimized/` + manifest.

Every product uses **hero** + **mounted**. Optional third: **package** (appears in the product gallery when present).

**Reference images:** Attach the catalog PDF crop or your approved hero for hero generation. For **package**, attach the approved sealed-bag photo as the main reference — do not re-describe bag/layout in the prompt.

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

Shared realism rules (keep each product prompt short — this order):

```
Photorealistic documentary photo, {TRUCK COLOR + MODEL}, {CAMERA},
{BADGE} at {MOUNT_LOCATION}, letters sharp and readable,
{FINISH}, soft natural daylight, light road dust,
real truck photograph, natural colors, no people, 4:5
```

Do **not** cross-reference other products (“like I-Shift”, “duller than 17”). Spell finish and framing directly.

### Master prompt — PACKAGE (sealed retail bag)

**Order matters:** put camera + surface first. Keep bag contents short — match the uploaded package photo for bag/seal/sheet. Do not lead with navy hex codes (models turn them into flat backgrounds).

**Variation rule (anti-clone):** same family, but each package shot must differ slightly — angle, surface, light direction, bag wrinkles, or seal placement. Never copy-paste identical staging.

```
Camera first: {ANGLE + SURFACE}. NOT a flat solid-color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for the sealed polybag, AF.TRUCK seal, install sheet, and card-strip layout.
Only swap the product: raised "{BADGE_TEXT}" in {FINISH}.
{ONE small natural variation}. Photorealistic B2B parts photo, 1:1
```

### OEM-standard mount table (do not change place or camera way)

| Product group | Standard place `{MOUNT_LOCATION}` | Standard position & way | Standard camera `{CAMERA_WAY}` |
|---------------|-----------------------------------|-------------------------|--------------------------------|
| **HP** 420–750 | Cab **side door** outer skin | Lower door panel **below the window line**, roughly mid-door height, factory door-emblem zone (OEM “door cover” / PS badge); italic HP digits leaning forward; both doors get the same badge in real life — show **one door clearly**. **Exception — 500 & 750:** mount **beside / around the door handle** (اینور دستگیره), same framing as I-Shift — badge large in frame | Straight side-door view, 50–85mm, badge centered, door handle and window edge for scale. **500 & 750:** 50mm tight handle + badge crop like I-Shift; badge fills ~35–45% of frame |
| **EURO 4 / 5 / 6 / EEV** | Cab **side door** outer skin | Same door-emblem family as HP — lower/mid door panel below window; emissions text on door skin (not chassis fairing, not bumper). **EURO 4:** same as EURO 5 but **tighter crop**, badge a bit **smaller** in frame. **EURO 5:** **pure matte** + **tight crop** beside handle. **EURO 6:** mid crop on white door near handle — **EURO 6 alone**, no HP digits; more door/cab visible than a detail macro | Straight side-door; EURO 5 = 50mm tight handle + badge; EURO 4 = tighter crop; EURO 6 = 50mm medium crop, door + handle + window edge in frame |
| **I-Shift / I-SAVE** | Cab **side door** exterior | Technology side badge on the **cabin door skin** beside / around the **door handle** (اینور دستگیره) | Straight side-door view, 50mm, tight handle + badge crop |
| **VOLVO FH12** (07) | Upper **front cab panel** below windshield | First-gen FH12 (1993–2002): small chrome **VOLVO** on upper cab panel **left**; small **FH12** on upper cab panel **right**; grille center = iron-mark diagonal only — **no** large VOLVO letters across grille | Head-on front crop, slight low angle, 35–50mm, upper panel + iron-mark grille visible |
| **VOLVO later FH** (17) | Front **grille center** | Later FH generations: horizontal **VOLVO** letters across main grille face / iron-mark zone | Head-on grille crop, slight low angle, 35–50mm |
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
Photorealistic documentary photo, white Volvo NH classic truck front, head-on slight three-quarter, 35mm,
raised "NH 12" badge on the front cab face above the bumper, letters sharp and readable,
satin matte chrome finish, soft overcast daylight, light road dust on white paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: slight three-quarter from above, bag on dark brushed-steel workbench — metal grain, faint oil haze, soft contact shadow. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "NH12" in satin matte chrome.
Soft side window light from the left, shallow DOF. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, dark blue Volvo FM truck front, head-on slight three-quarter, 35mm,
raised "FM9" badge on the front cab panel, letters sharp and readable,
satin matte chrome finish, bright midday sun, light dust on dark blue paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: a bit higher three-quarter angle, bag on dark rubber parts-counter mat over steel — mat texture visible at edges. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "FM9" in satin matte chrome.
Bag rotated a few degrees clockwise, cooler overhead shop light, more plastic wrinkles. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, red Volvo FH cab side, straight side view, 50mm,
"420" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
satin matte chrome finish, soft overcast daylight, light road grit on red paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: lower three-quarter angle, bag on scratched painted metal shelf — chip marks and dust in the paint. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "420" in satin matte chrome, italic HP digits.
Warm workshop bulb light from the right, AF seal slightly off-center. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, silver Volvo FH cab side, straight side view, 50mm,
"460" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
satin matte chrome finish, soft daylight, light dust on silver paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: near-overhead but still slight three-quarter, bag on raw cardboard packing table — kraft fiber texture. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "460" in satin matte chrome, italic HP digits.
Diffuse cloudy daylight, bag flatter / less inflated, soft long shadow. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, grey Volvo FH cab side, straight side view, 50mm,
"440" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
satin matte chrome finish, soft overcast daylight, fine scratches on grey paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: three-quarter from the left, bag on dark concrete parts-room ledge — fine grit and hairline cracks. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "440" in satin matte chrome, italic HP digits.
Harder side light, stronger plastic speculars, install sheet slightly crooked in the bag. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, black Volvo FH cab side, straight side view, 50mm,
"480" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
satin matte chrome finish, soft flat daylight, swirl marks and light dust on black paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: three-quarter from the right, bag on oily dark steel plate — light fingerprint smudges near the seal. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised "480" in satin matte chrome, italic HP digits.
Dimmer evening shop light, tighter crop on the bag, less empty surface. Photorealistic B2B parts photo, 1:1
```

---

## 07-volvo-fh12 · VOLVO cab-panel matte (FH12)

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
Photorealistic documentary photo, first-generation Volvo FH12 (1993–2002), white truck front, head-on slight low angle, 50mm,
small chrome "VOLVO" badge on the upper front cab panel below the windshield, left side,
small "FH12" badge on the upper front cab panel, right side,
classic Volvo iron-mark diagonal grille in the center — no large VOLVO letters across the grille,
satin matte chrome VOLVO, soft diffuse reflections, brushed metal, no mirror shine,
soft cool daylight, light road dust on white paint,
real truck photograph, natural colors, no people, 4:5
```

**package**
```
Camera first: classic three-quarter from above, bag on worn dark wood packing bench — soft wood grain at edges. NOT flat color backdrop. NOT dead top-down.
Match UPLOADED PACKAGE REFERENCE for polybag, AF.TRUCK seal, install sheet, card-strip layout.
Only swap the product: raised wide "VOLVO" letters in satin matte chrome on the card strip.
Soft cool daylight, bag slightly more puffed, AF seal lower on the bag face. Photorealistic B2B parts photo, 1:1
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
Photorealistic documentary photo, yellow Volvo FH cab side, straight side view, 50mm,
small "EEV" badge on the side door below the window, mid-door height, door handle and window edge visible,
dual-tone matte body with glossy raised lettering, soft daylight, light dust on yellow paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, dark green Volvo FH cab side, straight side view, 50mm,
"I-Shift" badge on the side door beside the door handle, tight crop on handle and badge, hyphen exact,
dual-tone matte body with glossy raised lettering, soft midday daylight, light chalk dust on green paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, white Volvo FH cab side, straight side view, 50mm,
"500" badge on the side door beside the door handle, tight crop on handle and badge, italic forward-leaning digits,
dual-tone matte body with glossy raised lettering, soft overcast daylight, light road grit on white paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, red Volvo FH cab side, straight side view, 50mm,
"EURO 4" badge on the side door below the window near the handle, tighter crop, badge modest in frame,
satin matte chrome finish, soft overcast daylight, light dust on red paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, blue Volvo FH cab side, straight side view, 50mm,
"EURO 5" badge on the side door beside the door handle, tight crop on handle and badge,
pure satin matte chrome finish, no gloss, soft daylight, light road film on blue paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, white Volvo FH cab side, straight side view, 50mm medium crop,
only "EURO 6" badge on the side door near the door handle — no horsepower digits beside it,
show door panel, window edge, handle, and some cab body, dual-tone matte-glossy lettering,
soft overcast daylight, fine road dust on white paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, dark blue Volvo FH cab side, straight side view, 50mm,
"460" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
dual-tone matte body with glossy raised lettering, bright midday sun, swirl marks on dark blue paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, silver Volvo FH cab side, straight side view, 50mm,
"540" badge on the side door below the window, mid-door height, italic forward-leaning digits, door handle and window edge visible,
dual-tone matte body with glossy raised lettering, soft overcast daylight, light grit on silver paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, red Volvo FH4 truck front, head-on slight three-quarter, 35mm,
raised "FH" letters on the lower front panel below the main grille, letters sharp and readable,
dual-tone matte body with glossy raised lettering, soft overcast daylight,
show lower front panel and grille so the truck looks real, light dust on red paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, later-generation Volvo FH truck front, black cab, head-on slight low angle, 50mm,
large chrome "VOLVO" letters centered across the front grille, iron-mark grille zone, letters sharp and evenly spaced,
dual-tone matte body with glossy raised lettering, polished chrome highlights,
grille mesh visible around the letters, soft daylight, fine dust on black paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, white DAF XF truck front, head-on grille crop, 35mm,
"XF" badge centered on the DAF front grille, DAF cab styling not Volvo, letters sharp and readable,
satin matte chrome finish, bright midday sun, light road film on white paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, grey Volvo FH cab side, straight side view, 50mm,
"I-SAVE" badge on the side door beside the door handle, hyphen exact, door handle visible,
dual-tone matte body with glossy raised lettering, soft overcast daylight, light dust on grey paint,
real truck photograph, natural colors, no people, 4:5
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
Photorealistic documentary photo, dark blue Volvo FH16 cab side, straight side view, 50mm,
"750" badge on the side door beside the door handle, tight crop, badge large and dominant in frame, italic forward-leaning digits,
dual-tone matte body with glossy raised lettering, soft overcast daylight, swirl marks and road grit on dark blue paint,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — L left of iron mark on upper black fascia
```
Photorealistic documentary photo, white Volvo FH truck front, head-on eye-level, 50mm,
deep forest green circular vinyl sticker with white "L" and thick white outer border,
on the black upper fascia below the windshield, immediately left of the Volvo iron mark,
glossy factory vinyl not neon, soft natural daylight, asphalt ground,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — V right of iron mark on upper black fascia
```
Photorealistic documentary photo, white Volvo FH truck front, head-on eye-level, 50mm,
deep forest green circular vinyl sticker with white "V" and thick white outer border,
on the black upper fascia below the windshield, immediately right of the Volvo iron mark,
glossy factory vinyl not neon, soft natural daylight, asphalt ground,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — IV right of iron mark on upper black fascia
```
Photorealistic documentary photo, white Volvo FH truck front, head-on eye-level, 50mm,
deep forest green circular vinyl sticker with white "IV" and thick white outer border,
on the black upper fascia below the windshield, immediately right of the Volvo iron mark,
glossy factory vinyl not neon, soft natural daylight, asphalt ground,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — VI right of iron mark on upper black fascia
```
Photorealistic documentary photo, white Volvo FH truck front, head-on eye-level, 50mm,
deep forest green circular vinyl sticker with white "VI" and thick white outer border,
on the black upper fascia below the windshield, immediately right of the Volvo iron mark,
glossy factory vinyl not neon, soft natural daylight, asphalt ground,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — tandem duals, white steel rims
```
Photorealistic documentary photo, truck tandem axle at ground level, 35mm,
two sets of tires on dirty white steel rims, leaf spring visible between wheels, asphalt with faded yellow line,
polished stainless steel hub caps on the protruding hubs, chrome dome caps sharp and readable,
harsh outdoor daylight, industrial grit,
real truck photograph, natural colors, no people, 4:5
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

**mounted** — Hub Black family camera lock (copy for 27)
```
Photorealistic catalog photo, single truck wheel front-on, eye-level to hub center, centered and symmetrical, 50mm,
Michelin X LINE tire, polished aluminum rim with circular cutouts, dark gray studio backdrop,
glossy piano-black center hub cap with black center dimple, lug nuts visible, ATIS air hose on the rim face,
soft even studio lighting, clean commercial look,
no people, 4:5
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

**mounted** — same framing as 26; only hub finish changes
```
Photorealistic catalog photo, single truck wheel front-on, eye-level to hub center, centered and symmetrical, 50mm,
Michelin X LINE tire, polished aluminum rim with circular cutouts, dark gray studio backdrop,
satin matte black center hub cap with matte black center dimple — no piano gloss, lug nuts visible, ATIS air hose on the rim face,
soft even studio lighting, clean commercial look,
no people, 4:5
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
| All 27 products | hero + mounted (+ optional package) | hero = studio macro · mounted = OEM place · package = sealed bag |
| **Total** | **54+** images | |
