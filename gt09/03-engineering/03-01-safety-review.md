# 03-01 — Safety review: the step between "modelled" and "anyone sits in it"

Read this before Project 1 leaves the screen. It is short on purpose so it gets read.

## The rule

CAD and the design checks in [03-02](03-02-design-checks.md) catch *geometry* mistakes. They say
**nothing** about strength, weld quality or whether the thing will hold a person. Therefore:

> Nothing that will carry, steer, brake or propel a person is used for that purpose until an
> experienced adult / mechanical professional has physically inspected it and said so in writing.

## What is "safety-critical" in this project

Everything below must be inspected before the kart is ever sat in, pushed fast, or driven:

- The **welded frame** — every joint, for cracks, porosity, burn-through, and for overall squareness.
- **Steering** — shaft, bearings, joints; it must move freely with no play and no binding at full lock.
- **Brakes** — if fitted: master, line, caliper/disc or drum, pedal feel; tested at walking speed first.
- **Axles, hubs, bearings and their mounts** — including the (future) bearing hanger plates.
- **Seat mounting** — the seat and its brackets must not move under a firm push from any direction.
- **Wheels/tyres and their fasteners** — torqued, then re-torqued after the first use.
- **Any drivetrain** (chain, sprocket, guards) — Project 1 may stay non-powered; that is fine.

## Who signs off

An "experienced adult / mechanical professional" is, realistically, one of: a qualified welder or
fabricator, a vehicle mechanic, or an engineering teacher/mentor who will take responsibility. Ask
early — at the *design* stage — not after welding. A professional who sees the drawing can say
"increase the wall here" for free; the same advice after welding costs you the frame.

## The sign-off log

Copy this into your build log ([06-fabrication](../06-fabrication/)) and keep it truthful:

```
Date:            Inspector (name + role):
Item inspected:  (frame / steering / brakes / seat / axle / wheels / drivetrain)
Method:          (visual / torque check / load test / test at walking speed)
Result:          PASS / FAIL
Notes & conditions:
Signature:
```

## The sequence that keeps you safe and the project honest

1. Design in CAD (done by you).
2. Show the drawing to the professional *before* cutting (free advice).
3. Fabricate with supervision; log welds in the jig/weld log.
4. Inspector signs the frame.
5. Fit running gear; inspector signs each safety-critical system.
6. First movement is a **walking-speed** test on private ground, helmet on, with the inspector present.
7. Only after all of the above, low-speed driving on controlled ground. No stunts, ever.

If any step is skipped, the project is not "nearly done" — it is *not done*. A show car that is never
driven is a complete, successful Project. A driven car that skipped inspection is neither.
