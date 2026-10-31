import React, { useState } from 'react';
import REVIEWS from '../data/reviews';
import PupBuddy from '../components/pup/PupBuddy';
import PhotoLightbox from '../components/PhotoLightbox';

const TAPE_STYLES = ['center', 'left', 'right', 'corners'];

export default function HappyFamiliesPage() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  const reviewsList = Array.isArray(REVIEWS) ? REVIEWS : (REVIEWS.REVIEWS || []);

  return (
    <div className="tp-page" data-page="families">
      <section
        aria-labelledby="families-title"
        className="tp-scene tp-memories"
        data-pup-scene="true"
        data-tone="light"
        style={{ '--sky-top': '#fffcf5', '--sky-bottom': '#f7dcab' }}
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
                {reviewsList.length} moments and counting
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
            <ul aria-label="Photos from TeddyPups families" className="tp-wall">
              {reviewsList.map((item, idx) => {
                const tapeStyle = TAPE_STYLES[idx % TAPE_STYLES.length];
                const tilt = item.tilt?.endsWith('deg') ? item.tilt : `${item.tilt || 0}deg`;
                return (
                  <li
                    key={idx}
                    className="tp-wall__item"
                    data-reveal="true"
                    style={{ '--d': `${(idx % 8) * 110}ms` }}
                  >
                    <button
                      type="button"
                      className="tp-wall__print"
                      onClick={() => setActivePhotoIdx(idx)}
                      aria-label={`Open photo ${idx + 1} of ${reviewsList.length}: ${item.caption || ''}`}
                    >
                      <span
                        className="tp-polaroid"
                        style={{
                          '--tilt': tilt,
                          '--tape': item.tape || '#f6d79a',
                          '--i': idx,
                        }}
                      >
                        {tapeStyle === 'corners' ? (
                          <>
                            <span aria-hidden="true" className="tp-tape tp-tape--tl" />
                            <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                          </>
                        ) : (
                          <span aria-hidden="true" className={`tp-tape tp-tape--${tapeStyle}`} />
                        )}

                        <span className="tp-polaroid__photo">
                          <img
                            src={item.image}
                            alt={item.alt || 'A happy TeddyPups family with their new puppy'}
                            loading="lazy"
                            width="960"
                            height="1280"
                            className="size-full object-cover"
                          />
                        </span>

                        <span className="tp-polaroid__caption font-scrawl">
                          {item.caption !== 'Happy TeddyPups Family' ? item.caption : ''}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Foot with mascot admiring wall */}
          <div className="tp-memories__foot mt-20 flex justify-center">
            <div className="pup-buddy w-36 md:w-44" data-facing="left">
              <PupBuddy facing="left" pose="sit" />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Photo Viewer Dialog */}
      <PhotoLightbox
        photos={reviewsList}
        currentIndex={activePhotoIdx}
        onClose={() => setActivePhotoIdx(null)}
        onNavigate={setActivePhotoIdx}
      />
    </div>
  );
}
