# GT-09 RACING — Project workspace

This folder is the engineering workspace for the GT-09 programme:

**LEARN CAD → DESIGN → FABRICATE → BUILD → DOCUMENT → DEVELOP GT-09 → MATRIC ENTRANCE**

It holds everything as *documents the project can point at*, plus one small tool that turns the
CAD model's numbers into fabrication output. Read this page first, then follow the path below.

## The two projects, in order

| Project | What it is | Status |
|---|---|---|
| **Project 1** | Re-create an existing go-kart space frame in Onshape, understand every member, and produce a fabrication plan. This is the training ground. | **ACTIVE — start here** |
| **Project 2** | Design GT-09, an original F1-inspired show car (V1 display, V2 possibly low-power and inspected). | NOT STARTED — do not jump to this |

The whole point of Project 1 is that Project 2 is designed by someone who already knows their
way around CAD, steel and a jig. Do not skip the training.

## Start here (in this order)

1. [00-charter.md](00-charter.md) — what this project is, and the safety contract. Read it all.
2. [01-research/01-01-chassis-anatomy.md](01-research/01-01-chassis-anatomy.md) — what every tube does, and why it is where it is.
3. [01-research/01-02-measure-and-capture.md](01-research/01-02-measure-and-capture.md) — how to pull real numbers out of the Onshape blueprint and your own body.
4. [02-cad/02-01-onshape-setup.md](02-cad/02-01-onshape-setup.md) and the five lessons after it.
5. [03-engineering/03-01-safety-review.md](03-engineering/03-01-safety-review.md) — before anything is driven.

## The numbers live in one place

The whole frame is described by a node table in [specs/chassis-v0.json](specs/chassis-v0.json).
Every length, angle, the cut list, the drawing and the design checks are *computed* from that one
file by [tools/build.mjs](tools/build.mjs):

```bash
node gt09/tools/build.mjs
```

It regenerates:

| Output | What it is |
|---|---|
| [04-materials/04-01-cut-list.md](04-materials/04-01-cut-list.md) | Tube cut list + how many bars to buy |
| [03-engineering/03-02-design-checks.md](03-engineering/03-02-design-checks.md) | Automatic geometry / driver-packaging checks |
| [02-cad/chassis-plan-v0.svg](02-cad/chassis-plan-v0.svg) | Dimensioned plan view of the frame |

Why this matters: a length typed into a Word document and a length drawn in CAD drift apart the
first time you change the design. Here, the drawing and the cut list can never disagree with the
model because all three come from the same table. When you fix a dimension in the JSON, re-run the
tool and commit the JSON *and* the outputs together.

> **Status of everything in this folder: v0 PLACEHOLDER.** The node table is a starting geometry for
> learning the workflow. It has not been measured from the Onshape blueprint and has not been
> reviewed by an adult or a professional. Nothing here authorises cutting steel or driving anything.

## Folder map

| Path | Contents |
|---|---|
| `00-charter.md` | Mission, scope, safety contract |
| `01-research/` | Chassis anatomy + how to measure and capture real numbers |
| `02-cad/` | Onshape setup + 5 hands-on lessons + generated plan view |
| `03-engineering/` | Safety review process + generated design checks |
| `04-materials/` | Generated cut list + South African suppliers |
| `05-budget/` | How to cost it without buying early |
| `06-fabrication/` | Jigging, welding, alignment, the build log |
| `07-bodywork/` | GT-09 V1 bodywork (later) |
| `08-electrical/` | GT-09 electrics (later) |
| `09-livery/` | GT-09 livery & branding (later) |
| `10-matric-entrance/` | The run-of-show (later) |
| `specs/` | The single source of truth JSON |
| `tools/` | The artifact generator |

## How this folder talks to you

Every lesson uses the same format, because you asked for it:
**what to click → what to select → what to type → why → what it should look like.**
If a step skips one of those, that is a bug in the document, not in you.
