import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('local'); // 'local' | 'imported'

  return (
    <div data-page="how-it-works" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Header */}
        <header className="mb-14 text-center">
          <p className="font-scrawl text-lg text-toffee-ink">safe, transparent, joyful</p>
          <h1 className="font-plush text-giant text-cocoa mt-2">How it works</h1>
          <p className="text-lede mt-4 max-w-[56ch] mx-auto text-cocoa-soft leading-relaxed">
            Whether adopting locally from our Downtown Dubai showroom or reserving an imported rare teacup puppy, we handle every detail from health to travel.
          </p>
        </header>

        {/* Two Ways Interactive Switcher */}
        <div className="mb-20 rounded-[3rem] bg-milk p-6 md:p-12 shadow-xl border-4 border-honey/40">
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full bg-honey-soft/50 p-1.5 border border-cocoa/10">
              <button
                type="button"
                onClick={() => setActiveTab('local')}
                className={`rounded-full px-8 py-3 font-plush text-lg font-bold transition-all ${
                  activeTab === 'local'
                    ? 'bg-cocoa text-milk shadow-md'
                    : 'text-cocoa hover:text-toffee'
                }`}
              >
                In Dubai Today
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('imported')}
                className={`rounded-full px-8 py-3 font-plush text-lg font-bold transition-all ${
                  activeTab === 'imported'
                    ? 'bg-cocoa text-milk shadow-md'
                    : 'text-cocoa hover:text-toffee'
                }`}
              >
                Imported For You
              </button>
            </div>
          </div>

          {activeTab === 'local' ? (
            <div className="grid md:grid-cols-3 gap-8 items-stretch animate-fadeIn">
              <div className="rounded-3xl bg-honey-soft/30 p-8 flex flex-col justify-between border border-honey">
                <div>
                  <span className="font-plush text-4xl text-toffee font-bold block mb-3">01</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">Visit our showroom</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Book a private appointment or walk in to our Downtown Dubai showroom. Spend time playing and bonding with available puppies in a clean, loving setting.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-honey-soft/30 p-8 flex flex-col justify-between border border-honey">
                <div>
                  <span className="font-plush text-4xl text-toffee font-bold block mb-3">02</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">Review health papers</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Review veterinary health inspection, microchip documentation, and vaccination records. Every puppy has complete medical clearance.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-honey-soft/30 p-8 flex flex-col justify-between border border-honey">
                <div>
                  <span className="font-plush text-4xl text-toffee font-bold block mb-3">03</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">Take home same day</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Take your puppy home immediately with our starter pack, carrier, food supply, and 24/7 dedicated care concierge line.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 items-stretch animate-fadeIn">
              <div className="rounded-3xl bg-sky/20 p-8 flex flex-col justify-between border border-sky">
                <div>
                  <span className="font-plush text-4xl text-sky-deep font-bold block mb-3">01</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">Select your breed</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Tell us your exact preferences: size, gender, color, and coat type. We collaborate with internationally vetted, ethical teacup breeders in Korea and Europe.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-sky/20 p-8 flex flex-col justify-between border border-sky">
                <div>
                  <span className="font-plush text-4xl text-sky-deep font-bold block mb-3">02</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">Photo & video updates</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Receive weekly high-definition videos, personality assessments, and clinical vet reports tracking your puppy's healthy development.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-sky/20 p-8 flex flex-col justify-between border border-sky">
                <div>
                  <span className="font-plush text-4xl text-sky-deep font-bold block mb-3">03</span>
                  <h3 className="font-plush text-2xl text-cocoa mb-3">VIP flight to Dubai</h3>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Puppies travel in first-class, temperature-regulated pet cabins accompanied by pet couriers, clearing customs smoothly and delivered to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Our Premium Puppy Promise */}
        <section className="mb-20">
          <h2 className="font-plush text-4xl text-cocoa text-center mb-12">
            Our premium puppy promise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📋',
                title: 'Official UAE Passport',
                desc: 'Government stamped pet passport with full microchip record and history.',
              },
              {
                icon: '💉',
                title: 'Complete Vaccinations',
                desc: 'DHPPi, Rabies (where age appropriate), and comprehensive deworming treatment.',
              },
              {
                icon: '🛡️',
                title: 'Health Guarantee',
                desc: 'Coverage against hereditary conditions with certified veterinary replacement warranty.',
              },
              {
                icon: '📞',
                title: '24/7 Lifelong Advice',
                desc: 'Dedicated pet care specialist available around the clock on WhatsApp.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-3xl bg-milk p-6 shadow-sm border border-honey/40 text-center"
              >
                <span className="text-4xl block mb-3">{p.icon}</span>
                <h3 className="font-plush text-xl text-cocoa mb-2">{p.title}</h3>
                <p className="text-xs text-cocoa-soft leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Bar */}
        <div className="rounded-[2.5rem] bg-cocoa p-10 text-milk text-center">
          <h2 className="font-plush text-3xl text-honey">Have questions about the process?</h2>
          <p className="text-milk/80 max-w-xl mx-auto mt-2 text-sm leading-relaxed">
            Our team speaks English, Arabic, and Russian. Let us assist you with any questions about breeding, timing, or delivery.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20like%20to%20know%20more%20about%20your%20adoption%20process."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Ask on WhatsApp
            </a>
            <Link to="/contact" className="btn btn-ghost text-milk border-milk/40 hover:border-milk">
              Book Showroom Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
