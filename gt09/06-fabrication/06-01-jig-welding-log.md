# 06-01 — Jigging, welding order, and the build log

Steel doesn't forgive a freehand layout. This is why every frame gets built **on a jig** — a full-size
template that holds every member at its node while you tack and weld. Only start here after the
drawing is reviewed ([03-01](../03-engineering/03-01-safety-review.md)).

## 1. Build the jig from the drawing (one afternoon)

1. Take a sheet of **MDF/plywood** at least 1200 × 700 and lay it on a flat, stable bench.
2. Print/transfer the **plan view** at 1:1 (the drawing is 1:10; multiply by 10, or use the node table
   directly). Using a square and tape, mark every **node** with a pencil cross.
3. Screw a short block just *outside* each node so a tube pushed into the corner sits exactly on its
   line. The blocks are your clamps' friends — the tube drops in and can't move.
4. Check the jig itself: measure the two diagonals of the rail rectangle; they must agree within 1 mm
   *before* any steel touches it. The jig's squareness is the frame's squareness.

> **Why a jig and not measuring each tube in place?** You measure once, on the jig, and then every
> frame you ever build on it comes out identical. It also removes the urge to "hold it and tack it",
> which is how frames come out twisted.

## 2. Cutting

- Cut from the [cut list](../04-materials/04-01-cut-list.md), longest first, leaving the +5 mm allowance.
- Square each end (grinder or file) and **write the member ID on it** with a marker. Unlabelled tube
  on the floor is guaranteed to be welded in the wrong place.
- Cope/trim the diagonal ends to match the trimmed angle in CAD (Frame trim gave you the shape).

## 3. Tack order (control distortion; heat pulls steel)

1. Lay the two **rails** in the jig, block them.
2. Tack **XC1** and **XC6** (the ends) — one tack each side.
3. Tack **XC2 … XC5**.
4. Measure the rail-rectangle **diagonals now**: equal within 1 mm, else shift while tacks are still
   breakable.
5. Tack the **diagonals**, then the **riser** last.
6. Only when everything is tacked and square do you run **full welds** — and you weld in a star order
   (jump around the frame, never two adjacent welds in a row) so heat spreads instead of accumulating.

## 4. The build log (keep it in this folder, truthfully)

```
Date | Member(s) | Cut by | Tack/full | Diagonals before (L/R) | After | Welder | Supervisor
```

Attach the professional's sign-off from [03-01](../03-engineering/03-01-safety-review.md) once the
frame passes. A frame with a clean log is worth more than a prettier frame with no log — the log is
the evidence that "I built it properly."

## 5. Never skip

- Helmet, gloves, jacket, no synthetics, ventilation, and a **second person present** whenever the arc
  is on.
- The frame is *not* ridden, sat-in-at-speed, or loaded until it is signed off.
