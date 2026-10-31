import React from 'react';

// Color palette
export const STROKE = "#2a170e";
export const BODY_FILL = "#f2be6b";
export const EAR_FILL = "#e4a352";
export const MUZZLE_FILL = "#fbe3b4";
export const COLLAR_FILL = "#a24a1a";
export const BLUSH_FILL = "#f9b9a6";

// Canvas & coordinate constants
export const W = 300;
export const R = 240;
export const groundY = 228;
export const eyeY = 98;
export const headCenter = [212, 100];
export const bodyCenter = [196, 206];
export const shoulderNear = [186, 194];
export const shoulderFar = [168, 192];
export const hipNear = [110, 194];
export const hipFar = [94, 192];
export const tailBase = [84, 150];
export const earLeft = [174, 82];
export const earRight = [250, 82];

// Path generator
export function blobPath(cx, cy, rx, ry, segments, variance, startAngle = -Math.PI / 2, rotDeg = 0) {
  const rad = (rotDeg * Math.PI) / 180;
  const pt = (angle, offset) => {
    const x = Math.cos(angle) * (rx + offset);
    const y = Math.sin(angle) * (ry + (ry / rx) * offset);
    return `${(cx + x * Math.cos(rad) - y * Math.sin(rad)).toFixed(1)} ${(cy + x * Math.sin(rad) + y * Math.cos(rad)).toFixed(1)}`;
  };
  let d = "";
  for (let i = 0; i < segments; i++) {
    const a1 = startAngle + (i / segments) * Math.PI * 2;
    const a2 = startAngle + ((i + 1) / segments) * Math.PI * 2;
    const mid = (a1 + a2) / 2;
    d += `${i === 0 ? `M${pt(a1, 0)}` : ""}Q${pt(mid, 2.1 * variance)} ${pt(a2, 0)}`;
  }
  return `${d}Z`;
}

function legPath(width, height) {
  const half = width / 2;
  return `M${-half} -14 C${-half} 4 -12 ${height - 18} -12 ${height - 9} C-12 ${height - 2} -7 ${height} 0 ${height} C9 ${height} 13 ${height - 3} 13 ${height - 9} C13 ${height - 18} ${half} 4 ${half} -14`;
}

export const LEGS = {
  front: legPath(24, groundY - shoulderNear[1]),
  frontFar: legPath(22, groundY - shoulderFar[1]),
  back: legPath(30, groundY - hipNear[1]),
  backFar: legPath(28, groundY - hipFar[1]),
};

export const PATHS = {
  body: blobPath(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: blobPath(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: blobPath(70, 126, 17, 16, 9, 3.2),
  tailStem: "M86 152 C80 146 76 140 74 136",
  haunch: blobPath(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw: "M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z",
  head: blobPath(212, 100, 51, 46, 16, 3.6),
  topknot: blobPath(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: blobPath(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: blobPath(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle: "M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z",
  nose: "M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z",
  mouth: "M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2",
  mouthOpen: "M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z",
  tongue: "M207.6 127.4 Q212 136.6 216.4 127.4 Z",
  collar: "M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z",
  tag: "M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z",
  ledgePaws: "M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z",
  ledgeToes: "M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5",
  shadow: { cx: 150, cy: 230, rx: 92, ry: 7 }
};

export const toeLines = (len) => `M-3.5 ${len - 7} v5 M4.5 ${len - 7} v5`;

const basePose = {
  bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1,
  headX: 0, headY: 0, headRot: 0,
  earL: 0, earR: 0, tail: 0,
  fn: 0, ff: 0, bn: 0, bf: 0,
  sit: 0, eyes: 1, happy: 0, tongue: 0, mouth: 0, front: 0
};

export const POSES = {
  stand: basePose,
  walk: { ...basePose, tail: -6, tongue: 1 },
  sit: { ...basePose, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...basePose, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...basePose, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...basePose, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...basePose, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...basePose, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...basePose, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...basePose, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...basePose, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...basePose, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 }
};

export const defaultMotion = {
  phase: 0, stride: 0, time: 0, wag: 0, gazeX: 0, gazeY: 0, blink: 0, ear: 0
};

const round2 = (v) => Math.round(100 * v) / 100;
const rotStr = (deg, [x, y]) => `rotate(${round2(deg)} ${x} ${y})`;

export function interpolatePose(pA, pB, t) {
  const res = { ...pA };
  for (const k in basePose) {
    res[k] = pA[k] + (pB[k] - pA[k]) * t;
  }
  return res;
}

export function computeFrames(pose, m = defaultMotion) {
  const sinPhase = Math.sin(m.phase);
  const sinPhasePi = Math.sin(m.phase + Math.PI);
  const stepAmp = 20 + 10 * m.stride;
  const bounceWalk = (1 - Math.cos(2 * m.phase)) / 2;
  const isMoving = +(m.stride > 0.01);
  const idleBreathe = Math.sin(2.4 * m.time) * (1 - isMoving);
  const bodyY = pose.bodyY - bounceWalk * (2.5 + 4 * m.stride) * isMoving + 0.6 * idleBreathe;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(m.phase) * isMoving;
  const compBodyRot = -pose.bodyRot;
  const wagAmp = 5 + 17 * m.wag;
  const wagSpeed = 1.2 + 2.6 * m.wag;
  const tailRot = pose.tail + Math.sin(m.time * wagSpeed * Math.PI * 2) * wagAmp;
  const headBounce = -((1 - Math.cos(2 * m.phase - 0.7)) / 2) * (2 + 3 * m.stride) * isMoving + 0.9 * idleBreathe;

  return {
    body: `translate(${round2(pose.bodyX)} ${round2(bodyY)}) ${rotStr(bodyRot, bodyCenter)} translate(${bodyCenter[0]} 0) scale(${round2(pose.stretch)} 1) translate(${-bodyCenter[0]} 0)`,
    fn: `translate(${shoulderNear[0]} ${shoulderNear[1]}) rotate(${round2(pose.fn + compBodyRot + sinPhase * stepAmp * isMoving)})`,
    ff: `translate(${shoulderFar[0]} ${shoulderFar[1]}) rotate(${round2(pose.ff + compBodyRot + sinPhasePi * stepAmp * isMoving)})`,
    bn: `translate(${hipNear[0]} ${hipNear[1]}) rotate(${round2(pose.bn + sinPhasePi * stepAmp * isMoving)})`,
    bf: `translate(${hipFar[0]} ${hipFar[1]}) rotate(${round2(pose.bf + sinPhase * stepAmp * isMoving)})`,
    tail: rotStr(tailRot, tailBase),
    haunch: `translate(0 ${round2(-0.06 * pose.bodyRot)})`,
    head: `translate(${round2(pose.headX)} ${round2(pose.headY + headBounce)}) ${rotStr(pose.headRot + 1.4 * Math.sin(m.phase) * isMoving, headCenter)}`,
    earL: rotStr(pose.earL + m.ear + 4 * Math.sin(2 * m.phase) * isMoving, earLeft),
    earR: rotStr(pose.earR - m.ear - 4 * Math.sin(2 * m.phase) * isMoving, earRight),
    eyes: `translate(${round2(3.4 * m.gazeX)} ${round2(2.6 * m.gazeY)})`,
    blink: `translate(0 ${round2(98 * m.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * m.blink)})`,
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: `translate(${round2(0.6 * pose.bodyX)} 0) scale(${round2(1 - 0.05 * bounceWalk * isMoving)} 1)`,
    shadowOpacity: round2(0.12 * (1 - pose.front))
  };
}

// Rig Part Renderer
function RigPart({ part, d, len, fill, transform, opacity }) {
  const strokeProps = { stroke: STROKE, strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" };
  const lineProps = { ...strokeProps, fill: "none" };
  return (
    <g data-p={part} transform={transform} opacity={opacity}>
      <path d={`${d}Z`} fill={fill} />
      <path d={d} {...lineProps} />
      <path d={toeLines(len)} {...lineProps} strokeWidth={2.4} />
    </g>
  );
}

// Rig Eye Highlights Renderer
function EyeHighlights() {
  return (
    <>
      <ellipse cx={194} cy={eyeY} rx={7.4} ry={8.6} fill={STROKE} />
      <ellipse cx={230} cy={eyeY} rx={7.4} ry={8.6} fill={STROKE} />
      <circle cx={196.6} cy={eyeY - 3.4} r={2.7} fill="#fff" />
      <circle cx={232.6} cy={eyeY - 3.4} r={2.7} fill="#fff" />
      <circle cx={192} cy={eyeY + 3.2} r={1.2} fill="#fff" />
      <circle cx={228} cy={eyeY + 3.2} r={1.2} fill="#fff" />
    </>
  );
}

// Main SVG Puppy Rig Component
export function PupRig({ pose = "sit", facing = "right", className = "", label, style }) {
  const pData = POSES[pose] || POSES.sit;
  const f = computeFrames(pData);
  const rootTransform = facing === "left" ? `translate(${W} 0) scale(-1 1)` : undefined;
  const strokeProps = { stroke: STROKE, strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" };
  const lineProps = { ...strokeProps, fill: "none" };

  return (
    <svg
      viewBox={`0 0 ${W} ${R}`}
      className={className}
      style={{ overflow: "visible", ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={!label || undefined}
      focusable="false"
    >
      <g data-p="root" transform={rootTransform}>
        <ellipse
          data-p="shadow"
          cx={PATHS.shadow.cx}
          cy={PATHS.shadow.cy}
          rx={PATHS.shadow.rx}
          ry={PATHS.shadow.ry}
          fill={STROKE}
          opacity={f.shadowOpacity}
          transform={f.shadow}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <g data-p="body" transform={f.body} opacity={f.side}>
          <RigPart part="bf" d={LEGS.backFar} len={groundY - 192} fill={EAR_FILL} transform={f.bf} opacity={f.backLegs} />
          <RigPart part="ff" d={LEGS.frontFar} len={groundY - 192} fill={EAR_FILL} transform={f.ff} />
          <g data-p="tail" transform={f.tail}>
            <path d={PATHS.tailStem} {...lineProps} strokeWidth={9} />
            <path d={PATHS.tailStem} stroke={BODY_FILL} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d={PATHS.tail} fill={BODY_FILL} {...strokeProps} />
          </g>
          <RigPart part="bn" d={LEGS.back} len={groundY - 194} fill={BODY_FILL} transform={f.bn} opacity={f.backLegs} />
          <path d={PATHS.body} fill={BODY_FILL} {...strokeProps} />
          <path d={PATHS.chest} fill={BODY_FILL} {...strokeProps} />
          <RigPart part="fn" d={LEGS.front} len={groundY - 194} fill={BODY_FILL} transform={f.fn} />
        </g>
        <g data-p="haunch" opacity={f.haunchOpacity} transform={f.haunch}>
          <path d={PATHS.haunch} fill={BODY_FILL} {...strokeProps} />
          <path d={PATHS.haunchPaw} fill={BODY_FILL} {...strokeProps} />
          <path d="M132 222v5M139 222v5" {...lineProps} strokeWidth={2.4} />
        </g>
        <g data-p="head" transform={f.head}>
          <path d={PATHS.collar} fill={COLLAR_FILL} {...strokeProps} strokeWidth={3} />
          <path d={PATHS.tag} fill={MUZZLE_FILL} {...strokeProps} strokeWidth={2.4} />
          <path data-p="earL" d={PATHS.earL} fill={EAR_FILL} {...strokeProps} transform={f.earL} />
          <path data-p="earR" d={PATHS.earR} fill={EAR_FILL} {...strokeProps} transform={f.earR} />
          <path d={PATHS.head} fill={BODY_FILL} {...strokeProps} />
          <path d={PATHS.topknot} fill={BODY_FILL} {...strokeProps} strokeWidth={3} />
          <path d={PATHS.muzzle} fill={MUZZLE_FILL} />
          <circle cx={181} cy={116} r={7} fill={BLUSH_FILL} opacity={0.85} />
          <circle cx={243} cy={116} r={7} fill={BLUSH_FILL} opacity={0.85} />
          <g data-p="eyes" transform={f.eyes}>
            <g data-p="open" opacity={f.openEyes}>
              <g data-p="blink" transform={f.blink}>
                <EyeHighlights />
              </g>
            </g>
          </g>
          <path data-p="happy" d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101" {...lineProps} opacity={f.happyEyes} />
          <path data-p="shut" d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" {...lineProps} opacity={f.shutEyes} />
          <path d={PATHS.nose} fill={STROKE} />
          <path d={PATHS.mouth} {...lineProps} strokeWidth={3} />
          <path data-p="tongue" d={PATHS.tongue} fill="#e98c8c" stroke={STROKE} strokeWidth={2.2} strokeLinejoin="round" opacity={f.tongue} />
          <g data-p="mouth" opacity={f.mouth}>
            <path d={PATHS.mouthOpen} fill="#6b2a1c" {...strokeProps} strokeWidth={2.6} />
            <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" />
          </g>
        </g>
        <g data-p="ledge" opacity={f.ledge}>
          <path d={PATHS.ledgePaws} fill={BODY_FILL} {...strokeProps} />
          <path d={PATHS.ledgeToes} {...lineProps} strokeWidth={2.4} />
        </g>
      </g>
    </svg>
  );
}

// Controller property bindings
const PROP_BINDINGS = [
  ["root", "transform", "root"],
  ["shadow", "transform", "shadow"],
  ["shadow", "opacity", "shadowOpacity"],
  ["body", "transform", "body"],
  ["body", "opacity", "side"],
  ["bf", "transform", "bf"],
  ["bf", "opacity", "backLegs"],
  ["bn", "transform", "bn"],
  ["bn", "opacity", "backLegs"],
  ["ff", "transform", "ff"],
  ["fn", "transform", "fn"],
  ["tail", "transform", "tail"],
  ["haunch", "transform", "haunch"],
  ["haunch", "opacity", "haunchOpacity"],
  ["head", "transform", "head"],
  ["earL", "transform", "earL"],
  ["earR", "transform", "earR"],
  ["eyes", "transform", "eyes"],
  ["open", "opacity", "openEyes"],
  ["blink", "transform", "blink"],
  ["happy", "opacity", "happyEyes"],
  ["shut", "opacity", "shutEyes"],
  ["tongue", "opacity", "tongue"],
  ["mouth", "opacity", "mouth"],
  ["ledge", "opacity", "ledge"]
];

const damp = (t, tau) => 1 - Math.exp(-t / tau);
const clamp = (v, min = -1, max = 1) => Math.max(min, Math.min(max, v));

export class PupRigController {
  constructor(svg, initialPose = "sit", facing = 1) {
    this.svg = svg;
    this.els = new Map();
    this.written = new Map();
    this.m = { ...defaultMotion };
    this.strideTarget = 0;
    this.wagTarget = 0.35;
    this.gazeTarget = { x: 0, y: 0 };
    this.tilt = 0;
    this.tiltTarget = 0;
    this.earV = 0;
    this.nextBlink = 1.2;
    this.blinkAt = -1;
    this.woofUntil = 0;
    this.bounce = 0;
    this.bounceV = 0;
    this.offset = 0;
    this.offsetTarget = 0;
    this.pet = 0;
    this.petTarget = 0;
    this.turn = 0.07;
    this.lean = 0;

    svg.querySelectorAll("[data-p]").forEach((el) => {
      this.els.set(el.dataset.p, el);
    });

    this.pose = { ...(POSES[initialPose] || POSES.sit) };
    this.target = this.pose;
    this.facing = facing;
    this.facingTarget = facing;
  }

  setPose(p) {
    this.target = typeof p === "string" ? POSES[p] || POSES.sit : p;
  }

  jump(p, facing) {
    const targetPose = POSES[p] || POSES.sit;
    this.pose = { ...targetPose };
    this.target = targetPose;
    if (facing) {
      this.facing = this.facingTarget = facing;
    }
  }

  face(dir, speed = 0.07) {
    this.facingTarget = dir;
    this.turn = speed;
  }

  get facingDir() {
    return this.facingTarget;
  }

  stride(v) {
    this.strideTarget = clamp(v, 0, 1);
  }

  advance(d) {
    this.m.phase += (d / 46) * Math.PI;
  }

  walkedTo(d) {
    this.m.phase = (d / 46) * Math.PI;
  }

  wag(v) {
    this.wagTarget = clamp(v, 0, 1);
  }

  cock(deg) {
    this.tiltTarget = deg;
  }

  lookAt(point) {
    if (!point) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const eyeBaseX = this.facingTarget > 0 ? headCenter[0] : W - headCenter[0];
    const originX = rect.left + (eyeBaseX / W) * rect.width;
    const originY = rect.top + (eyeY / R) * rect.height;
    const dx = point.x - originX;
    const dy = point.y - originY;
    const dist = Math.hypot(dx, dy) || 1;
    const mag = Math.min(1, dist / 160);
    this.gazeTarget = {
      x: (dx / dist) * mag * this.facingTarget,
      y: (dy / dist) * mag
    };
  }

  woof(time) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(scale = 1) {
    this.earV += 220 * scale;
  }

  hop(scale = 1) {
    this.bounceV = -230 * scale;
    this.earV += 200 * scale;
  }

  yawn(time, dur = 0.9) {
    this.woofUntil = time + dur;
  }

  dash(dist) {
    this.offsetTarget = dist;
  }

  petting(isPet) {
    this.petTarget = +!!isPet;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dt, time) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;

    this.pose = interpolatePose(this.pose, this.target, damp(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * damp(dt, this.turn);

    m.stride += (this.strideTarget - m.stride) * damp(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;

    m.wag += (this.wagTarget - m.wag) * damp(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * damp(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * damp(dt, 0.07);

    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * damp(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clamp(m.ear + this.earV * dt, -28, 28);

    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * damp(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) {
      this.offset = this.offsetTarget;
    }
    const dOffset = Math.abs(this.offset - prevOffset);
    if (dOffset) this.advance(dOffset);

    const speedStride = dt > 0 ? Math.min(1, dOffset / dt / 180) : 0;
    this.pet += (this.petTarget - this.pet) * damp(dt, 0.15);

    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }

    const blinkProg = (time - this.blinkAt) / 0.15;
    m.blink = blinkProg >= 0 && blinkProg <= 1 ? Math.sin(blinkProg * Math.PI) : 0;

    const activePose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet)
    };

    const frames = computeFrames(activePose, speedStride > m.stride ? { ...m, stride: speedStride } : m);
    const scaleX = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(${W / 2} 0) scale(${scaleX.toFixed(3)} 1) translate(${-W / 2} 0)`;

    for (const [partName, attr, frameKey] of PROP_BINDINGS) {
      const el = this.els.get(partName);
      if (!el) continue;
      const val = frameKey === "root" ? rootTransform : String(frames[frameKey]);
      const cacheKey = `${partName}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

// Trick Schedules & Floating Hearts
const flipDir = (d) => (d === 1 ? -1 : 1);
const TRICK_NAMES = ["woof", "spin", "beg", "bow", "hop", "love", "tilt", "sneeze"];
let trickQueue = [];

export const TRICKS = {
  woof: ({ d, say }, t) => [
    [t, (cur) => { d.woof(cur); say("woof!"); }],
    [t + 0.42, (cur) => { d.woof(cur); say("woof woof!"); }]
  ],
  spin: ({ d, rest, facing, say }, t) => [
    [t, () => { d.setPose("stand"); d.hop(0.5); }],
    [t + 0.14, () => d.face(flipDir(facing))],
    [t + 0.38, () => d.face(facing)],
    [t + 0.62, () => d.face(flipDir(facing))],
    [t + 0.86, () => { d.face(facing); say("wheee!"); }],
    [t + 1.3, () => d.setPose(rest)]
  ],
  beg: ({ d, rest, say }, t) => [
    [t, () => { d.setPose("beg"); d.wag(1); say("treat, please?", 1.7); }],
    [t + 1.9, () => { d.setPose(rest); d.wag(0.7); }]
  ],
  bow: ({ d, rest, say }, t) => [
    [t, () => { d.setPose("bow"); d.wag(1); say("play with me!"); }],
    [t + 0.55, () => d.hop(0.45)],
    [t + 1.7, () => { d.setPose(rest); d.wag(0.7); }]
  ],
  hop: ({ d, rest, say }, t) => [
    [t, () => { d.setPose("hop"); d.hop(1.1); say("boing!"); }],
    [t + 0.36, () => d.setPose(rest)],
    [t + 0.62, () => { d.setPose("hop"); d.hop(0.8); }],
    [t + 0.98, () => d.setPose(rest)]
  ],
  love: ({ d, rest, say, hearts }, t) => [
    [t, () => { d.setPose({ ...rest, happy: 1, tongue: 1 }); d.wag(1); hearts(); say("I like you!", 1.5); }],
    [t + 1.9, () => { d.setPose(rest); d.wag(0.7); }]
  ],
  tilt: ({ d, say }, t) => [
    [t, () => { d.cock(-14); say("hm?"); }],
    [t + 0.8, () => d.cock(12)],
    [t + 1.6, () => d.cock(0)]
  ],
  sneeze: ({ d, say }, t) => [
    [t, () => d.cock(-8)],
    [t + 0.32, (cur) => { d.cock(10); d.jolt(1.4); d.hop(0.35); d.yawn(cur, 0.22); say("achoo!"); }],
    [t + 0.8, () => d.cock(0)]
  ],
  zoomies: ({ d, rest, facing, say }, t) => [
    [t, () => { d.setPose("walk"); d.wag(1); say("zoomies!", 2); }],
    [t + 0.05, () => { d.face(1); d.dash(70); }],
    [t + 0.5, () => { d.face(-1); d.dash(-70); }],
    [t + 0.98, () => { d.face(1); d.dash(50); }],
    [t + 1.4, () => { d.face(-1); d.dash(-30); }],
    [t + 1.78, () => { d.face(1); d.dash(0); }],
    [t + 2.25, () => { d.face(facing); d.setPose(rest); d.wag(0.7); }]
  ],
  peekaboo: ({ d, say }, t) => [
    [t, () => d.setPose({ ...POSES.peek, headY: 120 })],
    [t + 0.55, () => { d.setPose("peek"); d.jolt(1.2); say("peekaboo!"); }]
  ],
  wake: ({ d, rest, say }, t) => [
    [t, (cur) => { d.setPose("settle"); d.yawn(cur, 0.9); say("*yaaawn*"); }],
    [t + 1.25, () => { d.setPose({ ...POSES.settle, happy: 1 }); d.wag(0.8); say("five more minutes…", 1.6); }],
    [t + 3.1, () => { d.setPose(rest); d.wag(0); say("zzz", 2); }]
  ]
};

export function createHearts(container, x, y) {
  for (let s = 0; s < 5; s++) {
    const el = document.createElement("span");
    el.className = "pup-heart";
    el.textContent = "♥";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    container.append(el);
    const dx = (Math.random() - 0.5) * 90;
    const dy = -70 - 60 * Math.random();
    el.animate(
      [
        { transform: "translate(-50%, 0) scale(0.4)", opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: `translate(calc(-50% + ${dx.toFixed(0)}px), ${dy.toFixed(0)}px) scale(1.1)`, opacity: 0 }
      ],
      {
        duration: 1150 + 110 * s,
        delay: 80 * s,
        easing: "cubic-bezier(.2,.7,.3,1)",
        fill: "backwards"
      }
    ).finished.then(() => el.remove(), () => el.remove());
  }
}

export function pickTrick(lastTrick, clickCount) {
  if (clickCount >= 4) return "zoomies";
  if (!trickQueue.length) {
    trickQueue = TRICK_NAMES.filter((name) => name !== lastTrick).sort(() => Math.random() - 0.5);
  }
  return trickQueue.pop();
}
