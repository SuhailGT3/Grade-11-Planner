# 00 — Charter

## What this project is

A 17-year-old from Vryheid, KZN, is building a year-long engineering project toward a matric
entrance in 2027. The end image is a motorsport-style arrival — car, racing suit, two pit crew —
but the real outcome is a person who can genuinely say **"I designed and built this."**

Two projects, strictly in order:

1. **Project 1 — go-kart.** Re-create an existing tube-frame go-kart in Onshape, understand every
   member, produce a fabrication plan, and (with adult supervision and inspection) build it. This
   teaches CAD, measuring, cutting, jigging, welding and alignment.
2. **Project 2 — GT-09.** Design an original F1-inspired open-wheel show car. V1 is a display
   prototype. V2 may, much later, become a low-power vehicle that is properly inspected.

## The four things that are not the same thing

This project lives and dies by keeping these separate, because mixing them up is how people get
hurt or waste money:

1. **CAD modelling** — drawing geometry on a screen. Proves the parts fit and gives you numbers.
2. **Engineering design** — deciding *why* the geometry is what it is: loads, tubes, joints.
3. **Fabrication** — cutting, jigging, welding real steel to match the drawing.
4. **Safety validation** — an experienced adult / mechanical professional checking that a
   structure that will carry a person is strong enough and that steering and brakes work.

CAD proves **1**, helps with **2**, and produces a plan for **3**. It proves **4** about nothing.
A model that looks right is not a frame that is safe. Every step that leads toward a person sitting
in or driving something must be followed by **4** before it happens. See
[03-engineering/03-01-safety-review.md](03-engineering/03-01-safety-review.md).

## Hard rules (non-negotiable)

- Nothing is ever driven on a public road, at speed, or for stunts, burnouts or drifting.
- Any driving, if it ever happens, is on private/controlled ground, at low speed, only after
  steering, brakes, chassis and fasteners have been inspected by an experienced adult/professional,
  and with appropriate protective gear.
- No steel is cut until the node table in `specs/` holds measured values, not guesses.
- No steel is welded without supervision until the supervisor has signed the jig/weld log in
  [06-fabrication/](06-fabrication/).
- School approval comes *before* any entrance is planned in detail. The car can arrive on a
  trailer. The entrance is short, calm and cinematic — never a stunt.

## Money rules

- No budget is assumed. Before recommending a purchase: identify exactly what is needed, split
  essential vs optional, compare new vs used, consider South African suppliers and what can be
  fabricated in-house. See [05-budget/05-01-budget-method.md](05-budget/05-01-budget-method.md).
- Nothing is bought "just in case". Steel you do not buy is money you did not waste.

## How we teach here

You are a beginner. So every instruction states: exactly what to click, what to select, what number
to type, why we are doing it, and what the result should look like. No unexplained jargon — if a
word like *crossmember*, *gusset*, *H-point* or *kerf* shows up, it is defined the first time it is
used (and again in [01-01-chassis-anatomy.md](01-research/01-01-chassis-anatomy.md)).

## The sentence this whole folder exists to make true

> LEARN CAD → DESIGN → FABRICATE → BUILD → DOCUMENT → DEVELOP GT-09 → CREATE THE ENTRANCE
