import React, { useState, useEffect, useRef } from 'react';
import happyFamiliesData from '../data/happyFamiliesExact.json';
import PupBuddy from '../components/pup/PupBuddy';
import PhotoLightbox from '../components/PhotoLightbox';

function WallItem({ item, idx, onSelect }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    el.dataset.armed = 'true';
    if (idx < 12) {
      el.dataset.revealed = 'true';
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.revealed = 'true';
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '120px 0px 60px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [idx]);

  return (
    <li
      ref={itemRef}
      className="tp-wall__item"
      data-reveal="true"
      style={{ '--d': item.d }}
    >
      <button
        type="button"
        className="tp-wall__print"
        onClick={() => onSelect(idx)}
        aria-label={item.label}
      >
        <span
          className="tp-polaroid"
          style={{
            '--tilt': item.tilt,
            '--tape': item.tapeColor,
            '--i': idx,
          }}
        >
          {item.tapeStyle === 'corners' ? (
            <>
              <span aria-hidden="true" className="tp-tape tp-tape--tl" />
              <span aria-hidden="true" className="tp-tape tp-tape--tr" />
            </>
          ) : (
            <span aria-hidden="true" className={`tp-tape tp-tape--${item.tapeStyle}`} />
          )}

          <span
            className="tp-polaroid__photo"
            style={{ backgroundColor: item.bgColor }}
          >
            <img
              src={item.image}
              alt={item.caption ? `A happy TeddyPups family with their new puppy: ${item.caption}` : 'A happy TeddyPups family with their new puppy'}
              loading={idx < 8 ? 'eager' : 'lazy'}
              decoding="async"
              width={item.width}
              height={item.height}
              style={{
                color: 'transparent',
                width: '100%',
                height: 'auto',
                display: 'block',
                backgroundColor: item.bgColor,
              }}
            />
          </span>

          <span className="tp-polaroid__caption font-scrawl">
            {item.caption}
          </span>
        </span>

        {/* Paw stamp animation */}
        <svg viewBox="0 0 64 64" className="tp-wall__paw" aria-hidden="true" fill="currentColor">
          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
        </svg>
      </button>
    </li>
  );
}

export default function HappyFamiliesPage() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  return (
    <div className="tp-page" data-page="families">
      <section
        aria-labelledby="families-title"
        className="tp-memories"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <div className="tp-memories__head">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                our wall of happy endings
              </p>
              <h1 className="font-plush text-giant tp-memories__title" data-reveal="true" id="families-title">
                Happy families
                <svg aria-hidden="true" className="tp-memories__heart" viewBox="0 0 48 44">
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              </h1>
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                {happyFamiliesData.length} moments and counting
              </p>
            </div>

            {/* Testimonial Note */}
            <figure className="tp-memories__note" data-reveal="true">
              <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ '--tape': '#cfe5f6' }} />
              <blockquote className="font-plush-text">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
            </figure>
          </div>

          {/* Full Photowall Grid */}
          <div className="mt-16 md:mt-20">
            <div>
              <ul aria-label="Photos from TeddyPups families" className="tp-wall">
                {happyFamiliesData.map((item, idx) => (
                  <WallItem
                    key={idx}
                    item={item}
                    idx={idx}
                    onSelect={(i) => setActivePhotoIdx(i)}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* Foot with mascot admiring wall and caption */}
          <div className="tp-memories__foot">
            <PupBuddy
              className="w-36 md:w-44"
              facing="left"
              pose="sit"
              label="Teddy, admiring the wall"
            />
            <p className="font-scrawl text-lg text-cocoa-soft">
              every one of them was a Teddy Pup once
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Photo Viewer Dialog */}
      <PhotoLightbox
        photos={happyFamiliesData}
        currentIndex={activePhotoIdx}
        onClose={() => setActivePhotoIdx(null)}
        onNavigate={setActivePhotoIdx}
      />
    </div>
  );
}
