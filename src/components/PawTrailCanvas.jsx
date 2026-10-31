import React, { useEffect, useRef } from "react";

// Exact SVG path for the paw print stamp
const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" +
  "M19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export function PawTrailCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const path = new Path2D(PAW_PATH);
    const prints = [];
    let dpr = 1;
    let animId = 0;
    let running = false;
    let lastX = NaN;
    let lastY = NaN;
    let dist = 0;
    let sign = 1;

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    onResize();

    const render = (now) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = now - p.born;
        if (age > 1000) {
          prints.splice(i, 1);
          continue;
        }
        const fade = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.42 * fade * fade;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = "#c2622b";
        ctx.fill(path);
      }

      if (prints.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return;
      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dist += Math.hypot(dx, dy);

      if (dist >= 46) {
        dist = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        sign = -sign;
        const offset = 7 * sign;
        prints.push({
          x: e.clientX + Math.cos(angle) * offset + 14,
          y: e.clientY + Math.sin(angle) * offset + 16,
          angle: angle,
          born: performance.now(),
        });

        if (prints.length > 14) prints.shift();

        if (!running) {
          running = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] size-full"
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    />
  );
}

export default PawTrailCanvas;
