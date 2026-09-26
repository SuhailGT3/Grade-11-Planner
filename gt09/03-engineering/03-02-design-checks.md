# 03-02 — Automatic design checks (v0)

> **GENERATED FILE — do not edit by hand.** Produced by `node gt09/tools/build.mjs`.
>
> These checks catch *geometry mistakes* — a member that is too short to hold, a pedal
> box your legs cannot reach, a shoulder that does not fit between the rails.
>
> **They do not check strength.** Nothing in this report tells you the frame is safe to
> sit in, let alone drive. See `03-01-safety-review.md`.

Driver model: 1730 mm tall, thigh 571 mm, lower leg 424 mm,
thigh angle 30°, seat recline 28°.

| Check | Result | Target | Status |
|---|---|---|---|
| Knee to steering wheel clearance | 96.4 mm | >= 120 mm | **REVIEW** |
| Pedal position matches leg reach | off by 3.8 mm | <= 40 mm | PASS |
| Shoulder clearance inside the rails | 47.5 mm each side | >= 25 mm each side | PASS |
| Ground clearance under the frame | 137.5 mm | >= 60 mm | PASS |
| H-point ahead of the rear axle | 190 mm ahead | >= 120 mm ahead | PASS |
| Rails equal length in the model | 1140 / 1140 mm | identical | PASS |

## Detail

### REVIEW — Knee to steering wheel clearance

Computed knee position is x=335.5, z=495.5. Fix by moving the steering column forward, lowering the H-point, or reducing the thigh angle.

### PASS — Pedal position matches leg reach

Ankle lands at x=76.2 but the pedal pivot is at x=80.

### PASS — Shoulder clearance inside the rails

Clear width between rails 555 mm, shoulders 460 mm. Add ~50 mm for a padded racing suit before you accept this.

### PASS — Ground clearance under the frame

Bottom of the main rail sits 137.5 mm above the ground.

### PASS — H-point ahead of the rear axle

If the driver sits on the axle the kart will have no rear weight transfer and the seat cannot be bolted down.

### PASS — Rails equal length in the model

This only proves the CAD is symmetric. Squareness on the jig is checked with diagonal measurements.

## Warnings

- None.

## Computed driver packaging

| Point | x (forward of front axle, rearwards +) | z (above ground) |
|---|---|---|
| H-point (hips) | 830 mm | 210 mm |
| Knee (computed) | 335.5 mm | 495.5 mm |
| Ankle (computed) | 76.2 mm | 160 mm |
| Shoulder (computed) | 567.1 mm | 704.5 mm |

## Frame summary

| Dimension | Value |
|---|---|
| Wheelbase (front axle to rear axle) | 1020 mm |
| Rail centre-to-centre width | 580 mm |
| Rail length | 1140 mm |
| Rail top above ground | 162.5 mm |
| Ground clearance under frame | 137.5 mm |
| Front track (model) | 720 mm |
| Rear track (model) | 780 mm |
