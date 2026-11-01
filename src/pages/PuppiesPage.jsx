import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import puppiesData from '../data/puppiesReplicated.json';
import PuppyCard from '../components/PuppyCard';
import PuppyModal from '../components/PuppyModal';
import PupBuddy from '../components/pup/PupBuddy';
import PUPPIES_FULL from '../data/puppies';

const BREEDS_LIST = [
  { slug: 'maltipoo', name: 'Maltipoo' },
  { slug: 'pomeranian', name: 'Pomeranian' },
  { slug: 'poodle', name: 'Poodle' },
  { slug: 'cavapoo', name: 'Cavapoo' },
  { slug: 'shih-tzu', name: 'Shih Tzu' },
];

export default function PuppiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  const origin = searchParams.get('origin') || '';
  const breed = searchParams.get('breed') || '';
  const gender = searchParams.get('gender') || '';
  const collection = searchParams.get('collection') || '';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const availablePuppies = puppiesData.available;
  const gonePuppies = puppiesData.gone;

  const filteredPuppies = useMemo(() => {
    return availablePuppies.filter((p) => {
      if (origin && p.origin?.slug !== origin) return false;
      if (breed && p.breedSlug !== breed) return false;
      if (gender && p.gender !== gender && p.gender !== 'male-female') return false;
      if (collection && !p.collections?.includes(collection)) return false;
      return true;
    });
  }, [availablePuppies, origin, breed, gender, collection]);

  const hasFilters = Boolean(origin || breed || gender || collection);

  const handlePuppyClick = (pup) => {
    // Find rich puppy object for modal, preserving wash, SVGs, and rich metadata
    const full = PUPPIES_FULL.find((item) => item.slug === pup.slug) || {};
    setSelectedPuppy({ ...full, ...pup });
  };

  return (
    <div className="tp-page" data-page="puppies">
      <div className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Sketchbook Header */}
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy's sketchbook
              </p>
              <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
                Available puppies
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="tp-sketchbook__underline"
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Mascot Self-Portrait */}
            <div className="tp-sketchbook__self" data-reveal="true">
              <div className="pup-buddy" data-facing="left">
                <PupBuddy facing="left" pose="sit" />
              </div>
              <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
            </div>
          </div>

          {/* Filter Pad & Browser */}
          <div className="mt-12">
            <div role="group" aria-label="Filter puppies" className="tp-sketchpad flex flex-col gap-4">
              {/* Row 1: where */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">where</span>
                <button
                  type="button"
                  onClick={clearFilters}
                  aria-pressed={!origin && !collection}
                  className="tp-sticker-chip"
                >
                  Everywhere
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('origin', 'imported')}
                  aria-pressed={origin === 'imported'}
                  className="tp-sticker-chip"
                >
                  Imported
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('collection', 'korean-teacup')}
                  aria-pressed={collection === 'korean-teacup'}
                  className="tp-sticker-chip"
                >
                  Korean Teacup
                </button>
              </div>

              {/* Row 2: breed */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">breed</span>
                {BREEDS_LIST.map((b) => (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => setFilter('breed', b.slug)}
                    aria-pressed={breed === b.slug}
                    className="tp-sticker-chip"
                  >
                    {b.name}
                  </button>
                ))}
              </div>

              {/* Row 3: boy or girl */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">boy or girl</span>
                <button
                  type="button"
                  onClick={() => setFilter('gender', 'male')}
                  aria-pressed={gender === 'male'}
                  className="tp-sticker-chip"
                >
                  Boys
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('gender', 'female')}
                  aria-pressed={gender === 'female'}
                  className="tp-sticker-chip"
                >
                  Girls
                </button>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="link-ink ml-auto text-[0.95rem] font-semibold"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Results count text */}
            <p className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]" aria-live="polite">
              {filteredPuppies.length === 1 ? '1 puppy' : `${filteredPuppies.length} puppies`}{' '}
              {hasFilters ? 'match' : 'looking for a home'}
            </p>

            {/* Sketches Grid */}
            {filteredPuppies.length > 0 ? (
              <ul className="tp-sketches mt-8">
                {filteredPuppies.map((pup, idx) => (
                  <li key={pup.slug || idx}>
                    <PuppyCard
                      pup={pup}
                      index={idx}
                      onSelect={handlePuppyClick}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="tp-sketchpad mt-10 grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                <div className="mx-auto w-44 md:w-52">
                  <PupBuddy pose="sit" act="tilt" />
                </div>
                <div>
                  <p className="font-plush text-big">No puppies match just now.</p>
                  <p className="mt-3 max-w-[48ch] text-cocoa-soft">
                    Tell us what you're hoping for and we'll let you know what's in our showroom or what we can bring in for you.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/971507779999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      Ask on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="btn btn-ghost"
                    >
                      Show all puppies
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section: Already Gone Home */}
        <div className="tp-gone-strip">
          <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
            <div className="md:w-1/3" data-reveal="true">
              <h2 className="font-plush text-big" id="gone-title">
                Already gone home
              </h2>
              <p className="mt-3 text-cocoa-soft">
                These puppies have found their families.
              </p>
              <Link className="btn btn-primary mt-6 inline-block" to="/gone-home">
                See the puppies who've gone home
              </Link>
            </div>

            <ul aria-label="Some puppies who have gone home" className="tp-gone-strip__row">
              {gonePuppies.map((pup, idx) => (
                <li key={pup.slug || idx}>
                  <PuppyCard
                    pup={pup}
                    index={idx}
                    small
                    onSelect={handlePuppyClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Puppy Detail Modal Preview */}
      <PuppyModal
        puppy={selectedPuppy}
        onClose={() => setSelectedPuppy(null)}
      />
    </div>
  );
}
