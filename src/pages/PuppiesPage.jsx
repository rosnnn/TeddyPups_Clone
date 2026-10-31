import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';
import PuppyCard from '../components/PuppyCard';
import PuppyModal from '../components/PuppyModal';

export default function PuppiesPage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [filterBreed, setFilterBreed] = useState('All');
  const [videoOnly, setVideoOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const breeds = ['All', 'Maltipoo', 'Poodle', 'Pomeranian', 'Shih Tzu', 'Cavapoo'];

  const availablePuppies = PUPPIES.filter((p) => p.status === 'Available');
  const goneHomePuppies = PUPPIES.filter((p) => p.status === 'Gone Home');

  const filteredPuppies = availablePuppies.filter((p) => {
    const matchesBreed =
      filterBreed === 'All' ||
      p.breed.toLowerCase().includes(filterBreed.toLowerCase()) ||
      p.name.toLowerCase().includes(filterBreed.toLowerCase());

    const matchesVideo = !videoOnly || p.hasVideo;

    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBreed && matchesVideo && matchesSearch;
  });

  return (
    <div data-page="puppies" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <p className="font-scrawl text-lg text-toffee-ink">from Teddy's sketchbook</p>
          <h1 className="font-plush text-giant tp-sketchbook__title text-cocoa mt-2">
            Available puppies
          </h1>
          <p className="tp-sketchbook__lede text-lede mt-4 max-w-[46ch] text-cocoa-soft leading-relaxed">
            Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
          </p>
        </header>

        {/* Filter & Search Bar */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl bg-milk p-4 shadow-sm border border-honey/40">
          {/* Breed Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {breeds.map((breed) => (
              <button
                key={breed}
                type="button"
                onClick={() => setFilterBreed(breed)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  filterBreed === breed
                    ? 'bg-cocoa text-milk shadow-sm scale-105'
                    : 'bg-honey-soft/40 text-cocoa hover:bg-honey-soft'
                }`}
              >
                {breed}
              </button>
            ))}
          </div>

          {/* Video Toggle & Search Input */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setVideoOnly(!videoOnly)}
              className={`rounded-full px-4 py-2 text-xs font-semibold border-2 transition ${
                videoOnly
                  ? 'bg-toffee border-toffee text-milk'
                  : 'border-cocoa/20 text-cocoa hover:border-cocoa'
              }`}
            >
              {videoOnly ? '✓ Video Only' : '▶ Has Video'}
            </button>

            <input
              type="text"
              placeholder="Search puppy by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full border border-cocoa/20 bg-milk px-4 py-2 text-sm text-cocoa placeholder:text-cocoa/40 focus:border-toffee focus:outline-none w-full sm:w-56"
            />
          </div>
        </div>

        {/* Puppies Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPuppies.map((puppy) => (
              <PuppyCard
                key={puppy.slug}
                puppy={puppy}
                onSelect={(p) => setSelectedPuppy(p)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-milk/60 p-12 text-center border-2 border-dashed border-cocoa/20">
            <p className="font-plush text-2xl text-cocoa">No puppies found matching criteria</p>
            <p className="text-cocoa-soft mt-2 text-sm">
              Try selecting another breed or reset your search filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterBreed('All');
                setVideoOnly(false);
                setSearchQuery('');
              }}
              className="btn btn-primary mt-6"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* SECTION: ALREADY GONE HOME TEASER */}
        <section className="mt-28 border-t-2 border-honey/40 pt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-plush text-big text-cocoa">Already gone home</h2>
              <p className="mt-2 text-cocoa-soft text-base">
                These puppies have found their loving families across the UAE.
              </p>
            </div>
            <Link className="btn btn-primary" to="/gone-home">
              See the puppies who've gone home
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {goneHomePuppies.slice(0, 5).map((puppy) => (
              <PuppyCard
                key={puppy.slug}
                puppy={puppy}
                isSmall={true}
                onSelect={(p) => setSelectedPuppy(p)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedPuppy && (
        <PuppyModal puppy={selectedPuppy} onClose={() => setSelectedPuppy(null)} />
      )}
    </div>
  );
}
