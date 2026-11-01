import React, { useEffect, useRef } from "react";
import { PupRig, PupRigController, POSES, TRICKS, createHearts, pickTrick, W } from "./pupRig";

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" +
  "M19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

const PUP_ORIGIN = { x: 150, y: 228 };
const DEFAULT_BOX = [48, 30, 288, 236];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (v) => v * v * (3 - 2 * v);
const smoothBetween = (min, max, val) =>
  max === min ? +(val >= max) : smoothstep(clamp01((val - min) / (max - min)));
const lerp = (a, b, t) => a + (b - a) * t;

function getStopPoint(stop, scrollY) {
  const track = stop.track;
  const top =
    track.kind === "page"
      ? track.top - scrollY
      : track.kind === "screen"
      ? track.top
      : scrollY < track.from
      ? track.top - (scrollY - track.from)
      : scrollY > track.to
      ? track.top - (scrollY - track.to)
      : track.top;
  return {
    x: stop.x + PUP_ORIGIN.x * stop.s,
    y: top + PUP_ORIGIN.y * stop.s
  };
}

function findSegment(holds, scrollY) {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let i = 0; i < holds.length - 1; i++) {
    const endHold = holds[i][1];
    const nextStartHold = holds[i + 1][0];
    if (scrollY < nextStartHold) {
      return {
        k: i,
        t: clamp01((scrollY - endHold) / Math.max(1, nextStartHold - endHold))
      };
    }
    if (scrollY <= holds[i + 1][1]) {
      return { k: i + 1, t: 0 };
    }
  }
  return { k: holds.length - 1, t: 0 };
}

const softMax = (val, min, margin) => {
  const diff = (val - min) / margin;
  return diff > 20 ? val : min + margin * Math.log1p(Math.exp(diff));
};
const softClamp = (val, max, margin) => -softMax(-val, -max, margin);

function constrainWithin(x, y, scale, box, safeArea, margin = 8) {
  const leftMargin = (PUP_ORIGIN.x - box[0]) * scale;
  const rightMargin = (box[2] - PUP_ORIGIN.x) * scale;
  const topMargin = (PUP_ORIGIN.y - box[1]) * scale;
  const bottomMargin = (box[3] - PUP_ORIGIN.y) * scale;

  let resX = x;
  if (safeArea.right - safeArea.left > leftMargin + rightMargin) {
    resX = softClamp(
      softMax(x, safeArea.left + leftMargin, margin),
      safeArea.right - rightMargin,
      margin
    );
  } else {
    resX = (safeArea.left + safeArea.right) / 2 - (rightMargin - leftMargin) / 2;
  }

  let resY = y;
  if (safeArea.bottom - safeArea.top > topMargin + bottomMargin) {
    resY = softClamp(
      softMax(y, safeArea.top + topMargin, margin),
      safeArea.bottom - bottomMargin,
      margin
    );
  } else {
    resY = safeArea.bottom - bottomMargin;
  }

  return { x: resX, y: resY };
}

const lerpBox = (bA, bB, t) => [
  lerp(bA[0], bB[0], t),
  lerp(bA[1], bB[1], t),
  lerp(bA[2], bB[2], t),
  lerp(bA[3], bB[3], t)
];

const cubicBezier = (p0, c1, c2, p1, t) => {
  const it = 1 - t;
  const it3 = it * it * it;
  const it2t = 3 * it * it * t;
  const itt2 = 3 * it * t * t;
  const t3 = t * t * t;
  return {
    x: it3 * p0.x + it2t * c1.x + itt2 * c2.x + t3 * p1.x,
    y: it3 * p0.y + it2t * c1.y + itt2 * c2.y + t3 * p1.y
  };
};

const POSE_BOXES = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236]
};
const getBox = (pose) => POSE_BOXES[pose] ?? DEFAULT_BOX;
const peekSinkY = PUP_ORIGIN.y - 159;
const STOP_P_MOBILE = [0.6, 0.86];
const STOP_P_DESKTOP = [0.42, 0.78];
const RANDOM_TRICKS = ["jump", "woof", "love", "sneeze"];

const setDataset = (el, attr, val) => {
  if (el.dataset[attr] !== val) el.dataset[attr] = val;
};

export function cuePup(detail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pup:cue", { detail }));
  }
}

export function PupJourney() {
  const layerRef = useRef(null);
  const actorRef = useRef(null);
  const actorBodyRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleAtRef = useRef(null);
  const printsRef = useRef(null);
  const probeRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const layer = layerRef.current;
    const actor = actorRef.current;
    const actorBody = actorBodyRef.current;
    const bubble = bubbleRef.current;
    const bubbleAt = bubbleAtRef.current;
    const prints = printsRef.current;
    const probe = probeRef.current;
    if (!layer || !actor || !actorBody || !bubble || !bubbleAt || !prints || !probe) return;

    const svg = actorBody.querySelector("svg");
    const docEl = document.documentElement;
    let plan = null;
    let controller = null;
    let isLive = false;
    const printSvgs = [...prints.children];
    let printIdx = 0;
    let bubbleHideTime = 0;

    const say = (msg, time, duration = 1.4) => {
      bubble.textContent = msg;
      bubble.dataset.show = "true";
      bubbleHideTime = time + duration;
    };

    let mousePos = null;
    let lookTarget = null;

    const onPointerMove = (e) => {
      if (e.pointerType === "mouse") {
        mousePos = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const onCue = (e) => {
      const detail = e.detail;
      if (!detail) return;
      const now = performance.now() / 1000;
      if (detail.look) {
        lookTarget = { el: detail.look, until: now + (detail.secs ?? 1.5) };
        controller?.cock(14);
        say("hm?", now, 1.4);
      }
      if (detail.say) say(detail.say, now, 1.5);
    };

    const onFocusIn = (e) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("a, button, input, textarea, select, summary")) {
        lookTarget = { el: t, until: performance.now() / 1000 + 1.4 };
      }
    };

    let lastTime = performance.now() / 1000;
    let prevScrollY = window.scrollY;
    let prevPos = null;
    let curState = null;
    let smoothOffset = { x: 0, y: 0, s: 0 };
    let stationaryTime = 0;
    let curStopIdx = -1;
    let stopEnterTime = 0;
    let lastInteractTime = 0;
    let trickSchedule = [];
    let lookInterval = 0;
    let lookIdx = -1;
    let lastTreadmillLeft = null;
    let treadmillIdle = 0;
    let lastPrintIdx = -1;
    let lastPrintStep = 0;
    let nextBasketAction = 0;
    let lastScrollMotionTime = performance.now() / 1000;
    let scrollDir = 1;
    let prevSnapping = false;
    let screenSmoothPos = null;
    let lastAnchorY = 0;
    let totalWalked = 0;
    let screenTopOffset = 0;

    const getBottomSafeArea = () => {
      const waBar = document.querySelector("[data-whatsapp-bar]");
      const rect = waBar?.getClientRects().length ? waBar.getBoundingClientRect() : null;
      return rect && rect.height ? rect.top : window.innerHeight - 6;
    };

    const siteHeader = document.getElementById("site-header");

    const buildPlan = () => {
      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse) and (max-height: 519px)").matches;
      const clientW = docEl.clientWidth;
      const clientH = probe.getBoundingClientRect().height || window.innerHeight;
      const headerH = siteHeader?.offsetHeight ?? 76;
      const waBar = document.querySelector("[data-whatsapp-bar]");
      const safeArea = {
        left: 10,
        top: headerH + 10,
        right: clientW - 10,
        bottom: clientH - 10 - (waBar?.getClientRects().length ? waBar.getBoundingClientRect().height : 0)
      };
      const mainEl = document.getElementById("main");
      const stops = [];
      const meta = [];
      const holds = [];

      const processStop = (el) => {
        const rect = el.getBoundingClientRect();
        const pose = el.dataset.pose || "sit";
        const act = el.dataset.act ?? "";
        const rawScale = rect.width / 300;
        const scale = act === "basket" || isMobile ? rawScale : 1.12 * rawScale;
        const anchor = pose === "peek" ? { x: PUP_ORIGIN.x, y: 159 } : PUP_ORIGIN;

        const findPin = (element, r) => {
          let stickyParent = null;
          for (let p = element.parentElement; p && p !== document.body; p = p.parentElement) {
            if (getComputedStyle(p).position === "sticky") {
              stickyParent = p;
              break;
            }
          }
          if (!stickyParent) return { kind: "page", top: r.top + window.scrollY };
          const stickyTop = parseFloat(getComputedStyle(stickyParent).top) || 0;
          const deltaTop = r.top - stickyParent.getBoundingClientRect().top;
          const origPos = stickyParent.style.position;
          stickyParent.style.position = "relative";
          const sRect = stickyParent.getBoundingClientRect();
          const pEl = stickyParent.parentElement;
          const pBottom = pEl.getBoundingClientRect().bottom - (parseFloat(getComputedStyle(pEl).paddingBottom) || 0);
          stickyParent.style.position = origPos;
          const fromY = sRect.top + window.scrollY - stickyTop;
          const toY = pBottom + window.scrollY - sRect.height - stickyTop;
          return toY <= fromY
            ? { kind: "page", top: sRect.top + window.scrollY + deltaTop }
            : { kind: "pin", top: stickyTop + deltaTop, from: fromY, to: toY };
        };

        const track = findPin(el, rect);
        if (track.kind !== "screen") {
          track.top += anchor.y * (rawScale - scale);
        }

        const stopObj = {
          x: rect.left + anchor.x * (rawScale - scale),
          track,
          s: scale,
          behind: el.dataset.behind === "true",
          sink: 0,
          box: getBox(pose)
        };

        const sceneEl = el.closest("[data-pup-scene]");
        stops.push(stopObj);
        meta.push({
          scene: sceneEl,
          pose,
          facing: el.dataset.facing === "left" ? -1 : 1,
          act,
          looks: sceneEl ? [...sceneEl.querySelectorAll("[data-pup-look]")] : [],
          track: act === "treadmill" ? sceneEl?.querySelector("[data-treadmill]") ?? null : null
        });

        // Compute hold range
        const calcHold = (st, safe, pRange) => {
          if (st.track.kind === "pin") return [st.track.from, st.track.to];
          const top = st.track.top;
          const bTop = top + st.box[1] * st.s;
          const bBottom = top + st.box[3] * st.s;
          const mid = (bTop + bBottom) / 2;
          const safeH = safe.bottom - safe.top;
          let minHold = mid - (safe.top + pRange[1] * safeH);
          let maxHold = mid - (safe.top + pRange[0] * safeH);
          minHold = Math.max(minHold, bBottom - safe.bottom);
          maxHold = Math.min(maxHold, bTop - safe.top);
          if (minHold > maxHold) minHold = maxHold = mid - (safe.top + safeH / 2);
          return [minHold, maxHold];
        };

        let holdRange = calcHold(stopObj, safeArea, isMobile ? STOP_P_MOBILE : STOP_P_DESKTOP);
        if (!isMobile && sceneEl && stopObj.track.kind === "page" && act !== "basket" && act !== "peekaboo") {
          const safeH = safeArea.bottom - safeArea.top;
          const sceneTop = sceneEl.getBoundingClientRect().top + window.scrollY - safeArea.top + 0.08 * safeH;
          const stopBottom = stopObj.track.top + stopObj.box[3] * stopObj.s - safeArea.bottom;
          if (holdRange[1] > sceneTop) {
            const clampScene = Math.max(sceneTop, stopBottom + 0.12 * safeH);
            holdRange = [Math.max(stopBottom, clampScene - Math.max(holdRange[1] - holdRange[0], 0.2 * safeH)), clampScene];
          }
        }
        holds.push(holdRange);
      };

      const stopEls = [...document.querySelectorAll("[data-pup-stop]")].filter((e) => e.getClientRects().length);
      if (isMobile) {
        const laneStops = stopEls.filter((e) => e.dataset.lane === "true");
        const first = laneStops[0];
        const last = laneStops.length > 1 ? laneStops[laneStops.length - 1] : undefined;
        if (first) processStop(first);

        const firstScene = meta[0]?.scene ?? null;
        const mainScenes = [...document.querySelectorAll("#main [data-pup-scene]")].filter(
          (e) => e !== firstScene && e.getClientRects().length
        );
        const mobileScale = Math.min(0.62, Math.max(0.5, clientW / 650));
        const peekBox = getBox("peek");

        mainScenes.forEach((scene, i) => {
          const isLeft = i % 2 === 0;
          const posX = isLeft ? safeArea.left + 2 - peekBox[0] * mobileScale : safeArea.right - 2 - peekBox[2] * mobileScale;
          stops.push({
            x: posX,
            track: { kind: "screen", top: 0 },
            s: mobileScale,
            behind: false,
            sink: peekSinkY,
            box: peekBox
          });
          meta.push({
            scene,
            pose: "peek",
            facing: isLeft ? 1 : -1,
            act: "lane",
            looks: [],
            track: null
          });
          const sRect = scene.getBoundingClientRect();
          const startY = sRect.top + window.scrollY - 0.42 * clientH;
          const endY = sRect.bottom + window.scrollY - 0.58 * clientH;
          holds.push(startY <= endY ? [startY, endY] : [(startY + endY) / 2, (startY + endY) / 2]);
        });

        if (last) processStop(last);
      } else {
        stopEls.forEach(processStop);
      }

      const maxScroll = docEl.scrollHeight - window.innerHeight;

      const travelGaps = stops.slice(1).map((st, idx) => {
        const prevSt = stops[idx];
        const travelY = (STOP_P_DESKTOP[1] - STOP_P_DESKTOP[0]) * clientH;
        const minTravel = isMobile ? Math.max(0.48 * clientH, 380) : 0.5 * clientH;
        const prevX = prevSt.x + PUP_ORIGIN.x * prevSt.s;
        const curX = st.x + PUP_ORIGIN.x * st.s;
        return Math.min(1.4 * clientH, Math.max(minTravel, 1.15 * Math.hypot(Math.abs(curX - prevX), travelY)));
      });

      const resolveHolds = (rawHolds, gaps, maxS) => {
        const getGap = (idx) => (typeof gaps === "number" ? gaps : gaps[idx] ?? 0);
        const n = rawHolds.map((h) => (h[0] <= h[1] ? [h[0], h[1]] : [(h[0] + h[1]) / 2, (h[0] + h[1]) / 2]));
        if (!n.length) return n;
        n[0][0] = -Infinity;
        const lastH = n[n.length - 1];
        lastH[1] = Infinity;
        lastH[0] = Math.min(lastH[0], maxS - 1);

        for (let i = 0; i < n.length - 1; i++) {
          const curH = n[i];
          const nextH = n[i + 1];
          if (nextH[0] < curH[1]) {
            const mid = (curH[1] + nextH[0]) / 2;
            curH[1] = Math.max(curH[0], mid);
            nextH[0] = Math.min(nextH[1], mid);
            if (nextH[0] < curH[1]) nextH[0] = curH[1];
          }
          let deficit = getGap(i) - (nextH[0] - curH[1]);
          if (deficit > 0) {
            const redCur = Math.min(deficit / 2, curH[1] - curH[0]);
            const incNext = Math.min(deficit / 2, nextH[1] - nextH[0]);
            curH[1] -= redCur;
            nextH[0] += incNext;
            deficit -= redCur + incNext;
            const extraNext = Math.min(deficit, nextH[1] - nextH[0]);
            nextH[0] += extraNext;
            deficit -= extraNext;
            if (deficit > 0) {
              curH[1] -= Math.min(deficit, curH[1] - curH[0]);
            }
          }
        }

        for (const h of n) {
          if (h[1] < h[0]) h[1] = h[0];
        }
        return n;
      };

      const resolvedHolds = resolveHolds(holds, travelGaps, maxScroll);

      return {
        lane: isMobile,
        stops,
        meta,
        holds: resolvedHolds,
        blend: 0.12 * clientH,
        mainTop: mainEl ? mainEl.getBoundingClientRect().top + window.scrollY : 0
      };
    };

    const evalJourney = (planObj, scrollY) => {
      if (planObj.lane) {
        const bottomY = getBottomSafeArea();
        for (const stop of planObj.stops) {
          if (stop.track.kind === "screen") {
            stop.track.top = bottomY - 159 * stop.s;
          }
        }
      }

      const { k, t } = findSegment(planObj.holds, scrollY);
      const safe = planObj.lane
        ? { left: 10, top: (siteHeader?.offsetHeight ?? 76) + 10, right: docEl.clientWidth - 10, bottom: getBottomSafeArea() + 40 }
        : { left: 10, top: (siteHeader?.offsetHeight ?? 76) + 10, right: docEl.clientWidth - 10, bottom: Math.min(window.innerHeight, getBottomSafeArea()) - 10 };

      if (t <= 0 || k >= planObj.stops.length - 1) {
        const stop = planObj.stops[k];
        const pt = getStopPoint(stop, scrollY);
        const constrained = constrainWithin(pt.x, pt.y, stop.s, stop.box, safe);
        return {
          x: constrained.x,
          y: constrained.y,
          s: stop.s,
          front: !stop.behind,
          airborne: false,
          k,
          t: 0,
          walked: 0
        };
      }

      const stA = planObj.stops[k];
      const stB = planObj.stops[k + 1];
      const holdEndA = planObj.holds[k][1];
      const holdStartB = planObj.holds[k + 1][0];
      const range = Math.max(1, holdStartB - holdEndA);
      const prog = clamp01((scrollY - holdEndA) / range);
      const ptA = getStopPoint(stA, holdEndA);
      const ptB = getStopPoint(stB, holdStartB);

      const makeBezier = (p0, p1, sf) => {
        const dx = p1.x - p0.x;
        const width = sf.right - sf.left;
        const curveDist = Math.max(0.45 * Math.abs(dx), 0);
        const sign = dx >= 0 ? 1 : -1;
        let c1 = { x: p0.x + sign * curveDist, y: p0.y };
        let c2 = { x: p1.x - sign * curveDist, y: p1.y };
        const threshold = 0.14 * width;
        if (Math.abs(dx) < threshold) {
          const side = ((p0.x + p1.x) / 2 < (sf.left + sf.right) / 2 ? 1 : -1) * (threshold - Math.abs(dx)) * 0.9;
          c1 = { x: c1.x + side, y: lerp(p0.y, p1.y, 0.2) };
          c2 = { x: c2.x + side, y: lerp(p0.y, p1.y, 0.8) };
        }
        const clampSafe = (pt) => ({
          x: Math.min(sf.right, Math.max(sf.left, pt.x)),
          y: Math.min(sf.bottom, Math.max(sf.top, pt.y))
        });
        return { p0, c1: clampSafe(c1), c2: clampSafe(c2), p1 };
      };

      const bez = makeBezier({ x: ptA.x, y: ptA.y - stA.sink * stA.s }, { x: ptB.x, y: ptB.y - stB.sink * stB.s }, safe);
      const easeT = prog * prog * prog * (prog * (6 * prog - 15) + 10);
      const bezPt = cubicBezier(bez.p0, bez.c1, bez.c2, bez.p1, easeT);
      const scale = lerp(stA.s, stB.s, smoothstep(clamp01(prog / 0.65)));

      const blendMargin = Math.min(0.3, Math.max(0.06, planObj.blend / range));
      const blendA = 1 - smoothBetween(0, blendMargin, prog);
      const blendB = smoothBetween(1 - blendMargin, 1, prog);
      let posX = bezPt.x;
      let posY = bezPt.y + blendA * (getStopPoint(stA, scrollY).y - ptA.y) + blendB * (getStopPoint(stB, scrollY).y - ptB.y);

      posY += stA.sink * stA.s * (1 - smoothBetween(0, 0.22, prog)) + stB.sink * stB.s * smoothBetween(0.78, 1, prog);

      let isAirborne = false;
      if (stA.behind && prog < 0.36) {
        posY -= Math.sin((prog / 0.36) * Math.PI) * Math.min(64 * stA.s, 72);
        isAirborne = prog < 0.32;
      }
      if (stB.behind && prog > 0.68) {
        posY -= Math.sin(((prog - 0.68) / 0.32) * Math.PI) * Math.min(56 * stB.s, 60);
        isAirborne = true;
      }
      if (stA.sink && prog < 0.2) isAirborne = true;

      const isFront = !(stA.behind && prog < 0.12 || stB.behind && prog > 0.92);
      const activeBox = prog < 0.5
        ? lerpBox(stA.box, DEFAULT_BOX, smoothBetween(0, stA.sink ? 0.22 : stA.behind ? 0.36 : 0.06, prog))
        : lerpBox(DEFAULT_BOX, stB.box, smoothBetween(stB.sink ? 0.78 : stB.behind ? 0.68 : 0.94, 1, prog));

      const constrained = constrainWithin(posX, posY, scale, activeBox, safe);

      // Walked distance along bezier
      let walkedDist = 0;
      let prevSample = bez.p0;
      const samples = Math.max(1, Math.ceil(32 * clamp01(easeT)));
      for (let s = 1; s <= samples; s++) {
        const samplePt = cubicBezier(bez.p0, bez.c1, bez.c2, bez.p1, (s / samples) * clamp01(easeT));
        walkedDist += Math.hypot(samplePt.x - prevSample.x, samplePt.y - prevSample.y);
        prevSample = samplePt;
      }

      return {
        x: constrained.x,
        y: constrained.y,
        s: scale,
        front: isFront,
        airborne: isAirborne,
        k,
        t: prog,
        walked: walkedDist
      };
    };

    let rafId = null;

    const tickFrame = () => {
      if (!plan || !controller) return;
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      const curScroll = window.scrollY;
      const dScroll = curScroll - prevScrollY;
      prevScrollY = curScroll;
      if (Math.abs(dScroll) > 0.5) {
        lastScrollMotionTime = now;
        scrollDir = dScroll > 0 ? 1 : -1;
      }

      while (trickSchedule.length && trickSchedule[0][0] <= now) {
        trickSchedule.shift()[1](now);
      }

      const snapScroll = (stops, holds, curSc) => {
        const { k: s, t: n } = findSegment(holds, curSc);
        if (n <= 0 || s >= stops.length - 1) return curSc;
        const stA = stops[s];
        const stB = stops[s + 1];
        const threshA = stA?.sink ? 0.22 : 0.36 * (stA?.behind ? 1 : 0);
        const threshB = stB?.sink ? 0.78 : stB?.behind ? 0.68 : 1;
        let d = n;
        if (n < threshA) {
          d = n < threshA / 2 ? 0 : threshA;
        } else if (n > threshB) {
          d = n > (1 + threshB) / 2 ? 1 : threshB;
        }
        return d === n ? curSc : holds[s][1] + d * (holds[s + 1][0] - holds[s][1]);
      };

      const targetScroll = now - lastScrollMotionTime > 0.25 ? snapScroll(plan.stops, plan.holds, curScroll) : curScroll;
      const evalState = evalJourney(plan, targetScroll);

      const stCur = plan.stops[evalState.k];
      const stNext = evalState.t > 0 ? plan.stops[evalState.k + 1] : stCur;
      const isScreenStop = plan.lane && (stCur?.track.kind === "screen" && stNext?.track.kind === "screen");

      const decay = Math.exp(-dt / 0.28);
      smoothOffset.x *= decay;
      smoothOffset.y *= decay;
      smoothOffset.s *= decay;
      if (Math.abs(smoothOffset.x) < 0.05) smoothOffset.x = 0;
      if (Math.abs(smoothOffset.y) < 0.05) smoothOffset.y = 0;

      const isSnapping = targetScroll !== curScroll;
      if (isSnapping !== prevSnapping && prevPos && !isScreenStop) {
        smoothOffset.x = prevPos.x - evalState.x;
        smoothOffset.y = prevPos.y - evalState.y;
      }
      prevSnapping = isSnapping;

      const renderScale = evalState.s + smoothOffset.s;
      let renderX = evalState.x + smoothOffset.x;
      let renderY = evalState.y + smoothOffset.y;
      const bottomAnchor = plan.lane ? getBottomSafeArea() : 0;
      let isArrived = true;

      if (isScreenStop) {
        if (!screenSmoothPos) {
          screenSmoothPos = prevPos ? { x: prevPos.x, y: prevPos.y - lastAnchorY } : { x: renderX, y: renderY - bottomAnchor };
        }
        const smoothRate = 1 - Math.exp(-dt / (plan.lane ? 0.20 : 0.14));
        screenSmoothPos.x += (renderX - screenSmoothPos.x) * smoothRate;
        screenSmoothPos.y += (renderY - bottomAnchor - screenSmoothPos.y) * smoothRate;
        isArrived = Math.hypot(renderX - screenSmoothPos.x, renderY - bottomAnchor - screenSmoothPos.y) < 1.5;
        renderX = screenSmoothPos.x;
        renderY = bottomAnchor + screenSmoothPos.y;
      } else {
        if (screenSmoothPos) {
          smoothOffset.x = (prevPos?.x ?? renderX) - evalState.x;
          smoothOffset.y = (prevPos?.y ?? renderY) - evalState.y;
          renderX = evalState.x + smoothOffset.x;
          renderY = evalState.y + smoothOffset.y;
          screenSmoothPos = null;
        }
      }
      lastAnchorY = bottomAnchor;

      curState = { ...evalState, x: renderX, y: renderY, s: renderScale };
      setDataset(layer, "anchor", isScreenStop ? "bottom" : "top");
      screenTopOffset = isScreenStop ? layer.getBoundingClientRect().top : 0;

      const atStop = evalState.t === 0 && isArrived;
      const stopIndex = evalState.k;

      if (atStop) {
        if (curStopIdx !== stopIndex) {
          const stopMeta = plan.meta[stopIndex];
          curStopIdx = stopIndex;
          stopEnterTime = now;
          lastInteractTime = now;
          lastTreadmillLeft = null;
          controller.reset();
          controller.setPose(stopMeta.pose);
          controller.face(stopMeta.facing, 0.14);
          controller.stride(0);
          controller.wag(stopMeta.act === "basket" ? 0.3 : 0.7);
          controller.jolt(0.4);
          nextBasketAction = now + 2.4;
          if (stopMeta.act === "treadmill") {
            say("coming!", now, 1.4);
          }
        }

        const meta = plan.meta[stopIndex];
        if (meta.track && !trickSchedule.length) {
          const tLeft = meta.track.getBoundingClientRect().left;
          const dtLeft = lastTreadmillLeft === null ? 0 : tLeft - lastTreadmillLeft;
          lastTreadmillLeft = tLeft;
          controller.walkedTo(-tLeft / renderScale);
          if (Math.abs(dtLeft) > 0.15) {
            treadmillIdle = 0;
            controller.setPose("walk");
            controller.stride(1);
            controller.face(dtLeft < 0 ? 1 : -1, 0.16);
          } else if ((treadmillIdle += dt) > 0.25) {
            controller.setPose("stand");
            controller.stride(0);
          }
        }

        if (meta.act === "tilt" && !trickSchedule.length && now - stopEnterTime > 1.2) {
          const sVal = Math.sin(0.9 * now);
          controller.cock(sVal > 0.35 ? 13 : sVal < -0.35 ? -10 : 0);
        }

        if (meta.act === "basket" && !trickSchedule.length && now > nextBasketAction) {
          nextBasketAction = now + 4.5 + 3 * Math.random();
          if (Math.random() < 0.7) controller.jolt(0.55);
          else controller.yawn(now, 0.7);
        }

        const hasActiveFocus = (lookTarget && lookTarget.until > now) || (mousePos && now - mousePos.t < 2.5);
        if (meta.looks.length && !hasActiveFocus && now - stopEnterTime > 0.8 && now - lookInterval > 1.7) {
          lookInterval = now;
          lookIdx = (lookIdx + 1) % (meta.looks.length + 1);
          if (lookIdx < meta.looks.length) {
            lookTarget = { el: meta.looks[lookIdx], until: now + 1.4 };
          }
        }

        if (!trickSchedule.length && !meta.track && meta.act !== "basket" && now - lastInteractTime > 3.5) {
          lastInteractTime = now;
          const trickCtx = {
            d: controller,
            rest: POSES[meta.pose],
            facing: meta.facing,
            say: (m, d) => say(m, performance.now() / 1000, d),
            hearts: () => {
              if (curState) {
                createHearts(
                  layer,
                  curState.x - PUP_ORIGIN.x * curState.s + (controller.facingDir > 0 ? 212 : W - 212) * curState.s,
                  curState.y - (PUP_ORIGIN.y - 40) * curState.s - screenTopOffset
                );
              }
            }
          };
          trickSchedule = Math.random() < 0.65 ? TRICKS.tilt(trickCtx, now) : [[now, () => controller.wag(1)], [now + 2.4, () => controller.wag(0.7)]];
        }
      } else {
        if (curStopIdx !== -1) {
          curStopIdx = -1;
          trickSchedule = [];
          controller.reset();
        }

        const movedDist = prevPos ? Math.hypot(renderX - prevPos.x, renderY - prevPos.y) : 0;
        stationaryTime = movedDist > 0.25 ? 0 : stationaryTime + dt;

        let isAir = evalState.airborne;
        if (plan.lane && evalState.t > 0) {
          const stA = plan.stops[stopIndex];
          const stB = plan.stops[stopIndex + 1];
          if (stA?.sink && evalState.t < 0.22) isAir = scrollDir > 0;
          else if (stB?.sink && evalState.t > 0.78) isAir = scrollDir < 0;
        }

        if (isAir) {
          controller.setPose("hop");
          controller.stride(0);
        } else if (stationaryTime > 0.3) {
          controller.setPose("stand");
          controller.stride(0);
          if (stationaryTime > 2.6 && stationaryTime - dt <= 2.6) {
            say("coming?", now, 1.4);
          }
        } else {
          controller.setPose("walk");
          controller.stride(1);
        }

        const walkDivisor = plan.lane ? 28 : 46;
        controller.walkedTo((isScreenStop ? (totalWalked += movedDist * 1.35) : evalState.walked) / Math.max(0.05, renderScale * (walkDivisor / 46)));

        if (prevPos) {
          const dx = renderX - prevPos.x;
          if (Math.abs(dx) > 0.6 && Math.abs(dx) > 0.35 * Math.abs(renderY - prevPos.y)) {
            controller.face(dx > 0 ? 1 : -1, 0.16);
          }
        }

        // Paw print stamping
        if (!plan.lane) {
          const stepNum = Math.floor(evalState.walked / (34 * renderScale));
          if (lastPrintIdx === stopIndex && stepNum !== lastPrintStep && !evalState.airborne && prevPos) {
            const isAlt = stepNum & 1;
            const legX = isAlt ? 186 : 110;
            const pupLeft = renderX - PUP_ORIGIN.x * renderScale;
            const pupTop = renderY - PUP_ORIGIN.y * renderScale;
            const footX = pupLeft + (controller.facingDir > 0 ? legX : W - legX) * renderScale;
            const footY = pupTop + 226 * renderScale + curScroll - plan.mainTop + (isAlt ? -4 : 4) * renderScale;
            const angle = Math.atan2(renderY - prevPos.y + dScroll, renderX - prevPos.x) + Math.PI / 2;
            const printSize = 14 * Math.max(0.75, 1.5 * renderScale);
            const pSvg = printSvgs[printIdx++ % printSvgs.length];
            pSvg.style.transform = `translate(${(footX - printSize / 2).toFixed(1)}px, ${(footY - printSize / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
            pSvg.style.width = pSvg.style.height = `${printSize.toFixed(1)}px`;
            pSvg.animate(
              [{ opacity: 0 }, { opacity: 0.45, offset: 0.08 }, { opacity: 0.45, offset: 0.5 }, { opacity: 0 }],
              { duration: 2600, easing: "ease-out" }
            );
          }
          lastPrintIdx = stopIndex;
          lastPrintStep = stepNum;
        }
      }

      prevPos = { x: renderX, y: renderY };

      // Update scene attributes
      plan.meta.forEach((meta, idx) => {
        if (meta.scene) {
          setDataset(meta.scene, "here", String(atStop && idx === stopIndex));
          setDataset(meta.scene, "visited", String(idx <= stopIndex || (idx === stopIndex + 1 && evalState.t > 0.92)));
        }
      });

      // Gaze tracking
      if (lookTarget && lookTarget.until > now) {
        const lRect = lookTarget.el.getBoundingClientRect();
        controller.lookAt({ x: lRect.left + lRect.width / 2, y: lRect.top + lRect.height / 2 });
      } else if (mousePos && now - mousePos.t < 2.5) {
        controller.lookAt(mousePos);
      } else {
        controller.lookAt(null);
      }

      // Apply actor styles
      actor.style.transform = `translate3d(${(renderX - PUP_ORIGIN.x * renderScale).toFixed(2)}px, ${(renderY - PUP_ORIGIN.y * renderScale - screenTopOffset).toFixed(2)}px, 0)`;
      actorBody.style.transform = `scale(${renderScale.toFixed(4)})`;
      setDataset(layer, "front", String(evalState.front));
      setDataset(actor, "holding", String(atStop));

      if (bubble.dataset.show === "true") {
        if (now > bubbleHideTime) {
          bubble.dataset.show = "false";
        }
        const bubbleX = (controller.facingDir > 0 ? 214 : W - 214) * renderScale;
        bubbleAt.style.transform = `translate(${bubbleX.toFixed(1)}px, ${(30 * renderScale).toFixed(1)}px)`;
      }

      controller.tick(dt, now);
      rafId = requestAnimationFrame(tickFrame);
    };

    let clickCount = 0;
    let lastClickAt = 0;
    let lastUserTrick = null;

    const onActorClick = () => {
      if (!controller || !plan) return;
      const now = performance.now() / 1000;
      clickCount = now - lastClickAt < 0.7 ? clickCount + 1 : 1;
      lastClickAt = now;
      lastInteractTime = now;

      const trickCtx = {
        d: controller,
        rest: POSES[curStopIdx >= 0 ? plan.meta[curStopIdx].pose : "sit"] || POSES.sit,
        facing: controller.facingDir,
        say: (m, d) => say(m, performance.now() / 1000, d),
        hearts: () => {
          if (curState) {
            createHearts(
              layer,
              curState.x - PUP_ORIGIN.x * curState.s + (controller.facingDir > 0 ? 212 : W - 212) * curState.s,
              curState.y - (PUP_ORIGIN.y - 40) * curState.s - screenTopOffset
            );
          }
        }
      };

      if (curStopIdx < 0) {
        const pool = RANDOM_TRICKS.filter((t) => t !== lastUserTrick);
        const trickName = pool[Math.floor(Math.random() * pool.length)];
        lastUserTrick = trickName;
        trickSchedule =
          trickName === "jump"
            ? [[now, () => { controller.hop(1.35); trickCtx.say(["wheee!", "boing!", "yip!"][Math.floor(Math.random() * 3)]); }], [now + 0.5, () => controller.hop(0.7)]]
            : trickName === "woof"
            ? [[now, (t) => { controller.woof(t); trickCtx.say("woof!"); }], [now + 0.4, (t) => controller.woof(t)]]
            : trickName === "love"
            ? [[now, () => { controller.wag(1); controller.hop(0.5); trickCtx.hearts(); trickCtx.say("I like you!"); }]]
            : [[now, (t) => { controller.jolt(1.4); controller.hop(0.4); controller.yawn(t, 0.22); trickCtx.say("achoo!"); }]];
        return;
      }

      const meta = plan.meta[curStopIdx];
      let tName;
      if (meta.track) {
        const pool = ["woof", "hop", "love"].filter((t) => t !== lastUserTrick);
        tName = pool[Math.floor(Math.random() * pool.length)];
      } else if (meta.act === "basket") {
        const pool = ["tilt", "love", "sneeze", "woof"].filter((t) => t !== lastUserTrick);
        tName = pool[Math.floor(Math.random() * pool.length)];
      } else if (meta.pose === "peek") {
        const pool = ["peekaboo", "woof", "tilt", "sneeze"].filter((t) => t !== lastUserTrick);
        tName = pool[Math.floor(Math.random() * pool.length)];
      } else {
        tName = pickTrick(lastUserTrick, clickCount);
        if (tName === "zoomies") tName = "spin";
      }

      lastUserTrick = tName;
      controller.reset();
      trickSchedule = (TRICKS[tName] || TRICKS.woof)(trickCtx, now);
    };

    const onActorPointerEnter = (e) => {
      if (e.pointerType === "mouse" && controller && curStopIdx >= 0) {
        controller.petting(true);
        controller.wag(1);
      }
    };

    const onActorPointerLeave = () => {
      if (controller) {
        controller.petting(false);
        if (curStopIdx >= 0) {
          controller.wag(plan?.meta[curStopIdx]?.act === "basket" ? 0.3 : 0.7);
        }
      }
    };

    const startJourney = () => {
      if (isLive) return;
      const newPlan = buildPlan();
      if (newPlan.stops.length < 2) return;
      plan = newPlan;
      isLive = true;
      docEl.dataset.pup = newPlan.lane ? "lane" : "live";
      layer.hidden = false;

      const firstMeta = newPlan.meta[0];
      controller = new PupRigController(svg, firstMeta.pose, firstMeta.facing);
      prevScrollY = window.scrollY;
      prevPos = null;
      lastScrollMotionTime = lastTime = performance.now() / 1000;

      const initialPos = evalJourney(newPlan, window.scrollY);
      if (initialPos.k === 0 && initialPos.t === 0 && firstMeta.act === "peekaboo") {
        curStopIdx = 0;
        stopEnterTime = lastTime;
        const peekDown = { ...POSES.peek, headY: 120 };
        const friends = firstMeta.scene?.querySelectorAll("[data-pup-friend]") ?? [];
        const fFirst = friends[0];
        const fLast = friends[friends.length - 1];
        trickSchedule = [
          [lastTime + 0.1, () => controller.setPose(peekDown)],
          [lastTime + 0.7, (t) => { controller.setPose("peek"); controller.jolt(1.2); say("peekaboo!", t, 1.6); }],
          [lastTime + 1.5, (t) => fFirst && (lookTarget = { el: fFirst, until: t + 0.8 })],
          [lastTime + 2.3, (t) => fLast && (lookTarget = { el: fLast, until: t + 0.8 })],
          [lastTime + 3.1, () => { lookTarget = null; controller.wag(1); }]
        ];
      } else {
        curStopIdx = -1;
      }

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pup:cue", onCue);
      window.addEventListener("focusin", onFocusIn);
      actor.addEventListener("click", onActorClick);
      actor.addEventListener("pointerenter", onActorPointerEnter);
      actor.addEventListener("pointerleave", onActorPointerLeave);

      if (!rafId) rafId = requestAnimationFrame(tickFrame);
    };

    const stopJourney = () => {
      if (!isLive) return;
      isLive = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      delete docEl.dataset.pup;
      layer.hidden = true;
      delete layer.dataset.anchor;
      screenTopOffset = 0;
      plan?.meta.forEach((m) => {
        if (m.scene) {
          delete m.scene.dataset.here;
          delete m.scene.dataset.visited;
        }
      });
      plan = null;
      controller = null;
      curStopIdx = -1;

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pup:cue", onCue);
      window.removeEventListener("focusin", onFocusIn);
      actor.removeEventListener("click", onActorClick);
      actor.removeEventListener("pointerenter", onActorPointerEnter);
      actor.removeEventListener("pointerleave", onActorPointerLeave);
    };

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isLive || !plan) {
          startJourney();
          return;
        }
        const updatedPlan = buildPlan();
        if (updatedPlan.stops.length < 2) return stopJourney();
        const oldState = curState;
        const laneChanged = updatedPlan.lane !== plan.lane;
        plan = updatedPlan;
        docEl.dataset.pup = updatedPlan.lane ? "lane" : "live";
        if (laneChanged) curStopIdx = -1;
        if (oldState) {
          const evalPos = evalJourney(updatedPlan, window.scrollY);
          smoothOffset.x = oldState.x - evalPos.x;
          smoothOffset.y = oldState.y - evalPos.y;
          smoothOffset.s = oldState.s - evalPos.s;
        }
      }, 120);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(onResize);

    startJourney();
    const t1 = setTimeout(startJourney, 150);
    const t2 = setTimeout(startJourney, 600);

    return () => {
      stopJourney();
      clearTimeout(resizeTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  return (
    <>
      <div ref={probeRef} aria-hidden={true} className="pup-probe" />
      <div ref={printsRef} aria-hidden={true} className="pup-prints">
        {Array.from({ length: 24 }, (_, a) => (
          <svg viewBox="0 0 64 64" key={a}>
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden={true} className="pup-layer" hidden={true} data-front="true">
        <div ref={actorRef} className="pup-actor">
          <div ref={actorBodyRef} className="pup-actor__body">
            <PupRig pose="peek" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}

export default PupJourney;
