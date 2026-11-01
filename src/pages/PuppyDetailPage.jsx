import React, { useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PUPPIES_DATA from '../data/puppiesReplicated.json';
import PUPPIES_FULL from '../data/puppies';
import PuppyGallery from '../components/PuppyGallery';
import EnquiryLetterForm from '../components/EnquiryLetterForm';
import PupBuddy from '../components/pup/PupBuddy';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const tagRef = useRef(null);

  // Combine data from both catalogues for maximum richness
  const allAvailable = PUPPIES_DATA.available || [];
  const allGone = PUPPIES_DATA.gone || [];
  const allReplicated = [...allAvailable, ...allGone];

  const puppy = useMemo(() => {
    const fromRep = allReplicated.find((p) => p.slug === slug);
    const fromFull = PUPPIES_FULL.find((p) => p.slug === slug);
    if (!fromRep && !fromFull) return null;
    return { ...(fromFull || {}), ...(fromRep || {}) };
  }, [slug, allReplicated]);

  // Entrance animation for luggage tag
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const el = tagRef.current;
    if (!el) return;
    el.dataset.armed = 'true';
    const timer = setTimeout(() => {
      if (el) el.dataset.revealed = 'true';
    }, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!puppy) {
    return (
      <div className="gutter mx-auto min-h-[70vh] max-w-xl py-24 text-center">
        <h1 className="font-plush text-4xl text-cocoa">Puppy not found</h1>
        <p className="text-cocoa-soft mt-3 font-medium">
          We couldn't find the puppy listing you were looking for.
        </p>
        <Link to="/puppies" className="btn btn-primary mt-6 inline-flex">
          View all available puppies
        </Link>
      </div>
    );
  }

  // Construct complete media list
  const mediaList = useMemo(() => {
    const list = [];
    const coverUrl = puppy.cover || puppy.coverImage;
    if (coverUrl) {
      list.push({
        id: 'media-cover',
        url: coverUrl,
        kind: 'image',
        alt: `${puppy.name}, ${puppy.breed} puppy`,
      });
    }

    if (puppy.hasVideo) {
      const vid =
        puppy.videoUrl ||
        (puppy.slug.includes('max')
          ? '/media/F0GAEsYGQHAH/d28cb39828/b942a5_409c00762732451a9c914fd605f6427b.mp4'
          : '/media/jNYYlZcF2IuE/61af7a5e09/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67.mp4');
      list.push({
        id: 'media-video',
        url: vid,
        poster: coverUrl,
        kind: 'video',
        alt: `Video of ${puppy.name}, ${puppy.gender || 'boy'} ${puppy.breed} puppy`,
      });
    }

    if (Array.isArray(puppy.gallery)) {
      puppy.gallery.forEach((gUrl, idx) => {
        if (gUrl !== coverUrl) {
          list.push({
            id: `media-gal-${idx}`,
            url: gUrl,
            kind: 'image',
            alt: `${puppy.name} photo ${idx + 2}`,
          });
        }
      });
    }

    return list;
  }, [puppy]);

  // Determine previous and next puppies for footer nav
  const currentIndex = allReplicated.findIndex((p) => p.slug === slug);
  const prevPuppy = currentIndex > 0 ? allReplicated[currentIndex - 1] : allReplicated[allReplicated.length - 1];
  const nextPuppy = currentIndex < allReplicated.length - 1 ? allReplicated[currentIndex + 1] : allReplicated[0];

  const isGone = puppy.status?.toLowerCase().includes('gone');
  const isImported = puppy.origin?.slug !== 'local' && puppy.origin?.slug !== 'dubai-showroom';

  const waHref = `https://wa.me/971541676733?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name}, the ${puppy.breed}: https://puppy.instabizweb.com/puppies/${puppy.slug}`
  )}`;

  const bgColor = puppy.wash || '#785838';

  return (
    <div data-page="pup" className="tp-page">
      <article
        className="tp-storybook min-h-screen"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${bgColor} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
        }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-8 md:pt-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
            <Link to="/puppies" className="link-ink">
              Available puppies
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-cocoa font-bold">
              {puppy.name}
            </span>
          </nav>

          {/* Chapter 1: hello, it's me */}
          <div className="mt-8">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                1
              </span>
              <span className="font-scrawl">hello, it's me</span>
            </p>
          </div>

          {/* Main 2-Column Split */}
          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: 3D Storypage Media Gallery */}
            <div className="min-w-0 lg:col-span-7">
              <PuppyGallery name={puppy.name} media={mediaList} />
            </div>

            {/* Right: Luggage Tag & What Comes With */}
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                {/* Swinging Luggage Tag */}
                <div
                  ref={tagRef}
                  className="tp-tag tp-board mt-12 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-16"
                  data-armed="true"
                  data-revealed="true"
                >
                  {/* Brass Grommet Ring */}
                  <span aria-hidden="true" className="tp-tag__ring"></span>

                  {/* Teddy Mascot Peeking Over Top Edge */}
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

                  {/* Headline & Subtitle */}
                  <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)] text-cocoa leading-tight">
                    {puppy.name}
                  </h1>
                  <p className="mt-2 text-lg font-semibold text-cocoa-soft">
                    {puppy.breed}
                  </p>

                  {/* Dotted Specs Grid */}
                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cocoa/10 pt-5">
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Breed</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">
                        {puppy.breed}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Boy or girl</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">
                        {puppy.genderLabel || puppy.gender === 'female' ? 'Girl' : 'Boy'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Age</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">
                        {puppy.age || '3 months'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Where</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">
                        {isImported ? 'Imported for you' : 'In our showroom'}
                      </dd>
                    </div>
                  </dl>

                  {/* Call to Actions */}
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full text-center"
                    >
                      Ask about {puppy.name} on WhatsApp
                    </a>
                    <a
                      href={`#enquire-${puppy.slug}`}
                      className="btn btn-ghost w-full text-center"
                    >
                      Send an enquiry
                    </a>
                  </div>
                </div>

                {/* Chapter 2: What comes with the puppy */}
                <div className="tp-paper mt-8 -rotate-1 shadow-md">
                  <p className="tp-chapter">
                    <span aria-hidden="true" className="tp-chapter__n font-plush">
                      2
                    </span>
                    <span className="font-scrawl">what comes with {puppy.name}</span>
                  </p>
                  <h2 className="font-plush mt-2 text-[1.9rem] text-cocoa">
                    Every Teddy Pup comes
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      'Vaccinated',
                      'Dewormed',
                      'Verified health certificate from licensed vets',
                      'Thoroughly checked before joining your family',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 font-semibold text-cocoa">
                        <svg
                          viewBox="0 0 32 32"
                          className="mt-0.5 size-6 shrink-0 text-toffee-deep"
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
          </div>

          {/* Chapter 3: The Way Home Concierge Trail */}
          <section aria-labelledby={`home-steps-${puppy.slug}`} className="mt-20">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                3
              </span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h2
              id={`home-steps-${puppy.slug}`}
              className="font-plush text-big mt-3 text-cocoa"
            >
              {isImported ? 'Coming home from abroad' : 'Visiting our Dubai showroom'}
            </h2>
            <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
              {[
                {
                  n: 1,
                  title: 'Reserve your puppy',
                  text: 'Tell us which puppy has captured your heart.',
                },
                {
                  n: 2,
                  title: 'Personalized consultation',
                  text: "We finalize details with you and share updates on your puppy's journey.",
                },
                {
                  n: 3,
                  title: isImported ? 'Import and arrival' : 'Showroom visit',
                  text: 'We manage health checks, travel arrangements, and documentation.',
                },
                {
                  n: 4,
                  title: 'Welcome home',
                  text: 'We help your new puppy settle in and ensure a smooth transition into your home.',
                },
              ].map((step) => (
                <li key={step.n}>
                  <span aria-hidden="true" className="tp-trail__num font-plush text-cocoa">
                    {step.n}
                  </span>
                  <h3 className="font-plush-text text-xl font-bold leading-tight text-cocoa">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-cocoa-soft font-medium">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Chapter 4: Dear TeddyPups... Letterform */}
          <section
            id={`enquire-${puppy.slug}`}
            aria-labelledby={`enquire-title-${puppy.slug}`}
            className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
          >
            {/* Postal Cancellation Stamp */}
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>

            {/* Letter Kicker & Heading */}
            <div className="lg:col-span-4">
              <p className="tp-chapter">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  4
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h2
                id={`enquire-title-${puppy.slug}`}
                className="font-plush text-big mt-2 text-cocoa"
              >
                Ask about {puppy.name}
              </h2>
              <p className="mt-4 text-cocoa-soft font-medium leading-relaxed">
                Leave your details and our concierge team will get back to you promptly — or message us on WhatsApp for the quickest reply.
              </p>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <EnquiryLetterForm puppy={puppy} whatsappHref={waHref} />
            </div>
          </section>

          {/* Previous / Next Puppy Navigation Strip */}
          <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
            {prevPuppy && (
              <Link
                to={`/puppies/${prevPuppy.slug}`}
                className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 shadow-sm"
              >
                <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                  <img
                    src={prevPuppy.cover || prevPuppy.coverImage}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span>
                  <span className="font-scrawl block text-sm text-cocoa-soft">Previous pup</span>
                  <span className="font-plush text-[1.6rem] text-cocoa">
                    {prevPuppy.name} ({prevPuppy.breed})
                  </span>
                </span>
              </Link>
            )}

            {nextPuppy && (
              <Link
                to={`/puppies/${nextPuppy.slug}`}
                className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right shadow-sm"
              >
                <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                  <img
                    src={nextPuppy.cover || nextPuppy.coverImage}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span>
                  <span className="font-scrawl block text-sm text-cocoa-soft">Next pup</span>
                  <span className="font-plush text-[1.6rem] text-cocoa">
                    {nextPuppy.name} ({nextPuppy.breed})
                  </span>
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </div>
  );
}
