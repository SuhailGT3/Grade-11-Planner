# 02-03 — Lesson 2: your first tube (profile + extrude = steel)

**Goal:** turn a 2-D square into a 3-D length of 25 × 25 × 2.0 tube, and understand the single idea
behind *all* frame members: **a cross-section pushed along a path**. ~20 minutes.

Don't worry about placing it in the right global spot yet — Lesson 3 (Frames) positions members for
us. Here we just learn what a tube *is* to CAD.

## Step 1 — sketch the cross-section
1. Select the **Right** plane (the YZ plane) in the tree, click **Sketch** (`S`).
2. Draw a rough square with the **Line** tool (`L`), close it, `Esc`.
3. Add constraints: **Horizontal** on top+bottom, **Vertical** on left+right, **Equal** across all four.
4. Dimension one side: `D`, click a side, type **25**. The square becomes 25 × 25. This is the
   *outside* of the tube.

## Step 2 — make it hollow (the wall thickness)
A solid 25 × 25 bar is far heavier than you need and wastes money. Real tube has a **wall**. For
25 × 25 × 2.0 the wall is 2.0 mm, so the *inside* square is 25 − 2×2 = **21**.
1. In the same sketch, draw a second, smaller square *inside* the first, roughly centred.
2. Constrain it centred: use **Symmetric** (or concentric-style) about the outer square's centre, and
   dimension one side to **21**.
3. You now have a square ring. When extruded, the ring becomes a hollow tube.

> **Why two squares?** Extruding one closed shape gives a solid. Two closed shapes, one inside the
> other, tell Onshape "solid here, empty in the middle" — that's the wall.

## Step 3 — extrude it into a length of tube
1. Press **Esc** so nothing is selected. Click the **Extrude** tool (icon of an arrow pushing a face)
   or press **`E`**.
2. In the dialog, *Profiles* should already show your ring (the area between the squares). If not,
   click inside the ring.
3. Set the **distance** to **300** (just a practice length) and press Enter / tick.
4. A 300 mm length of 25 × 25 × 2.0 square tube appears. **Orbit** (hold right-mouse and drag) to look
   down the tube — you should see the square hole through it.

## Step 4 — the idea to keep
Every rail, crossmember and diagonal in the frame is exactly this: a cross-section (a square or
circle of the right size and wall) pushed along a path (a straight line between two nodes). The only
differences between members are *which* section and *which* path. That is why Lesson 3 can build all
19 members quickly: we define the paths once (the layout) and let the **Frame** feature sweep the
right section along each path automatically.

You can delete this practice tube (right-click the Extrude feature → *Delete*) before Lesson 3, or
hide it — either is fine.

Next: [02-04-lesson-03-full-chassis.md](02-04-lesson-03-full-chassis.md).
