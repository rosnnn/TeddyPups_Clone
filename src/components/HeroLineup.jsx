import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SEATS = [
  [9, 8.6, 0.62, -5],
  [22.5, 10.4, 0.8, 3],
  [35, 9.2, 0.7, -2],
  [65, 9.4, 0.74, 3],
  [77.5, 10.6, 0.82, -3],
  [91, 8.4, 0.6, 4]
];

const INTERVALS = [1900, 2500, 1700, 2300, 2000, 2800, 1800];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroLineup({ friends }) {
  const count = Math.min(SEATS.length, friends.length);
  const [seats, setSeats] = useState(() => friends.slice(0, count).map((_, i) => i));
  const [states, setStates] = useState({});
  const [showingTag, setShowingTag] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [wing, setWing] = useState(friends.length > count ? count : null);

  const lineupRef = useRef(null);
  const seatsRef = useRef(seats);
  useEffect(() => {
    seatsRef.current = seats;
  }, [seats]);

  useEffect(() => {
    const el = lineupRef.current;
    if (!el || friends.length <= count) return;

    let isIntersecting = true;
    let lastInteract = 0;
    const timers = [];
    const addTimeout = (fn, ms) => timers.push(setTimeout(fn, ms));

    const obs = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.35 });
    obs.observe(el);

    const onUserActivity = () => {
      lastInteract = performance.now() + 1200;
    };
    window.addEventListener('scroll', onUserActivity, { passive: true });
    window.addEventListener('pointerdown', onUserActivity, { passive: true });
    el.addEventListener('pointerover', onUserActivity, { passive: true });

    let unplaced = friends.map((_, i) => i).filter((i) => !seatsRef.current.includes(i));
    let queue = unplaced.includes(count) ? [count, ...shuffle(unplaced.filter((i) => i !== count))] : shuffle(unplaced);
    let seatOrder = [];
    let lastSeat = -1;
    let stepCount = 0;

    const tickSwap = () => {
      const now = performance.now();
      if (document.hidden || !isIntersecting || now <= lastInteract) {
        return addTimeout(tickSwap, 900);
      }

      if (!queue.length) {
        queue = shuffle(friends.map((_, i) => i).filter((i) => !seatsRef.current.includes(i)));
      }

      if (!seatOrder.length) {
        seatOrder = shuffle([0, 1, 2, 3, 4, 5].filter((s) => s !== lastSeat));
      }

      const seatToSwap = seatOrder.shift();
      if (seatToSwap === undefined) return addTimeout(tickSwap, 2000);
      lastSeat = seatToSwap;

      const nextPup = queue.shift();
      setStates((prev) => ({ ...prev, [seatToSwap]: 'duck' }));

      addTimeout(() => {
        const oldPup = seatsRef.current[seatToSwap];
        setSeats((prev) => prev.map((val, idx) => (idx === seatToSwap ? nextPup : val)));
        queue.push(oldPup);
        setWing(queue[0] ?? null);

        setStates((prev) => ({ ...prev, [seatToSwap]: 'pop' }));
        setShowingTag(seatToSwap);

        // Cue center mascot dog to look over and tilt head saying 'hm?'
        const popEl = lineupRef.current?.querySelectorAll('.tp-lineup__pup')[seatToSwap];
        if (popEl) {
          window.dispatchEvent(new CustomEvent('pup:cue', { detail: { look: popEl, secs: 1.4 } }));
        }

        addTimeout(() => {
          setShowingTag((cur) => (cur === seatToSwap ? null : cur));
        }, 1800);

        addTimeout(() => {
          setStates((prev) => ({ ...prev, [seatToSwap]: undefined }));
        }, 700);
      }, 360);

      addTimeout(tickSwap, INTERVALS[stepCount++ % INTERVALS.length]);
    };

    addTimeout(tickSwap, 2200);

    return () => {
      timers.forEach(clearTimeout);
      obs.disconnect();
      window.removeEventListener('scroll', onUserActivity);
      window.removeEventListener('pointerdown', onUserActivity);
      el.removeEventListener('pointerover', onUserActivity);
    };
  }, [friends, count]);

  return (
    <>
      <ul ref={lineupRef} className="tp-lineup" aria-label="Some of the puppies in our showroom">
        {seats.map((pupIdx, seatIdx) => {
          const pup = friends[pupIdx];
          if (!pup) return null;
          const [x, w, peek, tilt] = SEATS[seatIdx];
          const style = {
            '--x': `${x}%`,
            '--w': `${w}rem`,
            '--peek': peek,
            '--tilt': `${tilt}deg`,
            '--i': seatIdx,
          };
          return (
            <li key={seatIdx} className="tp-lineup__seat" style={style}>
              <Link
                to={`/puppies/${pup.slug}`}
                className="tp-lineup__pup"
                data-pup-friend="true"
                data-state={states[seatIdx]}
                aria-label={`Meet ${pup.name}, ${pup.breed}`}
                onPointerEnter={(e) => {
                  setHoveredTag(seatIdx);
                  window.dispatchEvent(new CustomEvent('pup:cue', { detail: { look: e.currentTarget, secs: 1.4 } }));
                }}
                onPointerLeave={() => setHoveredTag(null)}
                onFocus={(e) => {
                  setHoveredTag(seatIdx);
                  window.dispatchEvent(new CustomEvent('pup:cue', { detail: { look: e.currentTarget, secs: 1.4 } }));
                }}
                onBlur={() => setHoveredTag(null)}
              >
                <span className="tp-lineup__photo">
                  <img
                    alt={`${pup.name}, ${pup.breed} puppy`}
                    src={pup.coverImage || pup.image}
                    loading="eager"
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
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Name Tags Overlay */}
      <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
        {seats.map((pupIdx, seatIdx) => {
          const pup = friends[pupIdx];
          if (!pup) return null;
          const [x, w, peek, tilt] = SEATS[seatIdx];
          const style = {
            '--x': `${x}%`,
            '--w': `${w}rem`,
            '--peek': peek,
            '--tilt': `${tilt}deg`,
            '--i': seatIdx,
          };
          const isTagVisible = showingTag === seatIdx || hoveredTag === seatIdx;
          return (
            <li key={seatIdx} className="tp-lineup__seat" style={style}>
              <span
                className="tp-lineup__ghost"
                data-state={states[seatIdx]}
                data-tag={isTagVisible ? 'show' : undefined}
              >
                <span className="tp-lineup__name font-scrawl">
                  {pup.name}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Background Preloader for Next Puppy */}
      {wing !== null && friends[wing] && (
        <span aria-hidden="true" className="tp-lineup__wings" data-for={wing}>
          <img alt="" src={friends[wing].coverImage || friends[wing].image} />
        </span>
      )}
    </>
  );
}
