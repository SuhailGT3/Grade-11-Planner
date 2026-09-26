# 01-01 — Chassis anatomy: what every tube does

Read this before you model anything. The goal is that when you look at the Onshape blueprint you
can name every line, and say *why it is there*. The member IDs below match
[specs/chassis-v0.json](../specs/chassis-v0.json) and the generated
[plan view](../02-cad/chassis-plan-v0.svg), so drawing ↔ anatomy always line up.

## First, the jargon (each used once, defined here)

- **Chassis / space frame** — the welded steel skeleton everything else bolts to.
- **Main rail** — the two long tubes running down the sides. The spine of the kart.
- **Crossmember** — a tube running *across* the frame, joining the two rails.
- **Diagonal / brace** — a tube set at an angle to turn a floppy square into a stiff triangle.
- **Node** — a point where members meet. Frames are really a network of nodes connected by members.
- **Gusset** — a small plate or tube added at a joint to strengthen it. (Our v0 uses tube diagonals
  instead of plates; plates come later for seat and axle mounts.)
- **Hardpoint** — a point in space where a *component* must sit: axle centres, pedal pivot, steering
  wheel, the driver's hips. Hardpoints are decided by the human and the running gear, **not** by
  where a tube happens to be. The frame is built *around* them.
- **H-point** — the driver's hip joint when seated. The single most important hardpoint; everything
  (seat, pedals, wheel) is measured from it.
- **Kerf** — the width of the cut your saw makes. It eats steel, so cut lists account for it.

## The members, and why they exist

### Rails — `RAIL-L`, `RAIL-R` (25 × 25 × 2.0)
Two long tubes, left and right, 1140 mm apart-ish in length, spaced 580 mm apart across.
They carry the driver's weight, the seat, the engine and every other member. They get the *thickest
wall (2.0 mm)* because they are loaded in bending the whole time. **If the rails are not straight
and equal, nothing downstream is square** — they are cut first and checked first.

### Crossmembers — `XC1` … `XC6` (25 × 25 × 1.6)
Six tubes across the frame. Their jobs, front to back:

- **XC1 (front)** — closes the nose so the rails can't squeeze together; carries the front bumper.
- **XC2 (steering)** — carries the steering shaft bearing and the pedal box. Must be exactly square
  to the rails or the steering pulls to one side.
- **XC3 (mid)** — front seat mount + a torsion stiffener under the driver.
- **XC4 (seat back)** — rear seat mount; takes the load of the driver being thrown backwards.
- **XC5 (engine front)** — front edge of the engine bay; also the node the rear diagonals tie into.
- **XC6 (rear)** — rear bumper mount and the strongest point for a push/tow handle.

A crossmember alone stops the rails moving *toward/away* from each other, but a plain ladder of
rails + crossmembers can still **rack** (skew into a parallelogram). That's what the diagonals fix.

### Diagonals — `DN-*`, `DM*`, `DR*` (20 × 20 × 1.6)
A square frame collapses into a parallelogram; a triangle cannot. Every diagonal creates triangles:

- **DN-L / DN-R** — a "V" at the nose tying XC1's ends into XC2's centre, where steering loads enter.
- **DM1 / DM2 (each side)** — a K-brace in the side bay so the frame resists *torsion* (twist) when
  one wheel hits a bump. Two short diagonals are stiffer than one long one.
- **DR1 / DR2** — triangulate the engine bay so engine torque can't twist the frame.

They carry mostly pure tension/compression along their length, so they can be **lighter (20 mm,
1.6 mm)** than the rails. *Thinner tube in the diagonals is not a shortcut, it is correct engineering.*

### Steering riser — `STR-RSR` (25 OD round)
A short round tube that raises the steering shaft bearing above the frame so the wheel sits at chest
height, not lap height. It is **round** because a bearing seats in a bore — round is the shape of
rotation. This is the one member whose shape comes from a part, not from structure.

## Hardpoints in v0 (from `specs/chassis-v0.json`)

| Hardpoint | x (rearwards +) | z (up) | Decided by |
|---|---|---|---|
| front_axle | 0 | 105 | the wheels/steering you choose |
| rear_axle | 1020 | 105 | wheelbase = 1020 |
| h_point (hips) | 830 | 210 | your body, seated |
| knee | 335 | 496 | your body |
| pedal_pivot | 80 | 160 | your leg reach |
| steer_wheel | 250 | 540 | your shoulders/arms |
| seat_back_top | 1010 | 690 | your torso + recline |

Notice the ordering: **the human and the running gear choose the hardpoints; the frame is then built
to connect them.** Never the reverse. Lesson 4 is where you replace these with *your* measured body.

## What this means when you look at the blueprint

When you open the Onshape go-kart design, don't count tubes — ask, for each member:
1. Is it a rail, a crossmember, a diagonal, or a part-driven member (like the riser)?
2. What load does it carry — bending, tension/compression, or torsion?
3. Which hardpoint(s) does it serve?

If you can answer those three for every member, you understand the design, and re-creating it in CAD
becomes recording what you understand instead of tracing lines. That is the difference between
copying and engineering.

Next: [01-02-measure-and-capture.md](01-02-measure-and-capture.md).
