# 02-04 — Lesson 3: the whole chassis with Frames, and Onshape's own cut list

**Goal:** build all 19 members as real tubes using the **Frame** feature, trim the joints, and pull
Onshape's built-in **Cut list** — then compare it against our own generated cut list as a cross-check.
This is the longest lesson (~60–90 minutes). Take it in one sitting if you can.

## Step 1 — draw the full path skeleton
Back in **Frame**, edit `sk_layout` (double-click it). Keep your rectangle and add:
1. The six **crossmember** lines at x = −40, 150, 430, 700, 900, 1060 spanning the rails. Use `D` and
   type the matching variable (`#xc2` … `#xc6`) or plain number for −40.
2. The **diagonals**, as straight lines between these node pairs (top view):
   - Nose V: (−40,−290)→(150,0), (−40,290)→(150,0)
   - Mid K left: (150,0)→(430,−290), (430,−290)→(700,0) ; right mirrors +290
   - Rear: (700,−290)→(900,0), (900,0)→(1060,−290), and mirrors
   You can just draw them and let Onshape snap endpoints to existing line ends/intersections.
3. Don't dimension every diagonal by hand — their ends are snapped to nodes that *are* dimensioned, so
   they inherit their position. That is the payoff of drawing a skeleton from nodes.

You now have a flat web of lines: the frame's nerve system. Exit the sketch.

## Step 2 — turn the rails into 25 × 25 × 2.0 tube
1. Click the **Frame** feature (in the toolbar under the *Solid* menu, or search "Frame" in the
   toolbar's search box).
2. For *Paths/edges*, select the **left rail line** and the **right rail line**.
3. For *Profile*, open the section library and choose **ISO rectangular tube 25 × 25 × 2.0**.
   (If the exact wall isn't listed, pick 25 × 25 and set wall 2.0 in the dialog.)
4. Tick/Enter. Two square tubes appear along the rails.

## Step 3 — the crossmembers and diagonals
Repeat **Frame**, in separate features so the sections stay distinct:
1. Select the **six crossmember lines** → profile **25 × 25 × 1.6** → tick.
2. Select the **ten diagonal lines** → profile **20 × 20 × 1.6** → tick.
3. Select nothing else yet. (The steering riser is round and vertical — we'll add it once we have a
   second plane, at the end.)

## Step 4 — trim the joints (Frame trim)
Right now tubes overlap and poke through each other at the nodes. Real joints are cut so the member
*butts* against its neighbour.
1. Click **Frame trim** (next to Frame in the toolbar/search).
2. Pick a diagonal as the *tool to trim*, and the rail or crossmember it lands on as the *cutter*.
3. Repeat for each diagonal end. The ends become coped (angle-cut) to sit flush on the neighbour.
> **Why trim matters:** the cut list only reports true cut lengths after trimming; and on the jig an
> un-trimed diagonal simply won't sit down. Trimming is the CAD equivalent of coping a tube with the
> angle grinder.

## Step 5 — the steering riser (round, vertical)
1. Edit `sk_layout`'s Part Studio: create the riser path by sketching a short line on the **Front**
   plane from (250, 150) up to (310, 330) — i.e. rising 180 and leaning 60 forward.
2. Run **Frame** on that line with profile **round 25 OD × 2.0**.

## Step 6 — generate Onshape's cut list and cross-check
1. Click **Cut list** (search "Cut list" in the toolbar).
2. It produces a table, one row per member: profile, length, quantity.
3. Now open our generated [04-01-cut-list.md](../04-materials/04-01-cut-list.md) and compare, member by
   member, against the JSON's numbers. **The two lists are computed independently** (Onshape from the
   swept solids; our tool from the node table). If a length disagrees by more than ~1 mm, one of the
   two has a wrong node — find it and fix it. That comparison is a real engineering verification habit.

## What you should have
A flat welded-looking space frame: 2 rails, 6 crossmembers, 10 diagonals, 1 riser, trimmed joints, and
two agreeing cut lists. Screenshot it and save the image next to this folder if you like.

Next: [02-05-lesson-04-packaging.md](02-05-lesson-04-packaging.md) — a human has to fit inside it.
