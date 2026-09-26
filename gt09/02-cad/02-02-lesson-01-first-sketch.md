# 02-02 — Lesson 1: your first fully-constrained sketch (the frame's footprint)

**Goal:** draw the frame's outline as a rectangle, drive it with your variables, and get Onshape to
say it is *fully defined*. This teaches lines, constraints and dimensions — the whole CAD alphabet —
in one small success. ~30 minutes.

You will draw on the **Top plane** (the view looking straight down — the plan), with the origin at the
front-axle centre, matching the JSON's axis convention.

## Step 1 — open a sketch on the Top plane
1. In your **Frame** Part Studio, look at the **feature tree** on the left. You'll see three planes:
   *Front*, *Top*, *Right*.
2. Click **Top** once to select it. It highlights.
3. Click the **Sketch** tool (pencil icon, top-left of the toolbar) — or press **`S`**.
   Onshape opens a 2-D sketch looking down at that plane. A grid appears.

## Step 2 — draw a rough rectangle (four lines, don't worry about size)
1. Click the **Line** tool (icon of a diagonal line) or press **`L`**.
2. Click four points roughly forming a rectangle, then click the first point again to close it, then
   press **Esc**. It will be the wrong size and crooked. **That is correct and expected.**

> **Why rough first?** In CAD you draw *shape first, size second*. Constraints describe the shape
> (this is a rectangle, centred on the origin); dimensions describe the size. Never try to draw the
> right size freehand — you can't. You *constrain* it.

## Step 3 — add constraints (the shape)
With the sketch still open, add these, one at a time, from the **Constraints** panel (the row of
small icons on the right or top). Click a constraint icon, then click the geometry it applies to.

1. **Horizontal** (icon of a horizontal line): click the top line, then again for the bottom line.
2. **Vertical** (vertical line icon): click the left line, then the right line.
3. **Equal** (two bars): click the left line then the right line (equal lengths).
4. **Symmetric**: click the left line's midpoint, the right line's midpoint, then the vertical
   centre line/origin. (This centres the rectangle left-right about the origin.)

As you click, the lines snap into a proper rectangle centred on the origin. Watch the small
**readout** near the sketch toolbar — it counts *remaining degrees of freedom* and ticks down.

> **Why constraints before dimensions?** A constraint is a permanent rule ("always horizontal").
> A dimension is a size that could change. Rules first, sizes second.

## Step 4 — add dimensions (the size, from your variables)
1. Click the **Dimension** tool (icon like `|←→|`) or press **`D`**.
2. Click the **left line**, then the **right line**, and place the dimension *outside* the shape. A
   box appears. **Type `#railW` and press Enter.** The width jumps to 580.
3. Click the **top line**, then the **bottom line**, place the dimension, and type `#railLen`. Length
   jumps to 1140.
4. To pin the front edge to the origin: press **`D`**, click the **top line**, then click the
   **origin** (the little icon where the axes cross), place a vertical dimension, and type `-60` —
   meaning the front rail sits 60 mm *ahead* of the front axle (negative = forward).

The degrees-of-freedom readout should now show the sketch is **fully defined / fully constrained**.
Everything turns a single consistent colour and nothing wiggles when you drag it.

## Step 5 — prove the variables are alive
1. Open your **Params** Variable Studio.
2. Change `railW` from 580 to **600**. Press Enter.
3. Switch back to **Frame**. The rectangle should instantly become 600 wide.
4. Change it back to **580**.

> **Why do this?** This one trick is the whole point of parametric CAD: the drawing obeys the table,
> not your hand. When the blueprint's numbers differ from the placeholder, you'll edit the table —
> exactly like this — and the model will follow.

## What you should have
One Part Studio called **Frame**, one sketch (rename it `sk_layout` by right-clicking in the tree),
a centred rectangle 1140 × 580, fully constrained, driven by `#railLen` and `#railW`.

Next: [02-03-lesson-02-first-tube.md](02-03-lesson-02-first-tube.md) — we give the left rail real steel.
