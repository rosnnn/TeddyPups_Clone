import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PUPPIES from '../data/puppies';
import REVIEWS from '../data/reviews';
import FAQS from '../data/faq';
import PuppyModal from '../components/PuppyModal';
import PupStop from '../components/pup/PupStop';
import PupJourney from '../components/pup/PupJourney';
import HeroLineup from '../components/HeroLineup';
import MeetPupsSection from '../components/MeetPupsSection';
import FlightAnimation from '../components/FlightAnimation';
import JourneyChatSection from '../components/JourneyChatSection';
import PhotoLightbox from '../components/PhotoLightbox';

export default function HomePage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const availablePuppies = PUPPIES.filter((p) => p.status === 'Available');
  const featuredPuppies = availablePuppies.slice(0, 8);
  const heroPuppies = featuredPuppies.slice(0, 6);
  
  const HOME_PREVIEWS = [
    {
      image: '/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg',
      caption: 'Lulu 🧸 with her new mummy ❤️',
      tilt: '-2.2deg',
      tapeColor: '#f6d79a',
      tapeStyle: 'center'
    },
    {
      image: '/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg',
      caption: 'Adorable Maltipoo baby 🧸❤️',
      tilt: '1.6deg',
      tapeColor: '#f9cdbf',
      tapeStyle: 'left'
    },
    {
      image: '/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg',
      caption: 'My new teddy puppy 🥰🧸',
      tilt: '-0.9deg',
      tapeColor: '#cfe5f6',
      tapeStyle: 'right'
    },
    {
      image: '/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg',
      caption: 'Our new puppies 🧸🥰🤗',
      tilt: '2.4deg',
      tapeColor: '#f6d79a',
      tapeStyle: 'corners'
    },
    {
      image: '/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg',
      caption: 'New puppy 🧸😍',
      tilt: '-1.5deg',
      tapeColor: '#e9dcc4',
      tapeStyle: 'center'
    },
    {
      image: '/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg',
      caption: 'Gang of 3 😍🧸',
      tilt: '0.8deg',
      tapeColor: '#f6d79a',
      tapeStyle: 'right'
    },
    {
      image: '/media/4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg',
      caption: 'So happy 😍😍',
      tilt: '-2.6deg',
      tapeColor: '#f9cdbf',
      tapeStyle: 'left'
    },
    {
      image: '/media/3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg',
      caption: 'New pup 🤗💫',
      tilt: '1.2deg',
      tapeColor: '#cfe5f6',
      tapeStyle: 'center'
    }
  ];
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  const previewFaqs = FAQS.slice(0, 3);

  // Door color cycle
  const DOOR_COLORS = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];

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
            <p className="tp-hero__note font-scrawl">
              every puppy is family
              <svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" preserveAspectRatio="none" viewBox="0 0 220 24">
                <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              </svg>
            </p>
            <h1 className="tp-hero__title font-plush" id="hero-title">
              <span className="tp-hero__line">Premium teacup</span>
              <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
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

          {/* Hero Lineup */}
          <div className="tp-hero__stage">
            <HeroLineup friends={availablePuppies} />

            {/* Mascot Center Dog Stop: Peekaboo */}
            <PupStop
              pose="peek"
              facing="right"
              act="peekaboo"
              behind={true}
              lane={true}
              className="tp-hero__teddy"
              label="Teddy, the TeddyPups puppy, peeking over the quilt"
            />

            {/* Scallop Quilt Edge */}
            <div aria-hidden="true" className="tp-quilt">
              <svg className="tp-quilt__edge" height="40" preserveAspectRatio="none" width="100%">
                <defs>
                  <pattern height="40" id="tp-scallop" patternUnits="userSpaceOnUse" width="76">
                    <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }}></path>
                    <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3"></path>
                    <path d="M11 33A27 19 0 0 1 65 33" fill="none" opacity=".42" stroke="#2a170e" strokeDasharray="3.5 5.5" strokeLinecap="round" strokeWidth="1.6"></path>
                  </pattern>
                </defs>
                <rect fill="url(#tp-scallop)" height="40" width="100%"></rect>
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: MEET THE PUPS (DOORS TREADMILL) */}
      <MeetPupsSection puppies={availablePuppies} />

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
            <h2 className="tp-paths__title font-plush text-huge" id="paths-title">
              Two ways to meet your puppy
            </h2>

            <div className="tp-fork">
              <div aria-hidden="true" className="tp-fork__post"></div>

              {/* Way 1: Puppies in Dubai */}
              <article aria-labelledby="way-local" className="tp-way tp-way--left">
                <h3 className="tp-sign tp-sign--left font-plush" id="way-local">
                  Puppies in Dubai
                </h3>
                <div className="tp-way__scene" data-pup-look="true">
                  <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                    <path
                      d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <figure className="tp-window">
                    <span className="tp-window__glass">
                      <img
                        alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                        loading="lazy"
                        decoding="async"
                        src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          objectFit: 'cover',
                          objectPosition: '54.3% 48.3%'
                        }}
                      />
                    </span>
                    <figcaption className="font-scrawl">In our showroom</figcaption>
                  </figure>
                </div>
                <p className="tp-way__text">
                  See them, love them, take them home. Come meet our locally available puppies before you decide.
                </p>
                <Link className="btn btn-primary" to="/puppies?origin=local">
                  Meet local puppies
                </Link>
              </article>

              {/* Way 2: Imported for you */}
              <article aria-labelledby="way-imported" className="tp-way tp-way--right">
                <h3 className="tp-sign tp-sign--right font-plush" id="way-imported">
                  Imported for you
                </h3>
                <div className="tp-way__scene" data-pup-look="true">
                  <FlightAnimation />
                </div>
                <p className="tp-way__text">
                  Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
                </p>
                <Link className="btn btn-primary" to="/puppies?origin=imported">
                  See imported puppies
                </Link>
              </article>

              {/* Mascot Center Dog Stop: Wooden Signpost Fork */}
              <PupStop pose="sit" facing="right" className="tp-fork__teddy" />
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: YOUR PUPPY JOURNEY */}
      <div data-section="journey">
        <JourneyChatSection />
      </div>

      {/* SECTION 5: WHY FAMILIES TRUST TEDDYPUPS (PASSPORT) */}
      <div data-section="trust">
        <section
          aria-labelledby="trust-title"
          className="tp-scene tp-passport"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#f0b866', '--sky-bottom': '#a65a30' }}
        >
          <div className="gutter mx-auto max-w-[96rem]">
            <div className="tp-book">
              <div className="tp-book__page tp-book__page--left">
                <p aria-hidden="true" className="tp-book__kicker font-scrawl">puppy passport</p>
                <h2 className="font-plush tp-book__title" id="trust-title">Why families trust TeddyPups</h2>
                
                {/* Mascot Center Dog Stop: Passport Book */}
                <PupStop pose="sit" facing="right" className="tp-book__teddy" />
              </div>

              <ul className="tp-book__page tp-book__page--right">
                <li className="tp-entry" style={{ '--ink-stamp': '#a24a1a', '--tilt': '-8deg', '--i': 0 }}>
                  <span className="tp-stamp tp-stamp--round">
                    <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                      <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                      <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                    </svg>
                    <span className="tp-stamp__title font-plush">Vet-checked &amp; healthy</span>
                  </span>
                  <p className="tp-entry__text">Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p>
                </li>

                <li className="tp-entry" style={{ '--ink-stamp': '#1f6b45', '--tilt': '5deg', '--i': 1 }}>
                  <span className="tp-stamp tp-stamp--ticket">
                    <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                      <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                      <path d="M8 50c10 4 20 4 30 0" fill="none" stroke="currentColor" strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                    </svg>
                    <span className="tp-stamp__title font-plush">Korea to Dubai, safely</span>
                  </span>
                  <p className="tp-entry__text">Trusted breeders, safe travel, and premium care from start to finish.</p>
                </li>

                <li className="tp-entry" style={{ '--ink-stamp': '#5a3a28', '--tilt': '-4deg', '--i': 2 }}>
                  <span className="tp-stamp tp-stamp--oval">
                    <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                      <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                      <path d="M22 28h0M32 28h0M42 28h0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"></path>
                    </svg>
                    <span className="tp-stamp__title font-plush">Support 24/7</span>
                  </span>
                  <p className="tp-entry__text">Always here to help, from choosing your puppy to post-delivery support.</p>
                </li>

                <li className="tp-entry" style={{ '--ink-stamp': '#c2622b', '--tilt': '7deg', '--i': 3 }}>
                  <span className="tp-stamp tp-stamp--scallop">
                    <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" fill="none" r="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></circle>
                      <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                    </svg>
                    <span className="tp-stamp__title font-plush">Trusted by families worldwide</span>
                  </span>
                  <p className="tp-entry__text">Puppies delivered to loving homes all around the world.</p>
                </li>
              </ul>
            </div>
          </div>

          <div aria-hidden="true" className="tp-horizon">
            <span className="tp-horizon__sun"></span>
            <svg className="tp-horizon__city" preserveAspectRatio="none" viewBox="0 0 1440 160">
              <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z"></path>
            </svg>
          </div>
        </section>
      </div>

      {/* SECTION 6: HAPPY FAMILIES & PUPPIES (DUSK) */}
      <div data-section="families">
        <section
          aria-labelledby="dusk-title"
          className="tp-scene tp-dusk"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#a65a30', '--sky-bottom': '#4d2b19' }}
        >
          <div className="tp-dusk__sky gutter">
            <div className="tp-dusk__head">
              <h2 className="font-plush text-huge" id="dusk-title">Happy families &amp; puppies</h2>
              <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
                We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
              </p>
            </div>

            <figure className="tp-dusk__note">
              <blockquote className="font-plush-text">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
            </figure>
          </div>

          <div className="tp-photowall">
            <div className="tp-photowall__wall">
              <ul aria-label="Photos from TeddyPups families" className="tp-photowall__prints">
                {HOME_PREVIEWS.map((rev, i) => (
                  <li key={i} data-reveal="true" style={{ '--d': `${110 * [3, 0, 5, 1, 6, 2, 7, 4][i % 8]}ms` }}>
                    <button
                      aria-label={`Open photo ${i + 1} of 64: ${rev.caption}`}
                      className="tp-photowall__print"
                      type="button"
                      onClick={() => setActivePhotoIdx(i)}
                    >
                      <span className="tp-polaroid" style={{ '--tilt': rev.tilt, '--tape': rev.tapeColor, '--i': i }}>
                        {rev.tapeStyle === 'corners' ? (
                          <>
                            <span aria-hidden="true" className="tp-tape tp-tape--tl" />
                            <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                          </>
                        ) : (
                          <span aria-hidden="true" className={`tp-tape tp-tape--${rev.tapeStyle}`} />
                        )}
                        <span className="tp-polaroid__photo">
                          <img
                            alt="A happy TeddyPups family with their new puppy"
                            height="433"
                            width="433"
                            loading="lazy"
                            src={rev.image}
                          />
                        </span>
                        <span className="tp-polaroid__caption font-scrawl">{rev.caption}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tp-facade__ground">
                <span aria-hidden="true" className="tp-facade__door"></span>
                <span aria-hidden="true" className="tp-lamp">
                  <span className="tp-lamp__light"></span>
                </span>
                <Link className="btn btn-primary tp-facade__cta" to="/happy-families">
                  See every happy family
                </Link>

                {/* Mascot Center Dog Stop: Dusk Porch */}
                <PupStop pose="sit" facing="right" className="tp-dusk__teddy" />
              </div>
            </div>
            <div aria-hidden="true" className="tp-street__pavement"></div>
          </div>
        </section>
      </div>

      {/* SECTION 7: QUESTIONS, ANSWERED (NIGHT FAQ) */}
      <div data-section="questions">
        <section
          aria-labelledby="questions-title"
          className="tp-scene tp-night"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#4d2b19', '--sky-bottom': '#2f1a10' }}
        >
          <div aria-hidden="true" className="pointer-events-none tp-night__stars">
            {[
              { left: '8%', top: '12%', width: '16.2px', delay: '0.00s' },
              { left: '22%', top: '30%', width: '9px', delay: '0.40s' },
              { left: '41%', top: '8%', width: '12.6px', delay: '0.80s' },
              { left: '57%', top: '22%', width: '8.1px', delay: '1.20s' },
              { left: '72%', top: '6%', width: '14.4px', delay: '1.60s' },
              { left: '88%', top: '18%', width: '10.8px', delay: '2.00s' },
              { left: '95%', top: '42%', width: '9px', delay: '2.40s' },
            ].map((star, idx) => (
              <svg
                key={idx}
                aria-hidden="true"
                className="tp-twinkle absolute text-honey"
                style={{ left: star.left, top: star.top, width: star.width, animationDelay: star.delay }}
                viewBox="0 0 40 40"
              >
                <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor"></path>
              </svg>
            ))}
          </div>

          <div className="tp-night__grid gutter">
            <div className="tp-night__intro">
              <h2 className="font-plush text-huge" id="questions-title">Questions, answered</h2>
              <Link className="btn btn-ghost tp-night__cta" to="/faq">Read all questions</Link>
              <div className="tp-night__pup">
                <span aria-hidden="true" className="tp-night__wonder font-plush">?</span>

                {/* Mascot Center Dog Stop: Night Wondering */}
                <PupStop pose="sit" facing="right" act="tilt" className="tp-night__teddy" />
              </div>
            </div>

            <dl className="tp-night__list">
              {previewFaqs.map((faq, idx) => (
                <div key={idx} className="tp-qa" data-pup-look="true">
                  <dt className="font-plush tp-qa__q">
                    <svg aria-hidden="true" className="tp-qa__star" viewBox="0 0 40 40">
                      <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor"></path>
                    </svg>
                    {faq.q}
                  </dt>
                  <dd className="tp-qa__a">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* SECTION 8: READY TO MEET YOUR NEW BEST FRIEND? */}
      <div data-section="cta">
        <section
          aria-labelledby="cta-title"
          className="tp-scene tp-home"
          data-pup-scene="true"
          data-tone="dark"
          style={{ '--sky-top': '#2f1a10', '--sky-bottom': '#24130b' }}
        >
          <div className="tp-home__copy gutter">
            <h2 className="font-plush text-huge" id="cta-title">Ready to meet your new best friend?</h2>
            <p className="tp-home__lede">
              Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
            </p>
          </div>

          <div className="tp-house">
            <span aria-hidden="true" className="tp-house__plant tp-house__plant--left"></span>
            <span aria-hidden="true" className="tp-house__lamp"></span>

            <div className="tp-house__doorway">
              <span className="tp-house__inside">
                <img
                  alt="Max, waiting inside"
                  src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                />
              </span>
              <span aria-hidden="true" className="tp-house__door">
                <span className="tp-house__peep"></span>
                <span className="tp-house__knob"></span>
              </span>
            </div>

            <span aria-hidden="true" className="tp-house__plant tp-house__plant--right"></span>
            <span aria-hidden="true" className="tp-house__mat font-scrawl">welcome home</span>

            {/* Mascot Center Dog Stop: Welcome Home Bowing Dog */}
            <PupStop pose="bow" facing="right" className="tp-house__teddy" />
          </div>

          <div className="tp-home__actions gutter">
            <a
              className="btn btn-whatsapp"
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </a>
            <Link className="btn btn-ghost tp-home__ghost" to="/contact">
              Visit &amp; contact
            </Link>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedPuppy && (
        <PuppyModal puppy={selectedPuppy} onClose={() => setSelectedPuppy(null)} />
      )}

      {/* DYNAMIC SCROLL DOG JOURNEY (Active Traveling Puppy) */}
      <PupJourney />
    </div>
  );
}
