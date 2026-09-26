#!/usr/bin/env node
/*
 * GT-09 Racing — chassis artifact generator
 * -----------------------------------------
 * Single source of truth: gt09/specs/chassis-v0.json
 *
 *   node gt09/tools/build.mjs
 *
 * Writes:
 *   gt09/04-materials/04-01-cut-list.md        fabrication cut list + stock requirement
 *   gt09/02-cad/chassis-plan-v0.svg            dimensioned plan view of the frame
 *   gt09/03-engineering/03-02-design-checks.md automatic geometry / packaging report
 *
 * No dependencies. Node 18+.
 *
 * WHY THIS EXISTS: a length typed into a document by hand and a length drawn in CAD
 * will drift apart the first time you change the design. This script means the cut
 * list can never disagree with the model — both come from the same node table.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

const spec = JSON.parse(readFileSync(join(ROOT, 'specs', 'chassis-v0.json'), 'utf8'));

const N = spec.nodes;
const round = (v, d = 1) => Math.round(v * 10 ** d) / 10 ** d;
const fmt = (v) => round(v).toString();

/* ------------------------------------------------------------------ */
/* 1. Geometry                                                        */
/* ------------------------------------------------------------------ */

function dist(a, b) {
  const [ax, ay, az] = N[a];
  const [bx, by, bz] = N[b];
  return Math.hypot(bx - ax, by - ay, bz - az);
}

function angleFromAxis(a, b) {
  const [ax, ay, az] = N[a];
  const [bx, by, bz] = N[b];
  const d = Math.hypot(bx - ax, by - ay, bz - az);
  return (Math.acos(Math.abs(bx - ax) / d) * 180) / Math.PI;
}

const members = spec.members.map((m) => ({
  ...m,
  length: dist(m.from, m.to),
  angle: angleFromAxis(m.from, m.to),
}));

const profiles = new Map(spec.stock.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/* 2. Cut list + stock requirement (first-fit-decreasing bin packing) */
/* ------------------------------------------------------------------ */

const { kerf_mm: KERF, allowance_per_cut_mm: ALLOW } = spec.cutting;

function planStock(profileId) {
  const stock = profiles.get(profileId);
  const pieces = [];
  for (const m of members.filter((m) => m.profile === profileId)) {
    for (let i = 0; i < m.qty; i++) {
      pieces.push({ id: m.id, name: m.name, cut: m.length + ALLOW });
    }
  }
  pieces.sort((a, b) => b.cut - a.cut);

  const bars = []; // each bar: { used: [{...piece, pos}], remaining }
  for (const p of pieces) {
    let placed = false;
    for (const bar of bars) {
      if (bar.remaining >= p.cut) {
        bar.used.push(p);
        bar.remaining -= p.cut + KERF;
        placed = true;
        break;
      }
    }
    if (!placed) {
      bars.push({ used: [p], remaining: stock.stock_length_mm - p.cut - KERF });
    }
  }
  return { stock, pieces, bars };
}

/* ------------------------------------------------------------------ */
/* 3. Driver packaging (approximate anthropometry)                    */
/* ------------------------------------------------------------------ */

const d = spec.driver;
const HP = spec.hardpoints.h_point;
const rad = (deg) => (deg * Math.PI) / 180;

// Knee = hip + thigh along the thigh angle (forward = -x, up = +z)
const kneeRun = d.thigh_mm * Math.cos(rad(d.thigh_angle_deg));
const kneeRise = d.thigh_mm * Math.sin(rad(d.thigh_angle_deg));
const kneeCalc = {
  x: HP[0] - kneeRun,
  z: HP[2] + kneeRise,
};

// Ankle = knee + lower leg, dropping to the pedal height
const pedalZ = spec.hardpoints.pedal_pivot[2];
const drop = kneeCalc.z - pedalZ;
const ankleRun = Math.sqrt(Math.max(0, d.lower_leg_mm ** 2 - drop ** 2));
const ankleCalc = { x: kneeCalc.x - ankleRun, z: pedalZ };

// Shoulder = hip + torso along the seat recline
const shoulder = {
  x: HP[0] - d.hip_to_shoulder_mm * Math.sin(rad(d.seat_recline_deg)),
  z: HP[2] + d.hip_to_shoulder_mm * Math.cos(rad(d.seat_recline_deg)),
};

const railHalf = Math.abs(N.RL_R[1]);
const railTube = 25;
const railTopZ = N.RL_R[2] + railTube / 2;

const checks = [];
function check(name, ok, value, target, detail) {
  checks.push({ name, ok, value, target, detail });
}

// C1 knee to steering wheel rim
const kneeToWheel = Math.hypot(
  spec.hardpoints.steer_wheel[0] - kneeCalc.x,
  spec.hardpoints.steer_wheel[2] - kneeCalc.z
);
check(
  'Knee to steering wheel clearance',
  kneeToWheel >= spec.limits.min_knee_to_wheel_mm,
  `${fmt(kneeToWheel)} mm`,
  `>= ${spec.limits.min_knee_to_wheel_mm} mm`,
  `Computed knee position is x=${fmt(kneeCalc.x)}, z=${fmt(kneeCalc.z)}. ` +
    `Fix by moving the steering column forward, lowering the H-point, or reducing the thigh angle.`
);

// C2 pedal reach
const pedalErr = Math.abs(ankleCalc.x - spec.hardpoints.pedal_pivot[0]);
check(
  'Pedal position matches leg reach',
  pedalErr <= spec.limits.pedal_reach_tolerance_mm,
  `off by ${fmt(pedalErr)} mm`,
  `<= ${spec.limits.pedal_reach_tolerance_mm} mm`,
  `Ankle lands at x=${fmt(ankleCalc.x)} but the pedal pivot is at x=${spec.hardpoints.pedal_pivot[0]}.`
);

// C3 shoulder clearance between the rails
const clearWidth = railHalf * 2 - railTube;
const shoulderClearEach = (clearWidth - d.shoulder_width_mm) / 2;
check(
  'Shoulder clearance inside the rails',
  shoulderClearEach >= spec.limits.min_shoulder_clearance_each_side_mm,
  `${fmt(shoulderClearEach)} mm each side`,
  `>= ${spec.limits.min_shoulder_clearance_each_side_mm} mm each side`,
  `Clear width between rails ${fmt(clearWidth)} mm, shoulders ${d.shoulder_width_mm} mm. ` +
    `Add ~50 mm for a padded racing suit before you accept this.`
);

// C4 ground clearance under the frame
const groundClear = N.RL_R[2] - railTube / 2;
check(
  'Ground clearance under the frame',
  groundClear >= spec.limits.min_ground_clearance_mm,
  `${fmt(groundClear)} mm`,
  `>= ${spec.limits.min_ground_clearance_mm} mm`,
  `Bottom of the main rail sits ${fmt(groundClear)} mm above the ground.`
);

// C5 H-point vs rear axle (seat must not sit on the axle)
const hipToRearAxle = spec.hardpoints.rear_axle[0] - HP[0];
check(
  'H-point ahead of the rear axle',
  hipToRearAxle >= 120,
  `${fmt(hipToRearAxle)} mm ahead`,
  '>= 120 mm ahead',
  'If the driver sits on the axle the kart will have no rear weight transfer and the seat cannot be bolted down.'
);

// C6 frame squareness reference
const railLenL = dist('RL_F', 'RL_R');
const railLenR = dist('RR_F', 'RR_R');
check(
  'Rails equal length in the model',
  Math.abs(railLenL - railLenR) < 0.01,
  `${fmt(railLenL)} / ${fmt(railLenR)} mm`,
  'identical',
  'This only proves the CAD is symmetric. Squareness on the jig is checked with diagonal measurements.'
);

/* ------------------------------------------------------------------ */
/* 4. Warnings                                                        */
/* ------------------------------------------------------------------ */

const warnings = [];
for (const m of members) {
  if (m.length < spec.limits.min_member_length_mm) {
    warnings.push(
      `**${m.id}** is only ${fmt(m.length)} mm long — too short to hold safely in a jig. Combine it with a neighbouring member or weld it into an assembly before cutting.`
    );
  }
}
for (const m of members.filter((m) => m.group === 'Crossmembers')) {
  const span = Math.abs(N[m.to][1] - N[m.from][1]);
  if (span > spec.limits.max_crossmember_span_mm) {
    warnings.push(
      `**${m.id}** spans ${fmt(span)} mm with no support in the middle. Add a brace or use a larger tube.`
    );
  }
}

/* ------------------------------------------------------------------ */
/* 5. Emit cut list                                                   */
/* ------------------------------------------------------------------ */

let cutMd = `# 04-01 — Tube cut list (v0)

> **GENERATED FILE — do not edit by hand.**
> Produced by \`node gt09/tools/build.mjs\` from \`gt09/specs/chassis-v0.json\`.
> Edit the JSON, re-run the tool, commit both.
>
> **Status: ${spec.meta.status}.** These are placeholder dimensions for learning the
> workflow. Nothing here has been measured. Do not order steel from this list yet.

Every cut length below already includes ${ALLOW} mm of finishing allowance.
Cut long, then trim to the finished length on the jig. Never weld a piece short.

`;

for (const s of spec.stock) {
  const plan = planStock(s.id);
  if (plan.pieces.length === 0) continue;

  const totalCut = plan.pieces.reduce((t, p) => t + p.cut, 0);
  const kerfTotal = plan.pieces.length * KERF;
  const stockUsed = plan.bars.length * s.stock_length_mm;
  const waste = stockUsed - totalCut - kerfTotal;

  cutMd += `## ${s.label}\n\n`;
  cutMd += `| ID | Member | From → To | Qty | Cut length | Angle from frame axis |\n`;
  cutMd += `|---|---|---|---|---|---|\n`;

  for (const m of members.filter((m) => m.profile === s.id)) {
    cutMd += `| ${m.id} | ${m.name} | ${m.from} → ${m.to} | ${m.qty} | **${fmt(m.length + ALLOW)} mm** | ${fmt(m.angle)}° |\n`;
  }

  cutMd += `\n**${plan.pieces.length} pieces · ${fmt(totalCut)} mm of cutting · `;
  cutMd += `${plan.bars.length} × ${s.stock_length_mm / 1000} m bar = ${fmt(stockUsed / 1000)} m bought · `;
  cutMd += `${fmt((waste / stockUsed) * 100)}% offcut waste**\n\n`;

  cutMd += `### How to cut it from stock\n\n`;
  cutMd += `Mark and cut in this order so the long pieces come off first and the offcuts stay usable.\n\n`;
  plan.bars.forEach((bar, i) => {
    const list = bar.used.map((p) => `${p.id} ${fmt(p.cut)}`).join(' → ');
    const used = s.stock_length_mm - bar.remaining;
    const leftover = bar.remaining + KERF;
    cutMd += `- **Bar ${i + 1}** (${s.stock_length_mm} mm): ${list}\n  - ${fmt(used)} mm consumed incl. kerf · **${fmt(leftover)} mm offcut left over — label it and keep it**\n`;
  });
  cutMd += `\n`;
}

const grandTotal = members.reduce((t, m) => t + m.length * m.qty, 0);
cutMd += `---

## Totals

- **${members.length} different members, ${members.reduce((t, m) => t + m.qty, 0)} pieces**
- **${fmt(grandTotal / 1000)} m of tube** before allowances and kerf
- ${[...new Set(members.map((m) => m.profile))].length} different profiles to buy

## Before you order anything

1. This list comes from placeholder dimensions. Replace the node table with real measurements first.
2. Confirm the tube sizes against what your local supplier actually stocks (see \`04-02-suppliers-sa.md\`).
3. Re-run this tool, then re-read the numbers. Steel you do not buy is money you did not waste.
`;

writeFileSync(join(ROOT, '04-materials', '04-01-cut-list.md'), cutMd);

/* ------------------------------------------------------------------ */
/* 6. Emit design checks                                              */
/* ------------------------------------------------------------------ */

let chkMd = `# 03-02 — Automatic design checks (v0)

> **GENERATED FILE — do not edit by hand.** Produced by \`node gt09/tools/build.mjs\`.
>
> These checks catch *geometry mistakes* — a member that is too short to hold, a pedal
> box your legs cannot reach, a shoulder that does not fit between the rails.
>
> **They do not check strength.** Nothing in this report tells you the frame is safe to
> sit in, let alone drive. See \`03-01-safety-review.md\`.

Driver model: ${d.stature_mm} mm tall, thigh ${d.thigh_mm} mm, lower leg ${d.lower_leg_mm} mm,
thigh angle ${d.thigh_angle_deg}°, seat recline ${d.seat_recline_deg}°.

| Check | Result | Target | Status |
|---|---|---|---|
`;

for (const c of checks) {
  chkMd += `| ${c.name} | ${c.value} | ${c.target} | ${c.ok ? 'PASS' : '**REVIEW**'} |\n`;
}

chkMd += `\n## Detail\n\n`;
for (const c of checks) {
  chkMd += `### ${c.ok ? 'PASS' : 'REVIEW'} — ${c.name}\n\n${c.detail}\n\n`;
}

chkMd += `## Warnings\n\n`;
chkMd += warnings.length ? warnings.map((w) => `- ${w}`).join('\n') + '\n' : '- None.\n';

chkMd += `
## Computed driver packaging

| Point | x (forward of front axle, rearwards +) | z (above ground) |
|---|---|---|
| H-point (hips) | ${HP[0]} mm | ${HP[2]} mm |
| Knee (computed) | ${fmt(kneeCalc.x)} mm | ${fmt(kneeCalc.z)} mm |
| Ankle (computed) | ${fmt(ankleCalc.x)} mm | ${fmt(ankleCalc.z)} mm |
| Shoulder (computed) | ${fmt(shoulder.x)} mm | ${fmt(shoulder.z)} mm |

## Frame summary

| Dimension | Value |
|---|---|
| Wheelbase (front axle to rear axle) | ${spec.hardpoints.rear_axle[0] - spec.hardpoints.front_axle[0]} mm |
| Rail centre-to-centre width | ${railHalf * 2} mm |
| Rail length | ${fmt(railLenL)} mm |
| Rail top above ground | ${railTopZ} mm |
| Ground clearance under frame | ${fmt(groundClear)} mm |
| Front track (model) | ${spec.layout_for_drawing.front_track_mm} mm |
| Rear track (model) | ${spec.layout_for_drawing.rear_track_mm} mm |
`;

writeFileSync(join(ROOT, '03-engineering', '03-02-design-checks.md'), chkMd);

/* ------------------------------------------------------------------ */
/* 7. Emit plan view SVG                                              */
/* ------------------------------------------------------------------ */

const S = 0.55; // px per mm
const PAD = 70;
const L = spec.layout_for_drawing;

const xs = Object.values(N).map((p) => p[0]).concat([-L.tyre_length_mm / 2]);
const ys = Object.values(N).map((p) => p[1]).concat([
  -L.rear_track_mm / 2 - L.tyre_width_mm,
  L.rear_track_mm / 2 + L.tyre_width_mm,
]);
const minX = Math.min(...xs) - PAD / S;
const maxX = Math.max(...xs) + PAD / S;
const minY = Math.min(...ys) - PAD / S;
const maxY = Math.max(...ys) + PAD / S;

const W = (maxX - minX) * S + PAD * 2;
const H = (maxY - minY) * S + PAD * 2;

// front of the kart at the top of the page
const px = (y) => PAD + (y - minY) * S;
const py = (x) => PAD + (x - minX) * S;

const strokeFor = { 'SQ25x2.0': 9, 'SQ25x1.6': 7, 'SQ20x1.6': 5, 'RD25x2.0': 7 };
const colourFor = { Rails: '#c0392b', Crossmembers: '#1f618d', Diagonals: '#148f77', Risers: '#7d3c98' };

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(W)}" height="${Math.round(H)}" viewBox="0 0 ${Math.round(W)} ${Math.round(H)}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
<rect width="100%" height="100%" fill="#fbfbfd"/>
<text x="${PAD}" y="26" font-size="15" font-weight="700" fill="#172033">GT-09 RACING — Project 1 go-kart chassis, plan view (v0 PLACEHOLDER)</text>
<text x="${PAD}" y="44" font-size="11" fill="#7a8494">Front of kart at top · dimensions in mm · generated from specs/chassis-v0.json · NOT measured, NOT reviewed</text>
`;

// wheels
function wheel(x, y) {
  const w = L.tyre_length_mm * S;
  const h = L.tyre_width_mm * S;
  return `<rect x="${round(px(y) - h / 2)}" y="${round(py(x) - w / 2)}" width="${round(h)}" height="${round(w)}" rx="6" fill="#2c3e50" opacity="0.85"/>`;
}
for (const [ax, tr] of [
  [spec.hardpoints.front_axle[0], L.front_track_mm],
  [spec.hardpoints.rear_axle[0], L.rear_track_mm],
]) {
  svg += wheel(ax, -tr / 2) + wheel(ax, tr / 2) + '\n';
}

// seat outline (rough)
const seatX0 = HP[0] - 140;
const seatX1 = spec.hardpoints.seat_back_top[0];
svg += `<path d="M ${round(px(-200))} ${round(py(seatX0))} L ${round(px(200))} ${round(py(seatX0))} L ${round(px(215))} ${round(py(seatX1))} L ${round(px(-215))} ${round(py(seatX1))} Z" fill="#e67e22" opacity="0.18" stroke="#e67e22" stroke-width="1.5" stroke-dasharray="5 4"/>\n`;
svg += `<text x="${round(px(0))}" y="${round(py((seatX0 + seatX1) / 2))}" font-size="10" fill="#b9770e" text-anchor="middle">SEAT (envelope)</text>\n`;

// members
for (const m of members) {
  const [ax, ay] = N[m.from];
  const [bx, by] = N[m.to];
  svg += `<line x1="${round(px(ay))}" y1="${round(py(ax))}" x2="${round(px(by))}" y2="${round(py(bx))}" stroke="${colourFor[m.group]}" stroke-width="${strokeFor[m.profile]}" stroke-linecap="square" opacity="0.9"/>\n`;
}

// member labels
for (const m of members) {
  const [ax, ay] = N[m.from];
  const [bx, by] = N[m.to];
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  svg += `<text x="${round(px(my))}" y="${round(py(mx)) - 6}" font-size="9" fill="#172033" text-anchor="middle">${m.id}</text>\n`;
}

// nodes
for (const [k, [x, y]] of Object.entries(N)) {
  svg += `<circle cx="${round(px(y))}" cy="${round(py(x))}" r="2.6" fill="#172033"/>\n`;
}

// hardpoints
for (const [k, [x, y]] of Object.entries(spec.hardpoints)) {
  svg += `<circle cx="${round(px(y))}" cy="${round(py(x))}" r="4" fill="none" stroke="#8e44ad" stroke-width="1.6"/>\n`;
  svg += `<text x="${round(px(y)) + 8}" y="${round(py(x)) + 3}" font-size="9" fill="#8e44ad">${k}</text>\n`;
}

// dimension: wheelbase (left side)
const dimX = px(-L.rear_track_mm / 2 - L.tyre_width_mm - 60);
const yF = py(spec.hardpoints.front_axle[0]);
const yR = py(spec.hardpoints.rear_axle[0]);
svg += `<line x1="${round(dimX)}" y1="${round(yF)}" x2="${round(dimX)}" y2="${round(yR)}" stroke="#7a8494" stroke-width="1"/>\n`;
svg += `<line x1="${round(dimX - 5)}" y1="${round(yF)}" x2="${round(dimX + 5)}" y2="${round(yF)}" stroke="#7a8494" stroke-width="1"/>\n`;
svg += `<line x1="${round(dimX - 5)}" y1="${round(yR)}" x2="${round(dimX + 5)}" y2="${round(yR)}" stroke="#7a8494" stroke-width="1"/>\n`;
svg += `<text x="${round(dimX - 8)}" y="${round((yF + yR) / 2)}" font-size="11" fill="#4d5666" text-anchor="middle" transform="rotate(-90 ${round(dimX - 8)} ${round((yF + yR) / 2)})">WHEELBASE ${spec.hardpoints.rear_axle[0] - spec.hardpoints.front_axle[0]}</text>\n`;

// dimension: track (bottom)
const dimY = py(maxX - 30);
svg += `<line x1="${round(px(-L.rear_track_mm / 2))}" y1="${round(dimY)}" x2="${round(px(L.rear_track_mm / 2))}" y2="${round(dimY)}" stroke="#7a8494" stroke-width="1"/>\n`;
svg += `<text x="${round(px(0))}" y="${round(dimY - 6)}" font-size="11" fill="#4d5666" text-anchor="middle">REAR TRACK ${L.rear_track_mm}</text>\n`;

// legend
const legend = [
  ['Rails — 25 x 25 x 2.0', colourFor.Rails],
  ['Crossmembers — 25 x 25 x 1.6', colourFor.Crossmembers],
  ['Diagonals — 20 x 20 x 1.6', colourFor.Diagonals],
  ['Riser — 25 OD round', colourFor.Risers],
  ['Hardpoints (axles, H-point, pedals)', '#8e44ad'],
];
legend.forEach(([label, col], i) => {
  const ly = Math.round(H) - 78 + i * 15;
  svg += `<rect x="${PAD}" y="${ly - 7}" width="16" height="5" fill="${col}"/>\n`;
  svg += `<text x="${PAD + 24}" y="${ly}" font-size="10" fill="#4d5666">${label}</text>\n`;
});

svg += `</svg>\n`;

writeFileSync(join(ROOT, '02-cad', 'chassis-plan-v0.svg'), svg);

/* ------------------------------------------------------------------ */
/* 8. Console report                                                  */
/* ------------------------------------------------------------------ */

console.log(`GT-09 chassis build tool — ${spec.meta.id} [${spec.meta.status}]`);
console.log('='.repeat(64));
console.log(`members: ${members.length}   pieces: ${members.reduce((t, m) => t + m.qty, 0)}   total tube: ${fmt(grandTotal / 1000)} m`);
for (const s of spec.stock) {
  const p = planStock(s.id);
  if (!p.pieces.length) continue;
  console.log(`  ${s.label.padEnd(38)} ${String(p.pieces.length).padStart(2)} pcs  ${p.bars.length} x ${s.stock_length_mm / 1000} m`);
}
console.log('-'.repeat(64));
for (const c of checks) console.log(`  ${c.ok ? 'PASS  ' : 'REVIEW'}  ${c.name.padEnd(36)} ${c.value}  (${c.target})`);
if (warnings.length) {
  console.log('-'.repeat(64));
  warnings.forEach((w) => console.log('  WARN  ' + w.replace(/\*\*/g, '')));
}
console.log('='.repeat(64));
console.log('wrote 04-materials/04-01-cut-list.md, 03-engineering/03-02-design-checks.md, 02-cad/chassis-plan-v0.svg');
