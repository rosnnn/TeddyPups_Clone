import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';
import REVIEWS from '../data/reviews';
import FAQS from '../data/faq';
import PuppyModal from '../components/PuppyModal';

export default function HomePage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [chatStep, setChatStep] = useState(0);

  const availablePuppies = PUPPIES.filter((p) => p.status === 'Available');
  const featuredPuppies = availablePuppies.slice(0, 8);
  const previewReviews = REVIEWS.slice(0, 8);
  const previewFaqs = FAQS.slice(0, 3);

  return (
    <div data-page="home" className="tp-page">
      {/* SECTION 1: HERO */}
      <div data-section="hero">
        <section
          aria-labelledby="hero-title"
          className="tp-scene tp-hero"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#fffdf8', '--sky-bottom': '#fff1d8', '--quilt': '#fff1d8' }}
        >
          <span aria-hidden="true" className="tp-hero__sun"></span>
          <div className="tp-hero__copy gutter">
            <p className="tp-hero__note font-scrawl relative inline-block">
              every puppy is family
              <svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" preserveAspectRatio="none" viewBox="0 0 220 24">
                <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              </svg>
            </p>
            <h1 className="tp-hero__title font-plush" id="hero-title">
              <span className="tp-hero__line block">Premium teacup</span>
              <span className="tp-hero__line tp-hero__line--2 block">puppies in Dubai</span>
            </h1>
            <p className="tp-hero__lede">
              Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
            </p>
            <div className="tp-hero__actions">
              <Link className="btn btn-primary" to="/puppies">View available puppies</Link>
              <a
                className="btn btn-ghost"
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Hero Puppet Lineup */}
          <div className="tp-hero__stage">
            <ul aria-label="Some of the puppies in our showroom" className="tp-lineup">
              {featuredPuppies.slice(0, 6).map((pup, idx) => {
                const tilts = ['-5deg', '3deg', '-2deg', '3deg', '-3deg', '4deg'];
                const xs = ['9%', '22.5%', '35%', '65%', '77.5%', '91%'];
                const widths = ['8.6rem', '10.4rem', '9.2rem', '9.4rem', '10.6rem', '8.4rem'];
                const peeks = [0.62, 0.8, 0.7, 0.74, 0.82, 0.6];
                return (
                  <li
                    key={pup.slug}
                    className="tp-lineup__seat"
                    style={{
                      '--x': xs[idx] || '50%',
                      '--w': widths[idx] || '9rem',
                      '--peek': peeks[idx] || 0.7,
                      '--tilt': tilts[idx] || '0deg',
                      '--i': idx
                    }}
                  >
                    <button
                      type="button"
                      aria-label={`Meet ${pup.name}, ${pup.breed}`}
                      className="tp-lineup__pup block w-full h-full cursor-pointer focus:outline-none"
                      onClick={() => setSelectedPuppy(pup)}
                    >
                      <span className="tp-lineup__photo relative block overflow-hidden rounded-full shadow-md">
                        <img
                          alt={pup.name}
                          src={pup.coverImage}
                          className="h-full w-full object-cover"
                          loading="eager"
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
              {featuredPuppies.slice(0, 6).map((pup, idx) => {
                const tilts = ['-5deg', '3deg', '-2deg', '3deg', '-3deg', '4deg'];
                const xs = ['9%', '22.5%', '35%', '65%', '77.5%', '91%'];
                const widths = ['8.6rem', '10.4rem', '9.2rem', '9.4rem', '10.6rem', '8.4rem'];
                return (
                  <li
                    key={pup.slug}
                    className="tp-lineup__seat"
                    style={{
                      '--x': xs[idx] || '50%',
                      '--w': widths[idx] || '9rem',
                      '--tilt': tilts[idx] || '0deg',
                      '--i': idx
                    }}
                  >
                    <span className="tp-lineup__ghost">
                      <span className="tp-lineup__name font-scrawl text-cocoa">{pup.name}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Quilt Scallop Border */}
            <div aria-hidden="true" className="tp-quilt">
              <svg className="tp-quilt__edge" height="40" preserveAspectRatio="none" width="100%">
                <defs>
                  <pattern height="40" id="tp-scallop-home" patternUnits="userSpaceOnUse" width="76">
                    <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fff1d8"></path>
                    <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3"></path>
                    <path d="M11 33A27 19 0 0 1 65 33" fill="none" opacity=".42" stroke="#2a170e" strokeDasharray="3.5 5.5" strokeLinecap="round" strokeWidth="1.6"></path>
                  </pattern>
                </defs>
                <rect fill="url(#tp-scallop-home)" height="40" width="100%"></rect>
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: MEET THE PUPS (DOORS TREADMILL) */}
      <div data-section="meet">
        <section
          aria-labelledby="meet-title"
          className="tp-scene tp-meet"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#fff1d8', '--sky-bottom': '#fbe3b4' }}
        >
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="font-plush text-huge" id="meet-title">Meet the pups</h2>
                <p className="text-lede mt-3 max-w-[44ch] text-cocoa-soft">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>
              <Link className="btn btn-primary shrink-0" to="/puppies">
                See all available puppies
              </Link>
            </header>

            <div className="tp-meet__hall overflow-x-auto pb-8 pt-4 scrollbar-none">
              <ol aria-label="Puppies looking for a family" className="tp-meet__track flex gap-6 px-6 min-w-max">
                {availablePuppies.slice(0, 10).map((pup) => (
                  <li key={pup.slug} className="tp-door w-64 shrink-0" data-open="true">
                    <div
                      onClick={() => setSelectedPuppy(pup)}
                      className="tp-door__link group block cursor-pointer rounded-3xl bg-milk p-4 shadow-md transition-all hover:shadow-xl hover:-translate-y-1.5"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-honey-soft/30">
                        <img
                          alt={pup.name}
                          src={pup.coverImage}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="font-scrawl absolute left-2.5 top-2.5 rounded-full bg-honey px-3 py-1 text-xs shadow-sm">
                          Available
                        </span>
                        {pup.hasVideo && (
                          <span className="font-scrawl absolute right-2.5 top-2.5 rounded-full bg-cocoa/80 px-2 py-0.5 text-xs text-milk">
                            ▶ video
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="font-plush text-xl text-cocoa group-hover:text-toffee transition-colors">
                          {pup.name}
                        </h3>
                        <p className="text-sm font-medium text-cocoa-soft mt-1">
                          {pup.meta || `${pup.breed} · ${pup.gender} · ${pup.age}`}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 3: TWO WAYS TO MEET YOUR PUPPY */}
      <div data-section="paths">
        <section
          aria-labelledby="paths-title"
          className="tp-scene tp-paths"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#fbe3b4', '--sky-bottom': '#f7d18d' }}
        >
          <div className="gutter mx-auto max-w-[110rem]">
            <h2 className="tp-paths__title font-plush text-huge text-center mb-12" id="paths-title">
              Two ways to meet your puppy
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Way 1: Puppies in Dubai */}
              <article className="rounded-[2.5rem] bg-milk/80 p-8 shadow-lg border-2 border-honey/40 flex flex-col justify-between">
                <div>
                  <h3 className="font-plush text-3xl text-cocoa mb-4">Puppies in Dubai</h3>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-6 shadow-inner">
                    <img
                      src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      alt="Teddy bear puppy held up in showroom"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="font-scrawl absolute bottom-3 right-3 rounded-full bg-milk/90 px-3 py-1 text-xs text-cocoa backdrop-blur-sm">
                      In our showroom
                    </span>
                  </div>
                  <p className="text-cocoa-soft text-base leading-relaxed mb-6">
                    See them, love them, take them home. Come meet our locally available puppies in our Downtown Dubai showroom before you decide.
                  </p>
                </div>
                <Link className="btn btn-primary w-full text-center" to="/puppies">
                  Meet local puppies
                </Link>
              </article>

              {/* Way 2: Imported for You */}
              <article className="rounded-[2.5rem] bg-milk/80 p-8 shadow-lg border-2 border-honey/40 flex flex-col justify-between">
                <div>
                  <h3 className="font-plush text-3xl text-cocoa mb-4">Imported for you</h3>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-6 bg-sky/30 p-6 flex flex-col items-center justify-center border border-sky">
                    <svg aria-label="Flight route" viewBox="0 0 660 300" className="w-full h-auto">
                      <path d="M40 250 C 170 40, 470 20, 620 168" fill="none" stroke="#2a170e" strokeDasharray="6 6" strokeWidth="3"></path>
                      <circle cx="40" cy="250" r="10" fill="#c2622b"></circle>
                      <circle cx="620" cy="168" r="10" fill="#2a170e"></circle>
                      <text x="40" y="284" textAnchor="middle" className="font-plush font-bold fill-cocoa text-2xl">Korea / Europe</text>
                      <text x="620" y="202" textAnchor="middle" className="font-plush font-bold fill-toffee text-2xl">Dubai Showroom</text>
                      <g transform="translate(330 110)">
                        <circle r="28" fill="#f2be6b" stroke="#2a170e" strokeWidth="3"></circle>
                        <text y="8" textAnchor="middle" fontSize="28">✈️</text>
                      </g>
                    </svg>
                  </div>
                  <p className="text-cocoa-soft text-base leading-relaxed mb-6">
                    Exclusive Korean teacup puppies, delivered safely. Order rare breeds from the world's most reputable ethical breeders and let us handle the travel & vet logistics.
                  </p>
                </div>
                <Link className="btn btn-primary w-full text-center" to="/how-it-works">
                  See imported puppies journey
                </Link>
              </article>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: YOUR PUPPY JOURNEY */}
      <div data-section="journey">
        <section
          aria-labelledby="journey-title"
          className="tp-scene tp-chat py-16"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
        >
          <div className="gutter mx-auto max-w-[110rem] grid lg:grid-cols-12 gap-12 items-center">
            {/* Story & Steps */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="font-plush text-huge" id="journey-title">Your puppy journey</h2>
                <p className="text-lede mt-4 text-cocoa-soft leading-relaxed">
                  A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
                </p>
              </div>

              <ol className="space-y-6">
                {[
                  {
                    num: '1',
                    title: 'Choose your breed',
                    desc: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
                  },
                  {
                    num: '2',
                    title: 'Get photos & details',
                    desc: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
                  },
                  {
                    num: '3',
                    title: 'Secure & safe delivery',
                    desc: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.',
                  },
                ].map((st, i) => (
                  <li
                    key={st.num}
                    onClick={() => setChatStep(i)}
                    className={`flex items-start gap-5 p-5 rounded-3xl cursor-pointer transition-all ${
                      chatStep === i
                        ? 'bg-milk shadow-md scale-[1.02] border-2 border-honey'
                        : 'bg-milk/60 hover:bg-milk/80'
                    }`}
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-toffee text-milk font-plush text-2xl font-bold">
                      {st.num}
                    </span>
                    <div>
                      <h3 className="font-plush text-xl text-cocoa">{st.title}</h3>
                      <p className="text-sm text-cocoa-soft mt-1 leading-relaxed">{st.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="pt-2">
                <Link className="btn btn-ghost" to="/how-it-works">
                  Explore full adoption process →
                </Link>
              </div>
            </div>

            {/* Interactive Phone Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                aria-label="A WhatsApp conversation with TeddyPups U.A.E."
                className="w-full max-w-md rounded-[2.5rem] bg-milk p-4 shadow-2xl border-4 border-cocoa"
              >
                {/* Phone Top Bar */}
                <div className="flex items-center gap-3 rounded-2xl bg-[#075e54] p-3 text-milk mb-4">
                  <img
                    alt="TeddyPups Avatar"
                    className="size-10 rounded-full border border-milk"
                    src="/brand/logo.png"
                  />
                  <div>
                    <p className="font-semibold text-sm leading-tight">TeddyPups U.A.E.</p>
                    <p className="text-xs text-white/80">online · official concierge</p>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="space-y-3 min-h-[360px] p-2 bg-[#efeae2] rounded-2xl overflow-hidden flex flex-col justify-end">
                  <div className="self-end max-w-[85%] rounded-2xl rounded-tr-none bg-[#dcf8c6] p-3 text-xs text-cocoa shadow-sm">
                    Hi TeddyPups! I'd love to know more about your available puppies.
                  </div>

                  {chatStep >= 0 && (
                    <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3.5 text-xs text-cocoa shadow-sm space-y-2 animate-fadeIn">
                      <p className="font-medium">
                        Welcome to TeddyPups! Which breed are you dreaming of?
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Maltipoo', 'Poodle', 'Pomeranian', 'Cavapoo'].map((b) => (
                          <span
                            key={b}
                            className="rounded-full bg-honey/40 px-2.5 py-1 text-[11px] font-semibold text-toffee-ink"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatStep >= 1 && (
                    <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3 text-xs text-cocoa shadow-sm space-y-2 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
                        <img
                          src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                          alt="Puppy preview"
                          className="aspect-square w-full object-cover rounded-lg"
                        />
                        <img
                          src="/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                          alt="Puppy preview 2"
                          className="aspect-square w-full object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-[11px] text-cocoa-soft font-medium">
                        Here are current photos and full vet health certificate!
                      </p>
                    </div>
                  )}

                  {chatStep >= 2 && (
                    <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3 text-xs text-cocoa shadow-sm animate-fadeIn">
                      <p className="font-medium">
                        🎉 Confirmed! Your puppy is prepared for VIP doorstep delivery across the UAE.
                      </p>
                    </div>
                  )}
                </div>

                {/* Compose CTA */}
                <a
                  className="mt-3 flex items-center justify-between rounded-xl bg-cocoa px-4 py-3 text-xs font-semibold text-milk hover:bg-toffee transition"
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Chat with us on WhatsApp</span>
                  <span>💬 →</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 5: WHY FAMILIES TRUST TEDDYPUPS (PASSPORT BOOK) */}
      <div data-section="trust">
        <section
          aria-labelledby="trust-title"
          className="tp-scene tp-passport py-16"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#f0b866', '--sky-bottom': '#a65a30' }}
        >
          <div className="gutter mx-auto max-w-[96rem]">
            <div className="tp-book rounded-[3rem] bg-[#fffaf0] p-8 md:p-12 shadow-2xl border-4 border-honey grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="font-scrawl text-lg text-toffee font-bold block">
                  puppy passport & standards
                </span>
                <h2 className="font-plush text-4xl lg:text-5xl text-cocoa" id="trust-title">
                  Why families trust TeddyPups
                </h2>
                <p className="text-cocoa-soft leading-relaxed text-sm">
                  We maintain the highest veterinary, ethical, and care standards in the UAE. Every single puppy receives white-glove treatment from birth to their forever home.
                </p>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: '🩺',
                    title: 'Vet-checked & healthy',
                    text: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
                  },
                  {
                    icon: '✈️',
                    title: 'Korea to Dubai, safely',
                    text: 'Trusted ethical breeders, climate-controlled safe travel, and premium care.',
                  },
                  {
                    icon: '💬',
                    title: '24/7 Concierge Support',
                    text: 'Always here to help, from choosing your puppy to lifelong nutrition & training advice.',
                  },
                  {
                    icon: '🌍',
                    title: 'Worldwide reputation',
                    text: 'Hundreds of happy families across the UAE, GCC, and internationally.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-milk p-5 shadow-sm border border-honey/40 hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <h3 className="font-plush text-lg text-cocoa font-bold">{item.title}</h3>
                    <p className="text-xs text-cocoa-soft mt-1.5 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 6: HAPPY FAMILIES MEMORY WALL */}
      <div data-section="families">
        <section
          aria-labelledby="dusk-title"
          className="tp-scene tp-dusk py-20"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#a65a30', '--sky-bottom': '#4d2b19' }}
        >
          <div className="gutter mx-auto max-w-[110rem] text-milk mb-12">
            <h2 className="font-plush text-huge" id="dusk-title">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-4 max-w-[50ch] text-milk/80">
              We are truly honored to see our puppies become cherished members of loving families across Dubai and the world.
            </p>

            <blockquote className="mt-8 rounded-3xl bg-milk/10 p-6 backdrop-blur-md max-w-2xl border border-milk/20">
              <p className="font-plush-text text-lg italic text-milk">
                “TeddyPups made our dream a reality! Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout gave us complete peace of mind.”
              </p>
              <footer className="font-scrawl text-honey text-base mt-3">
                — Sarah M., Downtown Dubai, UAE
              </footer>
            </blockquote>
          </div>

          {/* Polaroid Photo Wall Grid */}
          <div className="gutter mx-auto max-w-[110rem]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {previewReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="tp-polaroid group block rounded-2xl bg-milk p-3 pb-5 shadow-xl transition-transform hover:scale-105"
                  style={{ transform: `rotate(${rev.tilt || '-1deg'})` }}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-cocoa/10 mb-3">
                    <img
                      src={rev.image}
                      alt={rev.caption}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-scrawl text-cocoa text-sm text-center px-1">
                    {rev.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link className="btn btn-primary" to="/happy-families">
                See all 64+ happy families →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 7: QUESTIONS ANSWERED (FAQ PREVIEW) */}
      <div data-section="questions">
        <section
          aria-labelledby="questions-title"
          className="tp-scene tp-night py-20 text-milk"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#4d2b19', '--sky-bottom': '#2f1a10' }}
        >
          <div className="gutter mx-auto max-w-[110rem] grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-plush text-huge text-honey" id="questions-title">
                Questions, answered
              </h2>
              <p className="text-milk/80 text-base leading-relaxed">
                Everything you need to know about puppy health, showroom visits, importing, and delivery options in Dubai.
              </p>
              <Link className="btn btn-ghost inline-block" to="/faq">
                Read all FAQs
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {previewFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-milk/10 p-6 backdrop-blur-md border border-milk/15 transition-all hover:bg-milk/15"
                >
                  <h3 className="font-plush text-xl text-honey flex items-center gap-3">
                    <span className="text-toffee">★</span> {faq.question}
                  </h3>
                  <p className="text-sm text-milk/90 mt-2.5 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 8: READY TO MEET BEST FRIEND CTA */}
      <div data-section="cta">
        <section
          aria-labelledby="cta-title"
          className="tp-scene tp-home py-24 text-milk text-center"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#2f1a10', '--sky-bottom': '#24130b' }}
        >
          <div className="gutter mx-auto max-w-3xl space-y-6">
            <h2 className="font-plush text-huge text-honey" id="cta-title">
              Ready to meet your new best friend?
            </h2>
            <p className="text-milk/80 text-lg leading-relaxed">
              Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure smooth, safe delivery across the UAE.
            </p>

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <a
                className="btn btn-whatsapp text-base px-8 py-4 font-semibold"
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Enquire on WhatsApp
              </a>
              <Link className="btn btn-ghost text-base px-8 py-4 font-semibold" to="/contact">
                Visit our Showroom
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Selected Puppy Modal */}
      {selectedPuppy && (
        <PuppyModal puppy={selectedPuppy} onClose={() => setSelectedPuppy(null)} />
      )}
    </div>
  );
}
