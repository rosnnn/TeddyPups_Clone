import React, { useState } from 'react';
import REVIEWS from '../data/reviews';

export default function HappyFamiliesPage() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <div data-page="happy-families" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Header */}
        <header className="mb-14 text-center">
          <p className="font-scrawl text-lg text-toffee-ink">real stories & moments</p>
          <h1 className="font-plush text-giant text-cocoa mt-2">Happy families</h1>
          <p className="text-lede mt-4 max-w-[56ch] mx-auto text-cocoa-soft leading-relaxed">
            Over the years, we've had the honor of helping families across Dubai, the UAE, and worldwide welcome their newest best friend. Here are some of their cherished snapshots.
          </p>
        </header>

        {/* Featured Testimonials */}
        <div className="mb-16 grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "Our tiny teacup Maltipoo has brought so much warmth and giggles into our home. The team took care of every single vaccine and health document.",
              author: "Layla & Omar K.",
              location: "Downtown Dubai",
            },
            {
              quote: "The concierge import process was flawless. We received weekly video updates of our puppy before arrival. She arrived safe, fluffy, and energetic!",
              author: "Jessica T.",
              location: "Palm Jumeirah",
            },
            {
              quote: "24/7 post-arrival support is real! Anytime I had a question about diet or potty training, the TeddyPups team answered within 5 minutes.",
              author: "Fahad Al-M.",
              location: "Abu Dhabi",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl bg-milk p-6 shadow-md border-2 border-honey/30 flex flex-col justify-between"
            >
              <p className="font-plush-text text-cocoa text-base italic leading-relaxed">
                “{item.quote}”
              </p>
              <footer className="mt-4 pt-4 border-t border-cocoa/10">
                <p className="font-scrawl text-toffee text-lg font-bold">{item.author}</p>
                <p className="text-xs text-cocoa-soft font-medium">{item.location}</p>
              </footer>
            </div>
          ))}
        </div>

        {/* Polaroid Memory Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(rev)}
              className="tp-polaroid group block rounded-2xl bg-milk p-3 pb-5 shadow-lg transition-transform hover:scale-105 hover:z-20 cursor-pointer"
              style={{
                transform: `rotate(${rev.tilt || '0deg'})`,
              }}
            >
              {/* Tape Graphic */}
              <div
                className="tp-tape tp-tape--center mx-auto mb-2 h-4 w-14 rounded-sm opacity-80"
                style={{ backgroundColor: rev.tape || '#f6d79a' }}
              ></div>

              <div className="aspect-square w-full overflow-hidden rounded-xl bg-cocoa/10 mb-3 shadow-inner">
                <img
                  src={rev.image}
                  alt={rev.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <p className="font-scrawl text-cocoa text-sm text-center px-1 font-medium">
                {rev.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cocoa/80 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-2xl rounded-3xl bg-milk p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-cocoa text-milk hover:scale-105 transition"
            >
              ✕
            </button>
            <div className="aspect-square w-full max-h-[70vh] overflow-hidden rounded-2xl bg-cocoa/10 mb-4">
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-scrawl text-2xl text-cocoa">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
