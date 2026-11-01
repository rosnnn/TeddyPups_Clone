import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function PuppyGallery({ name, media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef(null);

  const total = media.length;
  const currentMedia = media[activeIndex] || media[0];

  const goTo = useCallback(
    (newIndex) => {
      if (total <= 1) return;
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex((newIndex % total + total) % total);
    },
    [activeIndex, total]
  );

  // Keyboard navigation when lightbox is active
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        dialogRef.current?.close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, activeIndex, goTo]);

  if (!currentMedia) return null;

  const labelFor = (idx) => {
    const item = media[idx] || {};
    return `${name}, ${item.kind === 'video' ? 'video' : 'photo'} ${idx + 1} of ${total}`;
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    dialogRef.current?.close();
  };

  return (
    <div>
      {/* 3D Storypage Main Frame */}
      <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
        <button
          type="button"
          onClick={openLightbox}
          className="absolute inset-0 block size-full cursor-pointer focus:outline-none"
          aria-label={`Open ${labelFor(activeIndex)} full screen`}
          style={{
            perspective: 1400,
          }}
        >
          {currentMedia.kind === 'video' ? (
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              poster={currentMedia.poster?.url || currentMedia.poster || ''}
              className="size-full object-cover transition-opacity duration-500"
              muted
              loop
              playsInline
              autoPlay
              aria-label={currentMedia.alt || `Video of ${name}`}
            />
          ) : (
            <img
              key={currentMedia.url}
              src={currentMedia.url}
              alt={currentMedia.alt || `${name} puppy photo`}
              className="size-full object-cover transition-opacity duration-500"
              loading="eager"
            />
          )}
        </button>

        {/* Carousel Prev/Next Overlay Controls */}
        {total > 1 && (
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-auto z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex - 1);
              }}
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk backdrop-blur-sm shadow">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex + 1);
              }}
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {total > 1 && (
        <ul
          className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
          aria-label={`All photos of ${name}`}
        >
          {media.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const thumbSrc = item.kind === 'video' ? (item.poster?.url || item.poster || item.url) : item.url;
            return (
              <li key={item.id || idx} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={labelFor(idx)}
                  aria-current={isCurrent}
                  className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-all duration-300 md:h-28 md:w-24 ${
                    isCurrent
                      ? '-rotate-3 -translate-y-1 border-toffee-deep shadow-md'
                      : 'border-cocoa/30 opacity-75 hover:opacity-100 hover:-rotate-2 hover:border-cocoa'
                  }`}
                >
                  <img
                    src={thumbSrc}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  {item.kind === 'video' && (
                    <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-lg text-milk">
                      ▶
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Fullscreen Lightbox Modal Dialog */}
      <dialog
        ref={dialogRef}
        aria-label={`${name} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 z-[200] overflow-hidden"
        onClose={closeLightbox}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
      >
        {isLightboxOpen && (
          <div className="flex h-full flex-col">
            {/* Lightbox Header */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-cocoa/40 border-b border-milk/10">
              <p className="font-scrawl text-lg text-honey">{labelFor(activeIndex)}</p>
              <button
                type="button"
                onClick={closeLightbox}
                className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa hover:bg-honey transition"
              >
                Close
              </button>
            </div>

            {/* Media Viewer */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              {currentMedia.kind === 'video' ? (
                <video
                  src={currentMedia.url}
                  poster={currentMedia.poster?.url || currentMedia.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.alt || name}
                  className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
                />
              )}

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 grid size-14 place-items-center rounded-full bg-milk/20 hover:bg-milk/40 text-milk text-3xl font-bold backdrop-blur-sm transition"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 grid size-14 place-items-center rounded-full bg-milk/20 hover:bg-milk/40 text-milk text-3xl font-bold backdrop-blur-sm transition"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer Navigation */}
            {total > 1 && (
              <div className="flex justify-center items-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 bg-cocoa/40 border-t border-milk/10">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="h-12 rounded-full border-2 border-milk px-6 font-semibold text-milk hover:bg-milk/10 transition"
                >
                  Previous
                </button>
                <span className="font-semibold text-sm text-honey">
                  {activeIndex + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa hover:bg-honey-soft transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
