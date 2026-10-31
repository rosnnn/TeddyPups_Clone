import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PupBuddy from '../components/pup/PupBuddy';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('local'); // 'local' | 'imported'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.dispatchEvent(
      new CustomEvent('pup:cue', {
        detail: {
          say: tab === 'local' ? 'downtown dubai!' : 'korea to dubai!',
          secs: 1.5,
        },
      })
    );
  };

  return (
    <div className="tp-page" data-page="how">
      <section
        aria-labelledby="how-title"
        className="tp-scene"
        data-pup-scene="true"
        data-tone="light"
        style={{ '--sky-top': '#fffbf3', '--sky-bottom': '#f6cc85' }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 className="font-plush text-giant md:col-span-7" id="how-title">
              How it works
            </h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          {/* Quick Anchor Navigation */}
          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#two-ways">
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#promise">
              <span className="font-plush text-toffee">2</span> Our premium puppy promise
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#delivery">
              <span className="font-plush text-toffee">3</span> Delivery &amp; collection
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#why">
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          {/* Section 1: Two Ways Home */}
          <div id="two-ways" className="mt-16 md:mt-24">
            <section aria-labelledby="two-ways-title" className="tp-journeys">
              <div className="tp-journeys__top flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="font-scrawl tp-journeys__kicker">choose your way</p>
                  <h2 className="font-plush text-big" id="two-ways-title">
                    Two ways home
                  </h2>
                </div>

                <div className="tp-journeys__pick flex items-center gap-6">
                  <div
                    aria-label="Ways to bring your puppy home"
                    className="tp-switch"
                    role="tablist"
                    style={{ '--at': activeTab === 'local' ? 0 : 1, '--n': 2 }}
                  >
                    <span aria-hidden="true" className="tp-switch__thumb" />
                    <button
                      aria-controls="panel-local"
                      aria-selected={activeTab === 'local'}
                      className="tp-switch__tab"
                      id="tab-local"
                      role="tab"
                      type="button"
                      onClick={() => handleTabChange('local')}
                    >
                      <span className="font-plush tp-switch__label">In Dubai</span>
                      <span className="tp-switch__hint">meet in person</span>
                    </button>
                    <button
                      aria-controls="panel-imported"
                      aria-selected={activeTab === 'imported'}
                      className="tp-switch__tab"
                      id="tab-imported"
                      role="tab"
                      type="button"
                      onClick={() => handleTabChange('imported')}
                    >
                      <span className="font-plush tp-switch__label">Imported</span>
                      <span className="tp-switch__hint">order upon request</span>
                    </button>
                  </div>

                  <div className="pup-buddy tp-journeys__teddy hidden sm:block w-28" data-facing="right">
                    <PupBuddy facing="right" pose="sit" />
                  </div>
                </div>
              </div>

              {/* Tab Panel: In Dubai */}
              {activeTab === 'local' ? (
                <div className="tp-journey" id="panel-local" role="tabpanel">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">Meet your puppy in person</h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)]">
                        Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.
                      </p>
                    </div>

                    <div aria-hidden="true" className="tp-postcard">
                      <span className="tp-postcard__sun" />
                      <svg aria-hidden="true" className="tp-postcard__city" viewBox="0 0 300 120">
                        <path
                          d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.6"
                        />
                      </svg>
                      <span className="font-scrawl tp-postcard__to tp-postcard__to--left">
                        Downtown Dubai
                      </span>
                    </div>
                  </div>

                  <ol className="tp-steps">
                    <li className="tp-step" style={{ '--i': 0, '--tint': '#fbe3b4' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <circle cx="21" cy="21" fill="none" r="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                          <path d="m30 30 10 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                          <path d="M21 27c-3-2-4.4-3.6-4.4-5.2a2.2 2.2 0 0 1 4.4-.4 2.2 2.2 0 0 1 4.4.4c0 1.6-1.4 3.2-4.4 5.2z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 1</span>
                      <h4 className="font-plush-text tp-step__title">Explore our puppies</h4>
                      <p className="tp-step__text">
                        Browse our website to view available puppies. Each listing includes photos, breed details, age, and health records.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 1, '--tint': '#fde6de' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M24 40C11 31 6 24.5 6 17.8 6 12.4 10.2 8 15.4 8c3.7 0 6.8 2.1 8.6 5.3C25.8 10.1 28.9 8 32.6 8 37.8 8 42 12.4 42 17.8 42 24.5 37 31 24 40z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 2</span>
                      <h4 className="font-plush-text tp-step__title">Visit our showroom</h4>
                      <p className="tp-step__text">
                        Schedule a private visit to our Downtown Dubai showroom to meet the puppies in person, interact with them, and find your match.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 2, '--tint': '#e2f0fb' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M12 8h24v32H12z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                          <path d="M18 16h12M18 24h12M18 32h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 3</span>
                      <h4 className="font-plush-text tp-step__title">Health check &amp; paperwork</h4>
                      <p className="tp-step__text">
                        Review vaccination records, microchip details, and veterinary health certificate before finalizing your puppy's adoption.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 3, '--tint': '#d6f0df' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M8 24l16-14 16 14v16H8z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                          <path d="M20 40v-10h8v10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 4</span>
                      <h4 className="font-plush-text tp-step__title">Take your puppy home</h4>
                      <p className="tp-step__text">
                        Take your new furry family member home the very same day, complete with starter food, guidance, and lifetime concierge support.
                      </p>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="tp-journey" id="panel-imported" role="tabpanel">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">Order upon request</h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)]">
                        Looking for a truly exceptional puppy? We partner with the most reputable teacup breeders in Korea and worldwide to source rare and miniature companions tailored to your desires.
                      </p>
                    </div>

                    <div aria-hidden="true" className="tp-postcard">
                      <span className="tp-postcard__sun" />
                      <svg aria-hidden="true" className="tp-postcard__city" viewBox="0 0 300 120">
                        <path d="M20 100 L90 30 L160 100 L230 40 L280 100 Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                        <path d="M120 45 L150 45 L160 35 L170 45 L200 45 L170 55 L160 65 L150 55 Z" fill="currentColor" opacity="0.6" />
                      </svg>
                      <span className="font-scrawl tp-postcard__to tp-postcard__to--left">
                        Korea to Dubai
                      </span>
                    </div>
                  </div>

                  <ol className="tp-steps">
                    <li className="tp-step" style={{ '--i': 0, '--tint': '#fbe3b4' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <circle cx="24" cy="20" r="10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
                          <path d="M10 40c0-6 6-10 14-10s14 4 14 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 1</span>
                      <h4 className="font-plush-text tp-step__title">Consultation &amp; selection</h4>
                      <p className="tp-step__text">
                        Discuss your dream puppy with our concierge — breed, micro/teacup size, coat color, facial teddy traits, and timeline.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 1, '--tint': '#fde6de' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M8 12h32v24H8z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
                          <circle cx="24" cy="24" r="6" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 2</span>
                      <h4 className="font-plush-text tp-step__title">Matching &amp; health vetting</h4>
                      <p className="tp-step__text">
                        We collaborate with certified breeders in Korea, sharing real 4K videos, close-up photos, and certified veterinary checks for approval.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 2, '--tint': '#e2f0fb' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M6 26l18-3 12-14h5l-5 14 11-1 5-6h3l-2 8 2 8h-3l-5-6-11-1 5 14h-5L24 29 6 26z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 3</span>
                      <h4 className="font-plush-text tp-step__title">Travel &amp; logistics</h4>
                      <p className="tp-step__text">
                        We manage international documentation, export permits, and flight booking via climate-controlled pet cargo to Dubai.
                      </p>
                    </li>

                    <li className="tp-step" style={{ '--i': 3, '--tint': '#d6f0df' }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M24 8l16 14v18H8V22z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                          <circle cx="24" cy="28" r="5" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 4</span>
                      <h4 className="font-plush-text tp-step__title">Arrival &amp; welcome</h4>
                      <p className="tp-step__text">
                        Receive your puppy safely at Dubai airport or enjoy white-glove direct delivery to your home, rested, happy, and vet-cleared.
                      </p>
                    </li>
                  </ol>
                </div>
              )}
            </section>
          </div>

          {/* Section 2: Puppy Promise (Passport Stamps) */}
          <div id="promise" className="mt-24 md:mt-32">
            <p aria-hidden="true" className="font-scrawl text-lg text-toffee-ink">
              puppy passport
            </p>
            <h2 className="font-plush text-huge mt-1 max-w-[16ch]" id="promise-title">
              Our premium puppy promise
            </h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <li className="tp-entry" style={{ '--ink-stamp': '#a24a1a', '--tilt': '-8deg', '--i': 0 }}>
                <span className="tp-stamp tp-stamp--round">
                  <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                    <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Hand-selected breeders</span>
                </span>
                <p className="tp-entry__text">
                  We work only with certified breeders who uphold the highest ethical, genetic, and health standards.
                </p>
              </li>

              <li className="tp-entry" style={{ '--ink-stamp': '#1f6b45', '--tilt': '5deg', '--i': 1 }}>
                <span className="tp-stamp tp-stamp--ticket">
                  <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                    <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d="M8 50c10 4 20 4 30 0" fill="none" stroke="currentColor" strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Full transparency</span>
                </span>
                <p className="tp-entry__text">
                  Photos, videos, and full veterinary certificates are shared before your puppy travels.
                </p>
              </li>

              <li className="tp-entry" style={{ '--ink-stamp': '#5a3a28', '--tilt': '-4deg', '--i': 2 }}>
                <span className="tp-stamp tp-stamp--oval">
                  <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                    <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <span className="tp-stamp__title font-plush">24/7 post-adoption</span>
                </span>
                <p className="tp-entry__text">
                  Our puppy care specialists are always available for training, nutrition, and veterinary guidance.
                </p>
              </li>
            </ul>
          </div>

          {/* Section 3: Delivery & Collection */}
          <div id="delivery" className="mt-24 md:mt-32">
            <h2 className="font-plush text-huge" id="delivery-title">
              Delivery &amp; collection
            </h2>
            <p className="text-lede mt-5 text-[var(--ink-soft)] max-w-[50ch]">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <li className="rounded-2xl bg-[var(--color-creme)] p-6">
                <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                  Take your puppy home the same day
                </h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Local puppies are available immediately — visit our showroom, fall in love, and go home together.
                </p>
              </li>

              <li className="rounded-2xl bg-[var(--color-creme)] p-6">
                <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                  Delivery within Dubai
                </h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Prefer to stay home? We deliver your puppy to your doorstep within Dubai, safely and comfortably.
                </p>
              </li>

              <li className="rounded-2xl bg-[var(--color-creme)] p-6">
                <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                  Safe international cargo
                </h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  We handle all documentation and climate-controlled travel so your puppy arrives happy and stress-free.
                </p>
              </li>

              <li className="rounded-2xl bg-[var(--color-creme)] p-6">
                <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                  Worldwide delivery
                </h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Our certified global partners deliver to loving families across the GCC and internationally.
                </p>
              </li>
            </ul>
          </div>

          {/* Section 4: Why choose us */}
          <div id="why" className="mt-24 md:mt-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="font-plush text-huge" id="why-title">
                  Why choose us
                </h2>
                <p className="text-lede mt-6 text-[var(--ink-soft)]">
                  We're here to help you find a new family member. From the moment you browse our site to the joyful day your puppy arrives at your door, we're with you every step of the way.
                </p>
              </div>

              <ul className="space-y-8 lg:col-span-7">
                <li className="flex gap-5">
                  <svg aria-hidden="true" className="size-14 shrink-0 text-toffee-deep" viewBox="0 0 64 64">
                    <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <div>
                    <h3 className="font-plush text-[1.7rem]">International cargo</h3>
                    <p className="mt-2 text-[var(--ink-soft)]">
                      We safely deliver puppies to loving homes worldwide. Our trusted partners ensure your new furry friend travels comfortably and arrives safely.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5">
                  <svg aria-hidden="true" className="size-14 shrink-0 text-toffee-deep" viewBox="0 0 64 64">
                    <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <div>
                    <h3 className="font-plush text-[1.7rem]">24/7 Concierge Support</h3>
                    <p className="mt-2 text-[var(--ink-soft)]">
                      Questions at 2 AM? Need feeding advice? Our team is always one WhatsApp message away.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5">
                  <svg aria-hidden="true" className="size-14 shrink-0 text-toffee-deep" viewBox="0 0 64 64">
                    <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                  <div>
                    <h3 className="font-plush text-[1.7rem]">Verified health certificates</h3>
                    <p className="mt-2 text-[var(--ink-soft)]">
                      Every puppy comes vaccinated, microchipped, and certified healthy by licensed veterinarians.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom CTA Card */}
            <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl bg-[var(--color-creme)] p-8 text-center md:flex-row md:text-left">
              <div>
                <h3 className="font-plush text-3xl">Ready to meet your new puppy?</h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Browse our available puppies or message our concierge on WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/puppies" className="btn btn-primary">
                  View puppies
                </Link>
                <a
                  href="https://wa.me/971507779999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Chat with concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
