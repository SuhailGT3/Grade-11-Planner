# 01-02 — Measure and capture: get real numbers in

The node table in `specs/chassis-v0.json` currently holds *placeholder* numbers. Your first real
engineering act is to replace them with *measured* numbers from two sources:

1. **The Onshape blueprint** (the go-kart design you found) → the frame geometry.
2. **Your own body** → the hardpoints (H-point, knee, pedal, wheel).

This document tells you exactly how to measure, and where each number goes in the JSON.

---

## A. Pulling frame dimensions out of the Onshape blueprint

Onshape has a built-in **Measure** tool and, more usefully, the dimensions are often already written
on the original sketches. Two ways to read them:

### Way 1 — read the sketch dimensions (best)
1. In the Onshape document, open the Part Studio that contains the frame.
2. In the feature tree (left panel), click a **Sketch** (e.g. the frame layout sketch) to select it.
3. Press the **`D`** key (or right-click → *Show all dimensions*). The dimension callouts appear.
4. Write each one down into your own table. These are the *author's* intended values — use them as
   your first-pass nodes.

### Way 2 — use the Measure tool on the 3D geometry
1. Select the **Measure** tool: the icon looks like a ruler/tape, in the top toolbar
   (or press **`M`**).
2. Click two vertices (or an edge) on the model. The dialog shows distance, and for an edge, its
   length and its angle to the axes.
3. To get a member's **length**: click the member's edge → read *length*.
4. To get a **position**: click a vertex, and note its (x, y, z) in the dialog. That triple is
   exactly a **node** — copy it straight into the JSON.

> **Why both?** Sketch dimensions are the *design intent*. The Measure tool is what the model
> *actually is*. If the two disagree, the blueprint was edited after it was drawn — trust the
> Measure tool, and note the discrepancy.

### How a measurement becomes a node
The JSON stores each node as `[x, y, z]`:
- **x** = distance rearwards from the front-axle centreline (front axle = 0).
- **y** = sideways from the centreline (right of driver = positive, left = negative).
- **z** = height above the ground.

So if Onshape tells you a crossmember's left end is at x=150, y=–290, z=150, you write:
`"XC2_L": [150, -290, 150]`.

**Capture the left side fully, then mirror.** Because the frame is symmetric, you only measure one
side and flip the sign of `y` for the other. If a measured left/right pair *isn't* symmetric, that's
a red flag — stop and re-measure.

---

## B. Measuring your own body (for the hardpoints)

You need a tape measure, a friend, and a wall. Sit on a firm flat surface at the height the seat
will roughly be; better, measure *seated* proportions directly:

| JSON field | How to measure (approx.) |
|---|---|
| `stature_mm` | Your height, barefoot, against a wall. |
| `thigh_mm` | Seated, from the crease at your hip (H-point) to the back of your knee (popliteal). |
| `lower_leg_mm` | Seated, from back of knee to the floor under your ankle. |
| `hip_to_shoulder_mm` | Seated, from hip crease to the top of your shoulder, along your spine. |
| `shoulder_width_mm` | Across the outside of your shoulders. |
| `thigh_angle_deg` | How far above horizontal your thigh points when seated (start 25–30°). |
| `seat_recline_deg` | How far back from vertical you want to lean (start 25–30°). |

These are *starting* values. The design checks in
[03-02-design-checks.md](../03-engineering/03-02-design-checks.md) will tell you if the resulting
knee/ankle/shoulder positions clash with the frame, and you iterate the angles until they fit.

---

## C. Entering the numbers and closing the loop

1. Edit `specs/chassis-v0.json` (nodes + hardpoints + driver).
2. Run `node gt09/tools/build.mjs`.
3. Read the console: every check is `PASS` or `REVIEW`.
4. Open [03-02-design-checks.md](../03-engineering/03-02-design-checks.md) and fix every `REVIEW`
   by adjusting geometry — not by deleting the check.
5. Look at [chassis-plan-v0.svg](../02-cad/chassis-plan-v0.svg) and confirm the picture still makes
   sense (no crossing rails, wheels outside the frame, seat over the rails).
6. Commit the JSON *and* the three generated files together so they never disagree.

Repeat until the checks pass and the picture is believable. **That loop — edit, regenerate, read,
fix — is the actual engineering workflow.** You will do it many times.

Next: [02-cad/02-01-onshape-setup.md](../02-cad/02-01-onshape-setup.md).
