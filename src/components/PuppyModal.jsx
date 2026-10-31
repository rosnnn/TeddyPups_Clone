import React, { useState } from 'react';

export default function PuppyModal({ puppy, onClose }) {
  if (!puppy) return null;

  const [activeMedia, setActiveMedia] = useState('photo'); // 'photo' | 'video'
  const isGone = puppy.status === 'Gone Home';

  const waMessage = encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.age}). Could you please share more details and arrange a viewing?`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-milk p-6 shadow-2xl md:p-8 border-4 border-honey/40">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-cocoa text-milk hover:scale-105 active:scale-95 transition"
          aria-label="Close details"
        >
          ✕
        </button>

        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Media Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-honey-soft/20 border-2 border-cocoa/10 shadow-inner">
              {activeMedia === 'video' && puppy.videoUrl ? (
                <video
                  src={puppy.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={puppy.coverImage || '/brand/logo.png'}
                  alt={puppy.name}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Status Sticker */}
              <span
                className={`font-scrawl absolute left-3 top-3 rounded-full px-3 py-1 text-sm shadow-md ${
                  isGone ? 'bg-blush text-cocoa' : 'bg-honey text-cocoa'
                }`}
              >
                {isGone ? 'gone home ♥' : 'Available'}
              </span>
            </div>

            {/* Media Selector Tabs (Photo vs Video) */}
            {puppy.hasVideo && puppy.videoUrl && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMedia('photo')}
                  className={`flex-1 rounded-xl py-2 font-semibold text-sm transition ${
                    activeMedia === 'photo'
                      ? 'bg-cocoa text-milk'
                      : 'bg-honey-soft/40 text-cocoa hover:bg-honey-soft'
                  }`}
                >
                  📷 Photos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`flex-1 rounded-xl py-2 font-semibold text-sm transition ${
                    activeMedia === 'video'
                      ? 'bg-cocoa text-milk'
                      : 'bg-honey-soft/40 text-cocoa hover:bg-honey-soft'
                  }`}
                >
                  ▶ Watch Video
                </button>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-scrawl text-sm text-toffee-ink uppercase tracking-wider">
                  Verified Purebred
                </span>
                <span className="size-1.5 rounded-full bg-toffee-ink/40"></span>
                <span className="font-scrawl text-sm text-toffee-ink">Dubai Showroom</span>
              </div>

              <h2 className="font-plush text-4xl text-cocoa mt-1">{puppy.name}</h2>
              <p className="text-lg font-semibold text-toffee-deep mt-1">
                {puppy.meta || `${puppy.breed} · ${puppy.gender} · ${puppy.age}`}
              </p>

              {/* Key Highlights */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-semibold text-cocoa">
                <div className="rounded-xl bg-honey-soft/40 p-2.5 flex items-center gap-2">
                  <span>🩺</span> Vet Checked & Healthy
                </div>
                <div className="rounded-xl bg-honey-soft/40 p-2.5 flex items-center gap-2">
                  <span>💉</span> Full Vaccinations
                </div>
                <div className="rounded-xl bg-honey-soft/40 p-2.5 flex items-center gap-2">
                  <span>📍</span> Microchipped
                </div>
                <div className="rounded-xl bg-honey-soft/40 p-2.5 flex items-center gap-2">
                  <span>✈️</span> UAE Pet Passport
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-cocoa/10 pt-4">
                <h3 className="font-scrawl text-lg text-cocoa font-bold">About {puppy.name}</h3>
                <p className="text-sm text-cocoa-soft leading-relaxed mt-2">
                  {puppy.description ||
                    `${puppy.name} is a delightful ${puppy.breed} with an incredibly loving temperament, soft plush coat, and playful spirit. Fully socialized, happy, and eager to meet their new family.`}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-cocoa/10 space-y-3">
              {!isGone ? (
                <>
                  <a
                    href={`https://wa.me/971541676733?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full py-3.5 text-center text-base font-semibold shadow-lg hover:shadow-xl transition block"
                  >
                    💬 Ask About {puppy.name} on WhatsApp
                  </a>
                  <p className="text-center text-xs text-cocoa-soft">
                    Instant reply · Downtown Dubai Showroom visit available today
                  </p>
                </>
              ) : (
                <div className="rounded-xl bg-blush/40 p-4 text-center">
                  <p className="font-scrawl text-lg text-cocoa">
                    {puppy.name} has happily found their forever family!
                  </p>
                  <a
                    href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20saw%20a%20puppy%20that%20went%20home%20and%20would%20love%20to%20reserve%20a%20similar%20one."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-cocoa px-5 py-2 text-xs font-semibold text-milk hover:bg-toffee"
                  >
                    Request Similar Puppy on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
