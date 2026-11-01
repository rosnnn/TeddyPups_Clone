import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import PuppyGallery from './PuppyGallery';
import EnquiryLetterForm from './EnquiryLetterForm';
import PupBuddy from './pup/PupBuddy';

export default function PuppyModal({ puppy, onClose }) {
  const tagRef = useRef(null);

  useEffect(() => {
    if (!puppy) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [puppy, onClose]);

  // Entrance animation for luggage tag inside modal
  useEffect(() => {
    if (!puppy) return;
    const el = tagRef.current;
    if (!el) return;
    el.dataset.armed = 'true';
    const timer = setTimeout(() => {
      if (el) el.dataset.revealed = 'true';
    }, 150);
    return () => clearTimeout(timer);
  }, [puppy]);

  const mediaList = useMemo(() => {
    if (!puppy) return [];
    const list = [];
    const coverUrl = puppy.cover || puppy.coverImage;
    if (coverUrl) {
      list.push({
        id: 'modal-cover',
        url: coverUrl,
        kind: 'image',
        alt: `${puppy.name}, ${puppy.breed} puppy`,
      });
    }

    if (puppy.hasVideo) {
      const vid =
        puppy.videoUrl ||
        (puppy.slug?.includes('max')
          ? '/media/F0GAEsYGQHAH/d28cb39828/b942a5_409c00762732451a9c914fd605f6427b.mp4'
          : '/media/jNYYlZcF2IuE/61af7a5e09/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67.mp4');
      list.push({
        id: 'modal-video',
        url: vid,
        poster: coverUrl,
        kind: 'video',
        alt: `Video of ${puppy.name}`,
      });
    }

    if (Array.isArray(puppy.gallery)) {
      puppy.gallery.forEach((gUrl, idx) => {
        if (gUrl !== coverUrl) {
          list.push({
            id: `modal-gal-${idx}`,
            url: gUrl,
            kind: 'image',
            alt: `${puppy.name} photo ${idx + 2}`,
          });
        }
      });
    }

    return list;
  }, [puppy]);

  if (!puppy) return null;

  const isGone = puppy.status?.toLowerCase().includes('gone');
  const isImported = puppy.origin?.slug !== 'local' && puppy.origin?.slug !== 'dubai-showroom';
  const bgColor = puppy.wash || '#785838';

  const waHref = `https://wa.me/971541676733?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name}, the ${puppy.breed}: https://puppy.instabizweb.com/puppies/${puppy.slug}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card with Storybook Styling */}
      <div
        className="relative z-10 flex flex-col w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[2.5rem] border-4 border-cocoa bg-milk shadow-2xl transition-all duration-300"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${bgColor} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-cocoa/15 bg-milk/90 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-cocoa-soft">
            <span className="font-scrawl text-base text-toffee-ink">Teddy's sketchbook</span>
            <span>/</span>
            <span className="text-cocoa font-bold">{puppy.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/puppies/${puppy.slug}`}
              onClick={onClose}
              className="text-xs font-bold text-toffee-deep hover:underline hidden sm:inline"
            >
              Open full page ↗
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="size-10 rounded-full border-2 border-cocoa bg-milk text-cocoa flex items-center justify-center font-bold text-base hover:bg-honey transition active:scale-95"
              aria-label="Close puppy modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Storybook Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 [scrollbar-width:thin]">
          {/* Chapter 1: hello, it's me */}
          <div>
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                1
              </span>
              <span className="font-scrawl">hello, it's me</span>
            </p>
          </div>

          {/* Grid Layout */}
          <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Gallery Column */}
            <div className="min-w-0 lg:col-span-7">
              <PuppyGallery name={puppy.name} media={mediaList} />
            </div>

            {/* Luggage Tag Column */}
            <div className="min-w-0 lg:col-span-5">
              <div
                ref={tagRef}
                className="tp-tag tp-board mt-8 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-6 md:!p-8 lg:mt-12"
                data-armed="true"
                data-revealed="true"
              >
                {/* Brass Grommet Ring */}
                <span aria-hidden="true" className="tp-tag__ring"></span>

                {/* Teddy Mascot Peeking Over Edge */}
                <div className="absolute -top-[4.8rem] right-6 w-[9.5rem] z-20 pointer-events-none">
                  <PupBuddy pose="peek" facing="right" />
                </div>

                {/* Status Badge */}
                <span className="chip mt-1">
                  <svg
                    viewBox="0 0 64 64"
                    className="size-4 text-toffee"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                  {isGone ? 'Gone home ♥' : 'Available'}
                </span>

                {/* Name & Breed */}
                <h2 className="font-plush mt-4 text-[clamp(2.2rem,4.5vw,3.8rem)] text-cocoa leading-tight">
                  {puppy.name}
                </h2>
                <p className="mt-2 text-base font-semibold text-cocoa-soft">
                  {puppy.breed}
                </p>

                {/* Specification Grid */}
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-cocoa/10 pt-4">
                  <div>
                    <dt className="font-scrawl text-xs text-cocoa-soft">Breed</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-cocoa">{puppy.breed}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-xs text-cocoa-soft">Boy or girl</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-cocoa">
                      {puppy.genderLabel || puppy.gender === 'female' ? 'Girl' : 'Boy'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-xs text-cocoa-soft">Age</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-cocoa">{puppy.age || '3 months'}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-xs text-cocoa-soft">Where</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-cocoa">
                      {isImported ? 'Imported for you' : 'In our showroom'}
                    </dd>
                  </div>
                </dl>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full text-center text-sm"
                  >
                    Ask about {puppy.name} on WhatsApp
                  </a>
                  <Link
                    to={`/puppies/${puppy.slug}`}
                    onClick={onClose}
                    className="btn btn-ghost w-full text-center text-sm"
                  >
                    View Full Profile & Letterform ↗
                  </Link>
                </div>
              </div>

              {/* What comes with puppy */}
              <div className="tp-paper mt-6 -rotate-1 shadow-sm">
                <p className="tp-chapter">
                  <span aria-hidden="true" className="tp-chapter__n font-plush text-sm">
                    2
                  </span>
                  <span className="font-scrawl text-sm">what comes with {puppy.name}</span>
                </p>
                <h3 className="font-plush mt-1 text-xl text-cocoa">
                  Every Teddy Pup comes
                </h3>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-cocoa">
                  {[
                    'Vaccinated',
                    'Dewormed',
                    'Verified health certificate from licensed vets',
                    'Thoroughly checked before joining your family',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        viewBox="0 0 32 32"
                        className="mt-0.5 size-5 shrink-0 text-toffee-deep"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 17l7 7L27 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Chapter 3: the way home */}
          <section className="mt-14 border-t border-cocoa/10 pt-10">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                3
              </span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h3 className="font-plush text-big mt-3 text-cocoa">
              {isImported ? 'Coming home from abroad' : 'Meeting in our showroom'}
            </h3>
            <ol className="tp-trail tp-trail--row tp-trail--paws mt-8">
              <li>
                <span className="tp-trail__num font-plush">1</span>
                <p className="font-plush text-xl text-cocoa">Say hello</p>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Reach out on WhatsApp. We share real videos, temperament notes, and answer all questions.
                </p>
              </li>
              <li>
                <span className="tp-trail__num font-plush">2</span>
                <p className="font-plush text-xl text-cocoa">Health check & flight</p>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Complete veterinary assessment, international pet passport, and government approvals.
                </p>
              </li>
              <li>
                <span className="tp-trail__num font-plush">3</span>
                <p className="font-plush text-xl text-cocoa">Arrival in Dubai</p>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Ministry customs clearance handled end-to-end, then resting safely in our showroom.
                </p>
              </li>
              <li>
                <span className="tp-trail__num font-plush">4</span>
                <p className="font-plush text-xl text-cocoa">Together at last</p>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Collect from our showroom or white-glove chauffeur delivery to your doorstep anywhere in UAE.
                </p>
              </li>
            </ol>
          </section>

          {/* Chapter 4: dear TeddyPups... Letterform */}
          <section className="tp-letter mt-14 grid gap-8 lg:grid-cols-12" id={`enquire-${puppy.slug}`}>
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg viewBox="0 0 64 64" className="size-9" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>

            <div className="lg:col-span-4">
              <p className="tp-chapter">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  4
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h3 className="font-plush text-big mt-3 text-cocoa">
                Send an enquiry about {puppy.name}
              </h3>
              <p className="mt-4 text-cocoa-soft text-sm">
                Write us a quick note below. We read every letter carefully and respond via WhatsApp or phone.
              </p>
            </div>

            <div className="lg:col-span-8">
              <EnquiryLetterForm puppyName={puppy.name} puppyBreed={puppy.breed} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
