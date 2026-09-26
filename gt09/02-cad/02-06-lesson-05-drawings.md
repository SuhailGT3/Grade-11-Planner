# 02-06 — Lesson 5: fabrication drawings — paper a welder can hold

**Goal:** turn the model into a dimensioned drawing set (plan, side, front) with a cut-list table, and
export a PDF. The drawing is the contract between CAD and the workshop floor. ~45 minutes.

## Step 1 — create the drawing
1. At the bottom tab bar click **+** → **Drawing**. Choose *Create drawing* from your **Frame** Part
   Studio. Pick a template with a title block (A3 or A2 landscape).
2. A blank sheet with a title block appears. Fill the title block: *GT-09 P1 – KART FRAME*, scale,
   your name, date, **REV v0**.

## Step 2 — place the three views
1. Click **Base view** (toolbar). Select the Frame Part Studio, orientation **Top**, scale **1:10**,
   place it top-left.
2. With the base view selected, use the **Projected view** tool to drop a **Front** view below it and
   a **Right** view to its side. Onshape keeps them aligned to the base automatically.

> **Why these three?** Plan shows widths and the diagonal pattern; front shows rail height and track;
> side shows wheelbase and the riser angle. Together they fully describe every node in 3-D.

## Step 3 — dimension the views
Use the dimension tool on the drawing (not the sketch). Add, at minimum:
1. On the **plan**: overall rail length (1140), rail width (580), wheelbase (1020), and each
   crossmember's x position. These should read from your variables if the model is linked.
2. On the **side**: rail height (150), riser angle, ground clearance.
3. On the **front**: track, rail height.
Keep dimensions on the *outside* of the part, in neat rows. A cluttered drawing is a dangerous drawing.

## Step 4 — balloons + the cut-list table
1. Use the **Balloon** tool to tag each member with its ID from the JSON (RAIL-L, XC2, DN-L …).
2. Insert a table (or paste the generated [04-01-cut-list.md](../04-materials/04-01-cut-list.md) table)
   listing ID, member, profile, cut length, qty. The balloons tie drawing to table.
3. Add a note block: *"All lengths +5 mm finishing allowance. Cut long, trim on jig. Frame must be
   square: diagonals equal within 1 mm. Do not drive without professional inspection."*

## Step 5 — export
1. **Export** → PDF. Name it `GT09-P1-frame-rev0.pdf`.
2. Print it. Hold it next to the steel. If any dimension you need on the floor is missing, that's a
   drawing bug — fix the drawing, re-export, and bump the REV letter.

> **Why bother when we have a screen?** On the workshop floor there is welding glare, gloves and
> sparks. Paper survives; a laptop doesn't. The drawing also forces you to commit to numbers — you
> can't "eyeball it later" on paper.

That completes the CAD loop: **sketch → members → packaging → drawings**. You now produce, not consume,
a design. Project 1's next gate is [03-01-safety-review.md](../03-engineering/03-01-safety-review.md)
*before* any steel is cut.
