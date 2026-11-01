import React, { useEffect, useState } from 'react';

/**
 * StoryRibbon: Silk red/toffee ribbon bookmark that extends from top to bottom
 * along the edge of the storybook page (or modal) as the user scrolls.
 * Replicates the original TeddyPups Next.js StoryRibbon component.
 */
export default function StoryRibbon({ position = 'right', containerRef, isModal = false }) {
  const [scaleY, setScaleY] = useState(0.04);

  useEffect(() => {
    let ticking = false;

    const getScrollTarget = () => {
      if (!containerRef?.current) return window;
      const el = containerRef.current;
      if (el.classList?.contains('overflow-y-auto')) return el;
      return el.closest('.overflow-y-auto') || window;
    };

    const updateProgress = () => {
      let progress = 0;
      const target = getScrollTarget();

      if (target !== window && target) {
        // Scrolled within container (e.g., PuppyModal scrollable body)
        const scrollTop = target.scrollTop;
        const maxScroll = target.scrollHeight - target.clientHeight;
        if (maxScroll > 0) {
          progress = scrollTop / maxScroll;
        }
      } else if (containerRef?.current) {
        // Scrolled within page with article reference
        const el = containerRef.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start extending when top of story reaches 25% of viewport
        const startOffset = windowHeight * 0.25;
        const totalDist = rect.height - (windowHeight - startOffset);
        if (totalDist > 0) {
          const current = startOffset - rect.top;
          progress = current / totalDist;
        }
      } else {
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          progress = scrollY / maxScroll;
        }
      }

      // Bound between 0.04 (initial tip showing) and 1.0 (fully extended)
      const clamped = Math.min(1, Math.max(0.04, progress));
      setScaleY(clamped);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    const scrollTarget = getScrollTarget();
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateProgress();

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  const posClass = isModal
    ? 'tp-ribbon--modal'
    : position === 'left'
    ? 'tp-ribbon--left'
    : 'tp-ribbon--right';

  return (
    <div
      aria-hidden="true"
      className={`tp-ribbon ${posClass}`}
    >
      <div className="tp-ribbon__track">
        <span
          className="tp-ribbon__band"
          style={{
            transform: `scaleY(${scaleY})`,
            transformOrigin: '50% 0',
            transition: 'transform 0.08s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}
