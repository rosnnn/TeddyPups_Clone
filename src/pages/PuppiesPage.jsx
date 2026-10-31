import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';
import PuppyCard from '../components/PuppyCard';
import PuppyModal from '../components/PuppyModal';
import PupBuddy from '../components/pup/PupBuddy';

const BREEDS = ['All', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
const GENDERS = ['All', 'Male', 'Female'];
const ORIGINS = ['All', 'Dubai', 'Imported'];

export default function PuppiesPage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');

  const availablePuppies = PUPPIES.filter((p) => p.status === 'Available');
  const goneHomePuppies = PUPPIES.filter((p) => p.status === 'Gone Home');

  const filteredPuppies = availablePuppies.filter((p) => {
    if (selectedBreed !== 'All') {
      const matchBreed = p.breed.toLowerCase().includes(selectedBreed.toLowerCase());
      if (!matchBreed) return false;
    }
    if (selectedGender !== 'All') {
      const matchGender = p.gender.toLowerCase() === selectedGender.toLowerCase() ||
        (selectedGender === 'Male' && (p.gender === 'Boy' || p.gender === 'boy')) ||
        (selectedGender === 'Female' && (p.gender === 'Girl' || p.gender === 'girl'));
      if (!matchGender) return false;
    }
    if (selectedOrigin !== 'All') {
      const matchOrigin = p.origin?.toLowerCase().includes(selectedOrigin.toLowerCase());
      if (!matchOrigin) return false;
    }
    return true;
  });

  return (
    <div className="tp-page" data-page="puppies">
      <div className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Sketchbook Header */}
          <div className="tp-sketchbook__head flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="tp-sketchbook__words max-w-[50ch]">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy's sketchbook
              </p>
              <h1 className="font-plush text-giant tp-sketchbook__title relative inline-block mt-2" data-reveal="true" id="pups-title">
                Available puppies
                <svg
                  aria-hidden="true"
                  className="tp-sketchbook__underline absolute -bottom-3 left-0 w-full text-toffee"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 24"
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Mascot in Sketchbook */}
            <div className="tp-sketchbook__self hidden md:block w-36" data-reveal="true">
              <PupBuddy facing="left" pose="sit" />
            </div>
          </div>

          {/* Filter Bar Chips */}
          <div className="mt-12 flex flex-col gap-5 border-y border-[var(--color-toffee)]/20 py-6">
            {/* Breed chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl text-sm text-[var(--ink-soft)] mr-2">Breed:</span>
              {BREEDS.map((breed) => (
                <button
                  key={breed}
                  type="button"
                  onClick={() => setSelectedBreed(breed)}
                  className={`chip h-9 px-4 rounded-full text-sm font-medium transition-colors ${
                    selectedBreed === breed
                      ? '!bg-[var(--color-toffee)] !text-white'
                      : 'bg-white hover:bg-[var(--color-creme)] text-[var(--ink)]'
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>

            {/* Gender & Origin chips */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl text-sm text-[var(--ink-soft)] mr-2">Gender:</span>
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`chip h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                      selectedGender === g
                        ? '!bg-[var(--color-toffee)] !text-white'
                        : 'bg-white hover:bg-[var(--color-creme)] text-[var(--ink)]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl text-sm text-[var(--ink-soft)] mr-2">Location:</span>
                {ORIGINS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setSelectedOrigin(o)}
                    className={`chip h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                      selectedOrigin === o
                        ? '!bg-[var(--color-toffee)] !text-white'
                        : 'bg-white hover:bg-[var(--color-creme)] text-[var(--ink)]'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Available Puppies Grid */}
          <div className="mt-14">
            {filteredPuppies.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-plush text-2xl text-[var(--ink)]">No puppies match this filter</p>
                <p className="font-scrawl text-lg text-[var(--ink-soft)] mt-2">
                  Try selecting a different breed or reset filters.
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-6"
                  onClick={() => {
                    setSelectedBreed('All');
                    setSelectedGender('All');
                    setSelectedOrigin('All');
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul aria-label="Available puppies" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPuppies.map((puppy, i) => (
                  <li key={puppy.id || i}>
                    <PuppyCard
                      puppy={puppy}
                      onSelect={(p) => setSelectedPuppy(p)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Section: Already Gone Home Strip */}
        <div className="tp-gone-strip mt-20 border-t border-[var(--color-toffee)]/20 py-16 bg-[var(--color-creme)]/40">
          <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
            <div className="md:w-1/3" data-reveal="true">
              <h2 className="font-plush text-big" id="gone-title">
                Already gone home
              </h2>
              <p className="mt-3 text-cocoa-soft text-lede">
                These precious puppies have found their forever families across Dubai and worldwide.
              </p>
              <Link className="btn btn-primary mt-6 inline-block" to="/gone-home">
                See the puppies who've gone home
              </Link>
            </div>

            <ul aria-label="Some puppies who have gone home" className="tp-gone-strip__row flex-1 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {goneHomePuppies.slice(0, 3).map((puppy, i) => (
                <li key={puppy.id || i}>
                  <PuppyCard
                    puppy={puppy}
                    isSmall
                    onSelect={(p) => setSelectedPuppy(p)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Puppy Detail Modal Lightbox */}
      <PuppyModal
        puppy={selectedPuppy}
        onClose={() => setSelectedPuppy(null)}
      />
    </div>
  );
}
