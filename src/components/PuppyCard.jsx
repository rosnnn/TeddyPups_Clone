import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RawSvg({ svgString, className, defaultStyle = {} }) {
  if (!svgString) return null;
  const styleMatch = svgString.match(/style="([^"]*)"/);
  const styleStr = styleMatch ? styleMatch[1] : '';
  const parsedStyle = { ...defaultStyle };
  if (styleStr) {
    styleStr.split(';').forEach((rule) => {
      const [k, v] = rule.split(':').map((s) => s?.trim());
      if (k && v) parsedStyle[k] = v;
    });
  }
  const inner = svgString.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      style={parsedStyle}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

export default function PuppyCard({ pup, index = 0, small = false, onSelect }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.dataset.armed = 'true';
    const timer = setTimeout(() => {
      if (el) el.dataset.revealed = 'true';
    }, 50 + (index % 8) * 60);

    return () => clearTimeout(timer);
  }, [index]);

  const handleClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(pup);
    }
  };

  return (
    <Link
      ref={cardRef}
      to={`/puppies/${pup.slug}`}
      onClick={handleClick}
      className={`tp-sketch${small ? ' tp-sketch--small' : ''}`}
      data-reveal="true"
      style={{
        '--tilt': pup.tilt || '0deg',
        '--d': `${(index % 8) * 70}ms`,
        '--wash': pup.wash || '#f2be6b',
      }}
      aria-label={pup.ariaLabel || `${pup.displayName}, available`}
    >
      <span className="tp-sketch__frame">
        {/* Organic wash behind */}
        <RawSvg svgString={pup.washSvg} className="tp-sketch__wash" />

        {/* Masked Photo with organic SVG mask */}
        <span
          className="tp-sketch__photo"
          style={{
            maskImage: `url("${pup.maskSvg}")`,
            WebkitMaskImage: `url("${pup.maskSvg}")`,
          }}
        >
          <img
            src={pup.cover}
            alt=""
            loading="lazy"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              objectFit: 'cover',
            }}
          />
        </span>

        {/* Hand-drawn ink borders and doodles */}
        <RawSvg svgString={pup.inkSvg} className="tp-sketch__ink" />

        {/* Sticker badges */}
        {!small ? (
          <span className="tp-sketch__sticker font-scrawl">Available</span>
        ) : (
          <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
            gone home ♥
          </span>
        )}

        {/* Video badge */}
        {pup.hasVideo && !small && (
          <span className="tp-sketch__video">▶ video</span>
        )}
      </span>

      <span className="tp-sketch__name font-plush">{pup.displayName}</span>
      {!small && (
        <span className="tp-sketch__meta">
          {pup.breed && `${pup.breed} · `}
          {pup.genderLabel}
          {pup.age && ` · ${pup.age}`}
        </span>
      )}
    </Link>
  );
}
