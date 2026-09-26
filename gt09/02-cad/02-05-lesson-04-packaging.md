# 02-05 — Lesson 4: packaging — a human has to fit inside it

**Goal:** put a simple seat, pedals and steering wheel into the frame at the hardpoints, then check the
same clearances our build tool reports. CAD is only honest when you put the driver in. ~45 minutes.

First, measure your body as in [01-02](../01-research/01-02-measure-and-capture.md) §B and update the
`driver` block + hardpoints in `specs/chassis-v0.json`, then run the build tool and leave its
[design checks](../03-engineering/03-02-design-checks.md) open beside Onshape. You're going to make the
3-D model tell you the same story.

## Step 1 — a placeholder seat
1. Sketch a rectangle on **Top** roughly 380 wide × 420 long where the seat sits (H-point ~830).
2. **Extrude** it up ~250 and tilt it back with a **Transform/rotate** by your `seat_recline_deg`
   (don't chase perfection — this is an envelope, not upholstery).
3. Rename it `SEAT`.

## Step 2 — steering column and wheel
1. Sketch a circle (Ø ~300) on a plane tilted ~20–30° at the steering-wheel hardpoint (250, 0, 540).
2. Extrude it 25 thick → a disc = the wheel. Add a short cylinder back to the riser top = the column.
3. Rename `STEER`.

## Step 3 — pedals
1. A small box ~120 wide × 180 tall at the pedal pivot (80, 0, 160), tilted so the pad faces the driver.
2. Rename `PEDALS`.

## Step 4 — measure, and fight the REVIEWs
Now use **Measure** (`M`) to reproduce each check in 3-D:
1. **Knee ↔ wheel rim**: measure from the seat front edge (your knee zone) to the wheel rim. Compare to
   the tool's "Knee to steering wheel clearance". If it's under 120 mm, slide the column forward by
   editing its sketch position — don't move the seat yet.
2. **Ankle ↔ pedal**: does your computed ankle x land on the pedal pad? If off by more than ~40 mm,
   move the pedal box, not the driver.
3. **Shoulders ↔ rails**: measure the clear width between rail inner faces (~555) and confirm it beats
   your shoulder width + suit padding.

Every number you read in Onshape should agree with [03-02](../03-engineering/03-02-design-checks.md)
within a few mm. Where they disagree, the JSON and the model have drifted — resync them.

> **Why this loop?** This is "design iteration" for real: the tool flags a `REVIEW`, you fix it in the
> model, regenerate, re-check, until green. You are not making the checks pass by deleting them; you
> are changing geometry until the human fits. That difference is the entire discipline.

When every check is PASS (or an accepted, written-down REVIEW), move on.

Next: [02-06-lesson-05-drawings.md](02-06-lesson-05-drawings.md) — turn the model into paper a welder can hold.
