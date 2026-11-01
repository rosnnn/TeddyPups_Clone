import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';

export default function PuppyDetailPage() {
  const { slug } = useParams();

  const puppy = PUPPIES.find((p) => p.slug === slug);
  const [activeMedia, setActiveMedia] = useState('photo'); // 'photo' | 'video'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');

  if (!puppy) {
    return (
      <div className="gutter mx-auto max-w-xl py-24 text-center">
        <h1 className="font-plush text-4xl text-cocoa">Puppy not found</h1>
        <p className="text-cocoa-soft mt-3">We couldn't find the puppy listing you were looking for.</p>
        <Link to="/puppies" className="btn btn-primary mt-6">
          View all available puppies
        </Link>
      </div>
    );
  }

  // Find next and previous puppies
  const currentIndex = PUPPIES.findIndex((p) => p.slug === slug);
  const prevPuppy = currentIndex > 0 ? PUPPIES[currentIndex - 1] : null;
  const nextPuppy = currentIndex < PUPPIES.length - 1 ? PUPPIES[currentIndex + 1] : null;

  const isGone = puppy.status === 'Gone Home';
  const waMessage = encodeURIComponent(
    `Hi TeddyPups! I would love to enquire about ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.age}). Could you please share more information and pricing?`
  );

  return (
    <div data-page="pup" className="tp-page pt-8 pb-24">
      <div className="gutter mx-auto max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-cocoa-soft">
          <Link to="/" className="hover:text-toffee">Home</Link>
          <span>/</span>
          <Link to="/puppies" className="hover:text-toffee">Puppies</Link>
          <span>/</span>
          <span className="font-semibold text-cocoa">{puppy.name}</span>
        </nav>

        {/* Storybook Container */}
        <article className="rounded-[3rem] bg-milk p-6 md:p-12 shadow-2xl border-4 border-honey/40 space-y-16">
          {/* Top Title Bar */}
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-scrawl text-lg text-toffee-ink font-bold block">
                Chapter 1 · Meet your puppy
              </span>
              <h1 className="font-plush text-5xl text-cocoa mt-1">{puppy.name}</h1>
              <p className="text-lg font-semibold text-toffee-deep mt-1">
                {puppy.meta || `${puppy.breed} · ${puppy.gender} · ${puppy.age}`}
              </p>
            </div>

            <span
              className={`font-scrawl self-start md:self-auto rounded-full px-5 py-2 text-base shadow-sm ${
                isGone ? 'bg-blush text-cocoa' : 'bg-honey text-cocoa font-bold'
              }`}
            >
              {isGone ? 'gone home ♥' : 'Available in Dubai'}
            </span>
          </div>

          {/* Chapter 1: Gallery & Video */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-honey-soft/30 border-2 border-cocoa/10 shadow-md">
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
              </div>

              {/* Media Toggle Pills */}
              {puppy.hasVideo && puppy.videoUrl && (
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveMedia('photo')}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                      activeMedia === 'photo'
                        ? 'bg-cocoa text-milk'
                        : 'bg-honey-soft/50 text-cocoa hover:bg-honey-soft'
                    }`}
                  >
                    📷 Real Photos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMedia('video')}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                      activeMedia === 'video'
                        ? 'bg-cocoa text-milk'
                        : 'bg-honey-soft/50 text-cocoa hover:bg-honey-soft'
                    }`}
                  >
                    ▶ Video Clips
                  </button>
                </div>
              )}
            </div>

            {/* Quick Passport Details */}
            <div className="md:col-span-4 rounded-3xl bg-honey-soft/30 p-6 space-y-4 border border-honey">
              <h3 className="font-plush text-xl text-cocoa">Puppy Passport</h3>
              <div className="space-y-2 text-sm text-cocoa-soft">
                <div className="flex justify-between py-1 border-b border-cocoa/10">
                  <span className="font-semibold text-cocoa">Breed:</span>
                  <span>{puppy.breed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cocoa/10">
                  <span className="font-semibold text-cocoa">Gender:</span>
                  <span>{puppy.gender}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cocoa/10">
                  <span className="font-semibold text-cocoa">Age:</span>
                  <span>{puppy.age}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cocoa/10">
                  <span className="font-semibold text-cocoa">Microchip:</span>
                  <span className="text-emerald-700 font-semibold">Active & Registered</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cocoa/10">
                  <span className="font-semibold text-cocoa">Passport:</span>
                  <span className="text-emerald-700 font-semibold">UAE Ready</span>
                </div>
              </div>

              {!isGone && (
                <a
                  href={`https://wa.me/971541676733?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full flex justify-center text-sm mt-4"
                >
                  Adopt on WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Chapter 2: Personality & Profile */}
          <section className="border-t-2 border-honey/40 pt-10">
            <span className="font-scrawl text-lg text-toffee-ink font-bold block mb-2">
              Chapter 2 · Personality &amp; traits
            </span>
            <h2 className="font-plush text-3xl text-cocoa mb-4">About {puppy.name}</h2>
            <p className="text-base text-cocoa-soft leading-relaxed max-w-3xl">
              {puppy.description ||
                `${puppy.name} is a bundle of joy with a warm and cuddly temperament. Raised in an attentive, hygienic environment with daily socialization, gentleness, and proper nutrition.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Hypoallergenic Coat',
                'Vet Checked',
                'Vaccinated & Dewormed',
                'Healthy Dental & Heart Check',
                'Loves Cuddles',
              ].map((trait) => (
                <span
                  key={trait}
                  className="rounded-full bg-honey/40 px-4 py-1.5 text-xs font-semibold text-cocoa"
                >
                  ✓ {trait}
                </span>
              ))}
            </div>
          </section>

          {/* Chapter 3: How to Bring Puppy Home */}
          <section className="border-t-2 border-honey/40 pt-10">
            <span className="font-scrawl text-lg text-toffee-ink font-bold block mb-2">
              Chapter 3 · How to bring {puppy.name} home
            </span>
            <h2 className="font-plush text-3xl text-cocoa mb-6">Simple 3-step adoption</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-[#fffaf0] p-6 border border-honey">
                <span className="font-plush text-3xl text-toffee font-bold block mb-2">1</span>
                <h4 className="font-plush text-lg text-cocoa mb-1">WhatsApp Consultation</h4>
                <p className="text-xs text-cocoa-soft leading-relaxed">
                  Message us to confirm availability, request live video, and ask any questions.
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf0] p-6 border border-honey">
                <span className="font-plush text-3xl text-toffee font-bold block mb-2">2</span>
                <h4 className="font-plush text-lg text-cocoa mb-1">Showroom Meet / Delivery</h4>
                <p className="text-xs text-cocoa-soft leading-relaxed">
                  Visit our Downtown Dubai showroom or opt for safe, air-conditioned delivery to your home.
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf0] p-6 border border-honey">
                <span className="font-plush text-3xl text-toffee font-bold block mb-2">3</span>
                <h4 className="font-plush text-lg text-cocoa mb-1">Welcome Home!</h4>
                <p className="text-xs text-cocoa-soft leading-relaxed">
                  Receive the starter bundle, certified papers, and our 24/7 care hotline.
                </p>
              </div>
            </div>
          </section>

          {/* Chapter 4: Enquiry / WhatsApp Booking */}
          <section className="border-t-2 border-honey/40 pt-10">
            <span className="font-scrawl text-lg text-toffee-ink font-bold block mb-2">
              Chapter 4 · Reserve {puppy.name}
            </span>
            <div className="rounded-3xl bg-[#fffaf0] p-8 md:p-10 border-2 border-honey">
              <h3 className="font-plush text-3xl text-cocoa mb-3">
                Ready to make {puppy.name} part of your family?
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed max-w-xl mb-6">
                Our concierge responds instantly on WhatsApp with details, showroom directions, and adoption paperwork.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/971541676733?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  💬 Enquire on WhatsApp Now
                </a>
                <Link to="/contact" className="btn btn-primary">
                  Schedule Showroom Visit
                </Link>
              </div>
            </div>
          </section>

          {/* Previous / Next Puppy Navigation */}
          <nav aria-label="More puppies" className="border-t border-cocoa/10 pt-8 flex items-center justify-between">
            {prevPuppy ? (
              <Link
                to={`/puppies/${prevPuppy.slug}`}
                className="flex items-center gap-3 text-cocoa hover:text-toffee font-semibold text-sm transition"
              >
                <span>←</span>
                <span>Previous: {prevPuppy.name}</span>
              </Link>
            ) : (
              <div></div>
            )}

            {nextPuppy && (
              <Link
                to={`/puppies/${nextPuppy.slug}`}
                className="flex items-center gap-3 text-cocoa hover:text-toffee font-semibold text-sm transition"
              >
                <span>Next: {nextPuppy.name}</span>
                <span>→</span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
