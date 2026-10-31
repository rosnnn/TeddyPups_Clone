import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';
import PuppyCard from '../components/PuppyCard';
import PuppyModal from '../components/PuppyModal';

export default function GoneHomePage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [search, setSearch] = useState('');

  const goneHomePuppies = PUPPIES.filter((p) => p.status === 'Gone Home');

  const filtered = goneHomePuppies.filter((p) => {
    return (
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div data-page="gone-home" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <p className="font-scrawl text-lg text-toffee-ink">forever families</p>
          <h1 className="font-plush text-giant text-cocoa mt-2">Gone home</h1>
          <p className="text-lede mt-4 max-w-[50ch] text-cocoa-soft leading-relaxed">
            Every puppy shown here has found their loving home in Dubai and beyond. If you fell in love with one of these faces, contact us — we can source a puppy from the exact same ethical bloodline.
          </p>
        </header>

        {/* Search & Counter */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-milk p-4 shadow-sm border border-honey/40">
          <span className="font-scrawl text-lg text-cocoa">
            ❤️ {goneHomePuppies.length} puppies happily adopted
          </span>

          <input
            type="text"
            placeholder="Search adopted puppies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-cocoa/20 bg-milk px-5 py-2 text-sm text-cocoa placeholder:text-cocoa/40 focus:border-toffee focus:outline-none w-full sm:w-64"
          />
        </div>

        {/* Grid of Adopted Puppies */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((puppy) => (
            <PuppyCard
              key={puppy.slug}
              puppy={puppy}
              isSmall={true}
              onSelect={(p) => setSelectedPuppy(p)}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 rounded-[2.5rem] bg-honey/30 p-8 md:p-12 text-center border-2 border-honey">
          <h2 className="font-plush text-3xl text-cocoa">
            Looking for a puppy like one of these?
          </h2>
          <p className="text-cocoa-soft max-w-xl mx-auto mt-3 text-base leading-relaxed">
            Send us a screenshot or mention their name on WhatsApp, and our concierge team will help locate your dream puppy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20looking%20for%20a%20puppy%20similar%20to%20one%20of%20the%20puppies%20who%20went%20home."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Ask on WhatsApp
            </a>
            <Link to="/puppies" className="btn btn-primary">
              Browse Available Puppies
            </Link>
          </div>
        </div>
      </div>

      {selectedPuppy && (
        <PuppyModal puppy={selectedPuppy} onClose={() => setSelectedPuppy(null)} />
      )}
    </div>
  );
}
