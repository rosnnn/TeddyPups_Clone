import React, { useEffect, useRef } from "react";
import { PupRig, PupRigController, POSES, TRICKS, createHearts, pickTrick } from "./pupRig";

const PEEK_TRICKS = ["peekaboo", "woof", "tilt", "sneeze"];
const SNUG_TRICKS = ["tilt", "love", "sneeze", "woof"];

export function PupBuddy({
  pose = "sit",
  facing = "right",
  act,
  label,
  className = "",
  style,
  asStop = false
}) {
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const bubble = bubbleRef.current;
    if (!container || !bubble) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    const dir = facing === "left" ? -1 : 1;
    const controller = new PupRigController(svg, pose, dir);
    controller.wag(0.6);

    let schedule = [];
    let lastTime = performance.now() / 1000;
    let lastIdleTrickTime = lastTime;
    let bubbleHideTime = 0;
    let mousePos = null;
    let lastTrick = null;
    let rapidClicks = 0;
    let lastClickTime = 0;

    const ctx = {
      d: controller,
      rest: POSES[pose] || POSES.sit,
      facing: dir,
      say: (msg, duration = 1.4) => {
        bubble.textContent = msg;
        bubble.dataset.show = "true";
        bubbleHideTime = performance.now() / 1000 + duration;
      },
      hearts: () => {
        createHearts(container, container.clientWidth * (dir > 0 ? 0.7 : 0.3), 0.25 * container.clientHeight);
      }
    };

    let isPlaying = false;
    let playingUntil = 0;
    let rafId = null;

    const tick = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      while (schedule.length && schedule[0][0] <= now) {
        schedule.shift()[1](now);
      }

      const activePlaying = now < playingUntil;
      if (isPlaying !== activePlaying) {
        isPlaying = activePlaying;
        container.toggleAttribute("data-playing", isPlaying);
      }

      controller.lookAt(mousePos && now - mousePos.t < 3 ? mousePos : null);

      if (act === "tilt" && !schedule.length) {
        const sinVal = Math.sin(0.9 * now);
        controller.cock(sinVal > 0.35 ? 13 : sinVal < -0.35 ? -10 : 0);
      }

      if (!schedule.length && now - lastIdleTrickTime > 9) {
        lastIdleTrickTime = now;
        schedule = Math.random() < 0.5 ? TRICKS.tilt(ctx, now) : [[now, () => controller.wag(1)], [now + 2.2, () => controller.wag(0.6)]];
      }

      if (bubble.dataset.show === "true" && now > bubbleHideTime) {
        bubble.dataset.show = "false";
      }

      controller.tick(dt, now);
      rafId = requestAnimationFrame(tick);
    };

    let isObserved = false;
    const updateRunning = (intersecting) => {
      if (asStop && document.documentElement.dataset.pup) {
        intersecting = false;
      }
      if (intersecting !== isObserved) {
        isObserved = intersecting;
        if (intersecting) {
          lastTime = performance.now() / 1000;
          if (!rafId) rafId = requestAnimationFrame(tick);
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      updateRunning(entry.isIntersecting);
    });
    observer.observe(container);

    const onPointerMove = (e) => {
      if (e.pointerType === "mouse") {
        mousePos = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const onClick = () => {
      const now = performance.now() / 1000;
      rapidClicks = now - lastClickTime < 0.7 ? rapidClicks + 1 : 1;
      lastClickTime = now;

      const pool = pose === "peek" ? PEEK_TRICKS : pose === "snug" ? SNUG_TRICKS : null;
      const choices = pool?.filter((t) => t !== lastTrick) ?? [];
      const trickName = pool ? choices[Math.floor(Math.random() * choices.length)] : pickTrick(lastTrick, rapidClicks);

      lastTrick = trickName;
      controller.reset();
      const trickSteps = (TRICKS[trickName] || TRICKS.woof)(ctx, now);
      schedule = trickSteps;
      playingUntil = trickSteps[trickSteps.length - 1][0] + 0.4;
      lastIdleTrickTime = now;
    };

    const onPointerEnter = (e) => {
      if (e.pointerType === "mouse") {
        controller.petting(true);
        controller.wag(1);
      }
    };

    const onPointerLeave = () => {
      controller.petting(false);
      controller.wag(0.6);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("click", onClick);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      updateRunning(false);
      container.removeAttribute("data-playing");
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("click", onClick);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, pose, facing, act, asStop]);

  return (
    <div
      ref={containerRef}
      className={`pup-buddy ${className}`}
      style={style}
      data-live={reducedMotion ? undefined : ""}
      data-facing={facing}
    >
      <PupRig pose={pose} facing={facing} label={label} />
      <span ref={bubbleRef} aria-hidden={true} className="pup-bubble" data-show="false" />
    </div>
  );
}

export default PupBuddy;
