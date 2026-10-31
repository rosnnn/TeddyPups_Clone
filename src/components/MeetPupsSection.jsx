import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PupStop from './pup/PupStop';

const DOOR_COLORS = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" +
  "M19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default function MeetPupsSection({ puppies }) {
  const pinRangeRef = useRef(null);
  const trackRef = useRef(null);
  const hallRef = useRef(null);
  const stageRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Measure and layout calculations
  useLayoutEffect(() => {
    const update = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(desktop);

      const track = trackRef.current;
      const hall = hallRef.current;
      const stage = stageRef.current;

      if (desktop && track && hall && stage) {
        const head = stage.querySelector(".tp-meet__head");
        const plates = [...track.querySelectorAll(".tp-door__plate")];
        const plateH = Math.max(64, ...plates.map((p) => p.offsetHeight || 64));
        const floorH = hall.querySelector(".tp-meet__floor")?.offsetHeight || 0;
        const headH = head ? (head.offsetTop || 0) + (head.offsetHeight || 0) : 0;
        const availableH = stage.clientHeight - headH - floorH - plateH - 40;
        const doorW = Math.max(
          128,
          Math.min(256, 0.15 * window.innerWidth, availableH / 1.3)
        );
        hall.style.setProperty("--door-w", `${doorW.toFixed(0)}px`);
        const dist = Math.max(0, track.scrollWidth - window.innerWidth + 0.38 * window.innerWidth);
        setScrollDistance(dist);
      } else {
        hall?.style.removeProperty("--door-w");
        setScrollDistance(0);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    if (hallRef.current) ro.observe(hallRef.current);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [puppies]);

  // Scroll listener for treadmill pinning and door sliding
  useEffect(() => {
    if (!isDesktop || !scrollDistance) return;

    let targetX = 0;
    let currentX = 0;
    let animId = null;

    const onScroll = () => {
      const pinEl = pinRangeRef.current;
      if (!pinEl) return;
      const rect = pinEl.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      targetX = -progress * scrollDistance;
    };

    const render = () => {
      // Spring smoothing
      currentX += (targetX - currentX) * 0.16;

      const track = trackRef.current;
      const hall = hallRef.current;

      if (track) {
        track.style.transform = `translateX(${currentX.toFixed(1)}px)`;
      }
      if (hall) {
        hall.style.setProperty("--floor-x", `${currentX.toFixed(1)}px`);
      }

      // Check doors opening as they scroll past 36% of viewport
      if (track) {
        const threshold = 0.36 * window.innerWidth;
        const children = track.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const shouldOpen = child.offsetLeft + currentX < threshold;
          if ((child.dataset.open === "true") !== shouldOpen) {
            child.dataset.open = String(shouldOpen);
            if (shouldOpen) {
              window.dispatchEvent(
                new CustomEvent("pup:cue", { detail: { look: child, secs: 1.1 } })
              );
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop, scrollDistance]);

  return (
    <div data-section="meet">
      <section
        aria-labelledby="meet-title"
        className="tp-scene tp-meet"
        data-pup-scene="true"
        data-tone="light"
        data-pinned={isDesktop ? "true" : undefined}
        style={{
          '--sky-top': '#fff1d8',
          '--sky-bottom': '#fbe3b4'
        }}
      >
        <div
          ref={pinRangeRef}
          data-pin-range="true"
          style={{
            height: isDesktop ? `calc(100vh + ${Math.round(0.8 * scrollDistance)}px)` : undefined,
            '--pinned': isDesktop ? 1 : 0
          }}
        >
          <div ref={stageRef} className="tp-meet__stage">
            <header className="tp-meet__head gutter">
              <div>
                <h2 className="font-plush text-huge" id="meet-title">
                  Meet the pups
                </h2>
                <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>
              <Link className="btn btn-primary shrink-0" to="/puppies">
                See all available puppies
              </Link>
            </header>

            <div ref={hallRef} className="tp-meet__hall">
              <ol
                ref={trackRef}
                className="tp-meet__track"
                data-treadmill="true"
                aria-label="Puppies looking for a family"
              >
                {puppies.map((pup, index) => (
                  <li
                    key={pup.slug}
                    className="tp-door"
                    data-open={isDesktop ? "false" : "true"}
                  >
                    <Link
                      className="tp-door__link"
                      to={`/puppies/${pup.slug}`}
                      style={{ '--door': DOOR_COLORS[index % DOOR_COLORS.length] }}
                    >
                      <span className="tp-door__plate">
                        <span className="font-plush tp-door__name">{pup.name}</span>
                        <span className="tp-door__meta">
                          {pup.breed ? `${pup.breed}, ` : ''}{pup.gender ? `${pup.gender}, ` : ''}{pup.age}
                          {pup.hasVideo ? ', with video' : ''}
                        </span>
                      </span>
                      <span className="tp-door__frame">
                        <span className="tp-door__room">
                          <img
                            alt={`${pup.name}, ${pup.gender} ${pup.breed} puppy`}
                            src={pup.coverImage || pup.image}
                            loading="lazy"
                            sizes="(min-width: 1024px) 15rem, 44vw"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                          />
                        </span>
                        <span aria-hidden="true" className="tp-door__way">
                          <span className="tp-door__leaf">
                            <svg aria-hidden="true" className="tp-door__peephole" fill="currentColor" viewBox="0 0 64 64">
                              <path d={PAW_PATH}></path>
                            </svg>
                            <span className="tp-door__knob"></span>
                          </span>
                        </span>
                        <span className="tp-door__tag font-scrawl">Available</span>
                      </span>
                    </Link>
                  </li>
                ))}

                <li className="tp-door tp-door--all" data-open="true">
                  <Link className="tp-door__link" to="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </Link>
                </li>
              </ol>

              <div aria-hidden="true" className="tp-meet__floor"></div>

              {/* Mascot Center Dog Stop: Hall Treadmill */}
              <PupStop
                pose={isDesktop ? "walk" : "sit"}
                act={isDesktop ? "treadmill" : undefined}
                facing="right"
                className="tp-meet__teddy"
                label="Teddy walking in the puppy hallway"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
