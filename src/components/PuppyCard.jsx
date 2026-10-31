import React from 'react';
import { Link } from 'react-router-dom';

export default function PuppyCard({ puppy, onSelect, isSmall = false }) {
  const isGone = puppy.status === 'Gone Home';

  const handleClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(puppy);
    }
  };

  return (
    <Link
      to={`/puppies/${puppy.slug}`}
      onClick={handleClick}
      className={`tp-sketch group block cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
        isSmall ? 'tp-sketch--small' : ''
      }`}
    >
      <span className="tp-sketch__frame relative block overflow-hidden rounded-[1.6rem] bg-milk shadow-md">
        {/* Status Sticker */}
        <span
          className={`tp-sketch__sticker font-scrawl absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-sm shadow-sm ${
            isGone
              ? 'tp-sketch__sticker--home bg-blush text-cocoa'
              : 'bg-honey text-cocoa'
          }`}
        >
          {isGone ? 'gone home ♥' : 'Available'}
        </span>

        {/* Video Badge */}
        {puppy.hasVideo && !isGone && (
          <span className="tp-sketch__video font-scrawl absolute right-3 top-3 z-10 rounded-full bg-cocoa/80 px-2.5 py-1 text-xs text-milk backdrop-blur-sm">
            ▶ video
          </span>
        )}

        {/* Puppy Photo */}
        <div className="aspect-square w-full overflow-hidden bg-honey-soft/30">
          <img
            src={puppy.coverImage || '/brand/logo.png'}
            alt={`${puppy.name}, ${puppy.breed}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // fallback if specific image path fails
              e.target.src = '/brand/logo.png';
            }}
          />
        </div>
      </span>

      {/* Puppy Name & Meta */}
      <div className="mt-3.5 px-1">
        <span className="tp-sketch__name font-plush block text-xl text-cocoa group-hover:text-toffee transition-colors">
          {puppy.name}
        </span>
        <span className="tp-sketch__meta block text-sm font-medium text-cocoa-soft/80 mt-0.5">
          {puppy.meta || `${puppy.breed} · ${puppy.gender} · ${puppy.age}`}
        </span>
      </div>
    </Link>
  );
}
