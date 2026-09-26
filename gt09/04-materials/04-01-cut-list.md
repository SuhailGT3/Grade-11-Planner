# 04-01 — Tube cut list (v0)

> **GENERATED FILE — do not edit by hand.**
> Produced by `node gt09/tools/build.mjs` from `gt09/specs/chassis-v0.json`.
> Edit the JSON, re-run the tool, commit both.
>
> **Status: UNVERIFIED PLACEHOLDER.** These are placeholder dimensions for learning the
> workflow. Nothing here has been measured. Do not order steel from this list yet.

Every cut length below already includes 5 mm of finishing allowance.
Cut long, then trim to the finished length on the jig. Never weld a piece short.

## 25 x 25 x 2.0 mm mild steel square tube

| ID | Member | From → To | Qty | Cut length | Angle from frame axis |
|---|---|---|---|---|---|
| RAIL-L | Main rail, left | RL_F → RL_R | 1 | **1145 mm** | 0° |
| RAIL-R | Main rail, right | RR_F → RR_R | 1 | **1145 mm** | 0° |

**2 pieces · 2290 mm of cutting · 1 × 6 m bar = 6 m bought · 61.7% offcut waste**

### How to cut it from stock

Mark and cut in this order so the long pieces come off first and the offcuts stay usable.

- **Bar 1** (6000 mm): RAIL-L 1145 → RAIL-R 1145
  - 2296 mm consumed incl. kerf · **3707 mm offcut left over — label it and keep it**

## 25 x 25 x 1.6 mm mild steel square tube

| ID | Member | From → To | Qty | Cut length | Angle from frame axis |
|---|---|---|---|---|---|
| XC1 | Front crossmember | XC1_L → XC1_R | 1 | **585 mm** | 90° |
| XC2 | Steering crossmember | XC2_L → XC2_R | 1 | **585 mm** | 90° |
| XC3 | Mid crossmember | XC3_L → XC3_R | 1 | **585 mm** | 90° |
| XC4 | Seat back crossmember | XC4_L → XC4_R | 1 | **585 mm** | 90° |
| XC5 | Engine front member | XC5_L → XC5_R | 1 | **585 mm** | 90° |
| XC6 | Rear crossmember | XC6_L → XC6_R | 1 | **585 mm** | 90° |

**6 pieces · 3510 mm of cutting · 1 × 6 m bar = 6 m bought · 41.2% offcut waste**

### How to cut it from stock

Mark and cut in this order so the long pieces come off first and the offcuts stay usable.

- **Bar 1** (6000 mm): XC1 585 → XC2 585 → XC3 585 → XC4 585 → XC5 585 → XC6 585
  - 3528 mm consumed incl. kerf · **2475 mm offcut left over — label it and keep it**

## 20 x 20 x 1.6 mm mild steel square tube

| ID | Member | From → To | Qty | Cut length | Angle from frame axis |
|---|---|---|---|---|---|
| DN-L | Nose diagonal, left | XC1_L → XC2_C | 1 | **351.7 mm** | 56.8° |
| DN-R | Nose diagonal, right | XC1_R → XC2_C | 1 | **351.7 mm** | 56.8° |
| DM1-L | Mid diagonal 1, left | XC2_C → XC3_L | 1 | **408.1 mm** | 46° |
| DM1-R | Mid diagonal 1, right | XC2_C → XC3_R | 1 | **408.1 mm** | 46° |
| DM2-L | Mid diagonal 2, left | XC3_L → XC4_C | 1 | **401.2 mm** | 47° |
| DM2-R | Mid diagonal 2, right | XC3_R → XC4_C | 1 | **401.2 mm** | 47° |
| DR1-L | Rear diagonal 1, left | XC4_L → XC5_C | 1 | **357.3 mm** | 55.4° |
| DR1-R | Rear diagonal 1, right | XC4_R → XC5_C | 1 | **357.3 mm** | 55.4° |
| DR2-L | Rear diagonal 2, left | XC5_C → XC6_L | 1 | **336.2 mm** | 61.1° |
| DR2-R | Rear diagonal 2, right | XC5_C → XC6_R | 1 | **336.2 mm** | 61.1° |

**10 pieces · 3709.1 mm of cutting · 1 × 6 m bar = 6 m bought · 37.7% offcut waste**

### How to cut it from stock

Mark and cut in this order so the long pieces come off first and the offcuts stay usable.

- **Bar 1** (6000 mm): DM1-L 408.1 → DM1-R 408.1 → DM2-L 401.2 → DM2-R 401.2 → DR1-L 357.3 → DR1-R 357.3 → DN-L 351.7 → DN-R 351.7 → DR2-L 336.2 → DR2-R 336.2
  - 3739.1 mm consumed incl. kerf · **2263.9 mm offcut left over — label it and keep it**

## 25 mm OD x 2.0 mm round tube

| ID | Member | From → To | Qty | Cut length | Angle from frame axis |
|---|---|---|---|---|---|
| STR-RSR | Steering shaft riser | STR_LO → STR_HI | 1 | **194.7 mm** | 71.6° |

**1 pieces · 194.7 mm of cutting · 1 × 6 m bar = 6 m bought · 96.7% offcut waste**

### How to cut it from stock

Mark and cut in this order so the long pieces come off first and the offcuts stay usable.

- **Bar 1** (6000 mm): STR-RSR 194.7
  - 197.7 mm consumed incl. kerf · **5805.3 mm offcut left over — label it and keep it**

---

## Totals

- **19 different members, 19 pieces**
- **9.6 m of tube** before allowances and kerf
- 4 different profiles to buy

## Before you order anything

1. This list comes from placeholder dimensions. Replace the node table with real measurements first.
2. Confirm the tube sizes against what your local supplier actually stocks (see `04-02-suppliers-sa.md`).
3. Re-run this tool, then re-read the numbers. Steel you do not buy is money you did not waste.
