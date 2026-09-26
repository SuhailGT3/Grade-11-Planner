# 04-02 — South African steel: who to ask, what it roughly costs

> **Read the charter first.** This page exists so that *when* the design is measured and reviewed,
> you can price it in one afternoon. It is **not** permission to buy yet.

## What you're buying (from the cut list)

From [04-01-cut-list.md](04-01-cut-list.md) (placeholder numbers): roughly **9.6 m of tube** across
four profiles, each fitting in a single 6 m bar in v0. Real numbers will differ — re-read after you
re-measure.

## Indicative street prices (checked online; re-quote before buying)

| Item | ~Price (ex VAT) | Source |
|---|---|---|
| Square tube 25 × 25 × 1.6, 6 m | R 139–235 | Build It / steelonline |
| Square tube 25 × 25 × 2.0, 6 m | R 291 | steelonline |
| Square tube 20 × 20 × 1.6, 6 m | R ~175 (19 mm proxy) | steelonline |
| Round tube 25 OD × 1.6, 6 m | R ~154–235 | steelonline / Leroy |

These are *retail, per 6 m bar*. They show the steel itself is a small part of the budget — the
consumables (cutting discs, welding rods/wire, paint) and the running gear (wheels, axle, steering)
dominate. Don't optimise the steel price first.

## Where to ask (mix of national merchants and local yards)

- **NJR Steel / Macsteel / steelonline** — national processors; good for consistent wall thickness.
- **Leroy Merlin / Builders / Build It** — retail counters; fine for small bars, you can collect.
- **Local steel yards & second-hand yards around Vryheid/Newcastle** — ask for *offcuts and used
  square tube*. For a learning frame, clean used 25×25 at half price is a legitimate choice; inspect
  for rust-through and bends.
- **Scrap / engineering shops** — often sell short lengths cheap; ideal for practice coupons before
  you weld the real frame.

## Compare new vs used (per the money rules)

| | New | Used/offcut |
|---|---|---|
| Wall guaranteed | yes | must measure with calipers |
| Straight | yes | check by rolling on a flat floor |
| Rust | none | must sound when tapped, no flaking |
| Price | full | often 40–60% less |

Rule: **used steel is fine for Project 1's learning frame if inspected; never for anything
safety-critical you didn't personally verify.**

## Before you order anything

1. The node table holds measured values (01-02).
2. A professional has looked at the drawing (03-01).
3. Re-run `node gt09/tools/build.mjs` and read the bar counts — buy the **bars**, not the metres.
4. Add one spare bar of the rail profile. Everything else, buy exactly to the list.
