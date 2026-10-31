import React, { useEffect } from 'react';

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }) {
  if (currentIndex === null || currentIndex === undefined || !photos || !photos[currentIndex]) {
    return null;
  }

  const current = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + photos.length) % photos.length);
      else if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, photos, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a170e]/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-label="Photo viewer"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        type="button"
        className="absolute top-6 right-6 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-milk hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close photo viewer"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev button */}
      {photos.length > 1 && (
        <button
          type="button"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-milk hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + photos.length) % photos.length);
          }}
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Main card */}
      <div
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#fffefb] p-3 sm:p-4 shadow-2xl">
          <img
            src={current.image || current.src}
            alt={current.caption || current.alt || 'Happy TeddyPups family photo'}
            className="max-h-[72vh] max-w-full rounded-xl object-contain"
          />
          {current.caption && (
            <p className="mt-3 text-center font-scrawl text-xl text-[#5a3a28]">
              {current.caption}
            </p>
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-white/70">
          {currentIndex + 1} of {photos.length}
        </p>
      </div>

      {/* Next button */}
      {photos.length > 1 && (
        <button
          type="button"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-milk hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % photos.length);
          }}
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
