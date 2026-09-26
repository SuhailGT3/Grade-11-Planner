# 02-01 — Onshape setup (one-time)

Goal: a clean, correctly-unit'd Onshape document with the frame's numbers loaded as *variables*, so
changing one number updates the whole model. About 20 minutes.

## 1. Create the document
1. Go to onshape.com and sign in (the free browser plan is fine for this project).
2. Click the green **Create** button (top-left) → **Document**.
3. Name it **GT-09 Project 1 – Kart frame**. Leave it *Private*. Click **Create public/private document**.

## 2. Set units to millimetres
Onshape's default is already mm on most accounts, but verify — building in the wrong units is the
classic way to make a 6-metre go-kart.
1. In your new document, look at the **bottom toolbar**. You'll see a units readout like `mm` / `in`.
2. Click it. In the dialog, set **Length units = millimeter**, **Mass = kilogram**, **Angle = degree**.
3. Click the tick to close. Every number you type from now on is in mm.

## 3. Create a Part Studio
1. In the tabs at the bottom, click the **+** next to the tab bar → **Part Studio** (it may already
   exist as "Part Studio 1"). Rename the tab by right-clicking it → *Rename* → **Frame**.

## 4. Add the frame's numbers as variables (Variable Studio)
Variables are named numbers you can reuse anywhere. This is the single most important habit in the
project. Onshape holds them in a **Variable Studio**, one table that drives every Part Studio.
1. At the bottom tab bar click the **+** and choose **Variable studio**. Name it **Params**.
2. At the bottom of that tab, tick **"Insert into all Part Studios and Assemblies"**. That one tick
   is what makes the numbers visible from your Frame Part Studio.
3. Click **Add variable** and add each row below (name, then value, Enter):

| Name | Value | What it is |
|---|---|---|
| `railLen` | 1140 | main rail length |
| `railW` | 580 | rail centre-to-centre width |
| `railH` | 150 | rail height above ground |
| `wb` | 1020 | wheelbase |
| `xc2` | 150 | steering crossmember x |
| `xc3` | 430 | mid crossmember x |
| `xc4` | 700 | seat-back crossmember x |
| `xc5` | 900 | engine member x |
| `xc6` | 1060 | rear crossmember x |

4. In any Part Studio you now reference them by typing **`#railLen`** etc. into a dimension box
   (the `#` means "this is a variable, not a fixed number").

> **Why variables?** Later, if the wheelbase changes, you edit **one** number and the rails, axles,
> dimensions and (once linked) the cut list all follow. Without variables you would be re-drawing.

(These mirror `specs/chassis-v0.json`. The JSON is the master list; the Variable Studio is the
working copy. Keep them equal — if you change one, change both, then re-run the build tool.)

## 5. What it should look like
You should now see a Part Studio tab named **Frame**, units showing **mm**, and a variables list
holding the nine names above. Nothing 3D yet — that is Lessons 1–2.

## Common trap
Do **not** start by dragging a cube or cylinder. We build from a **2-D layout sketch on a plane**,
exactly like a builder chalks lines on a floor before cutting. Every later lesson hangs off that one
sketch. Lesson 1 builds it.

Next: [02-02-lesson-01-first-sketch.md](02-02-lesson-01-first-sketch.md).
