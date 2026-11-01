import React, { useRef, useEffect, useId } from 'react';

export default function FlightAnimation({
  photo = null,
  label = 'A plane flying puppies from Korea to Dubai'
}) {
  const containerRef = useRef(null);
  const routeRef = useRef(null);
  const planeRef = useRef(null);
  const clipId = useId();

  useEffect(() => {
    const updateFlight = (prog) => {
      const route = routeRef.current;
      const plane = planeRef.current;
      if (!route || !plane) return;
      const totalLen = route.getTotalLength();
      const curLen = Math.min(totalLen, Math.max(0, prog * totalLen));
      const pt = route.getPointAtLength(curLen);
      const ptNext = route.getPointAtLength(Math.min(totalLen, curLen + 1));
      const ptPrev = route.getPointAtLength(Math.max(0, curLen - 1));
      const angle = (180 * Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x)) / Math.PI;

      plane.setAttribute(
        'transform',
        `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
      plane.style.opacity = String(Math.min(1, Math.max(0, (prog - 0.11) / 0.06)));
    };

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPos = vh * 0.95;
      const endPos = vh * 0.25;
      const totalSpan = (startPos - endPos) + rect.height;
      const currentPos = startPos - rect.top;
      const prog = Math.min(1, Math.max(0, currentPos / (totalSpan || 1)));
      updateFlight(prog);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="tp-flight">
      <svg viewBox="0 0 660 300" role="img" aria-label={label}>
        <defs>
          <clipPath id={clipId}>
            <circle r="25" />
          </clipPath>
        </defs>
        <path
          ref={routeRef}
          d="M40 250 C 170 40, 470 20, 620 168"
          className="tp-flight__route"
        />
        <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
        <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
        <text x="40" y="284" textAnchor="middle" className="tp-flight__label">Korea</text>
        <text x="620" y="202" textAnchor="middle" className="tp-flight__label">Dubai</text>

        <g ref={planeRef} transform="translate(410 70)">
          <g transform="translate(-126 -78)">
            <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
            <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
            <path
              d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
              className="tp-flight__body"
            />
            <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
            <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
          </g>
          {photo && (
            <g transform="translate(10 2)">
              <image
                href={photo}
                x="-25"
                y="-25"
                width="50"
                height="50"
                clipPath={`url(#${clipId})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle r="25" className="tp-flight__porthole" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
