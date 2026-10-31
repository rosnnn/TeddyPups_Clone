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

export default function HomePage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const availablePuppies = PUPPIES.filter((p) => p.status === 'Available');
  const featuredPuppies = availablePuppies.slice(0, 8);
  const heroPuppies = featuredPuppies.slice(0, 6);
  const previewReviews = REVIEWS.slice(0, 8);
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
                  <svg aria-hidden="true" className="tp-way__skyline" viewBox="0 0 300 120">
                    <path
                      d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.6"
                    ></path>
                  </svg>
                  <figure className="tp-window">
                    <span className="tp-window__glass">
                      <img
                        alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
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
                <Link className="btn btn-primary" to="/puppies">
                  Meet local puppies
                </Link>
              </article>

              {/* Way 2: Imported for You */}
              <article aria-labelledby="way-imported" className="tp-way tp-way--right">
                <h3 className="tp-sign tp-sign--right font-plush" id="way-imported">
                  Imported for you
                </h3>
                <div className="tp-way__scene" data-pup-look="true">
                  <div className="tp-flight">
                    <svg
                      aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
                      role="img"
                      viewBox="0 0 660 300"
                    >
                      <defs>
                        <clipPath id="_R_flight_porthole_">
                          <circle r="25"></circle>
                        </clipPath>
                      </defs>
                      <path className="tp-flight__route" d="M40 250 C 170 40, 470 20, 620 168"></path>
                      <circle className="tp-flight__dot" cx="40" cy="250" r="7"></circle>
                      <circle className="tp-flight__dot" cx="620" cy="168" r="7"></circle>
                      <text className="tp-flight__label" textAnchor="middle" x="40" y="284">Korea</text>
                      <text className="tp-flight__label" textAnchor="middle" x="620" y="202">Dubai</text>
                      <g transform="translate(410 70)">
                        <g transform="translate(-126 -78)">
                          <path className="tp-flight__wing" d="M28 60 L8 26 L34 26 L60 54 Z"></path>
                          <path className="tp-flight__wing tp-flight__wing--far" d="M108 112 L142 156 L172 156 L158 112 Z"></path>
                          <path className="tp-flight__body" d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"></path>
                          <path className="tp-flight__wing" d="M104 44 L138 2 L168 2 L154 44 Z"></path>
                          <path className="tp-flight__line" d="M206 64 C215 67 221 73 224 80"></path>
                        </g>
                        <g transform="translate(10 2)">
                          <image
                            clipPath="url(#_R_flight_porthole_)"
                            height="50"
                            href="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                            preserveAspectRatio="xMidYMid slice"
                            width="50"
                            x="-25"
                            y="-25"
                          />
                          <circle className="tp-flight__porthole" r="25"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="tp-way__text">
                  Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
                </p>
                <Link className="btn btn-primary" to="/how-it-works">
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
        <section
          aria-labelledby="journey-title"
          className="tp-scene tp-chat"
          data-pup-scene="true"
          data-tone="light"
          style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
        >
          <div className="tp-chat__grid gutter" data-pin-range="true">
            <div className="tp-chat__story">
              <h2 className="font-plush text-huge" id="journey-title">Your puppy journey</h2>
              <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
                A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
              </p>
              <ol className="tp-chat__steps">
                <li className="tp-chat__step" data-done="true">
                  <span aria-hidden="true" className="tp-chat__num font-plush">1</span>
                  <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                  <p className="tp-chat__text">Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
                </li>
                <li className="tp-chat__step" data-done="true">
                  <span aria-hidden="true" className="tp-chat__num font-plush">2</span>
                  <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
                  <p className="tp-chat__text">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
                </li>
                <li className="tp-chat__step" data-active="true">
                  <span aria-hidden="true" className="tp-chat__num font-plush">3</span>
                  <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
                  <p className="tp-chat__text">Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
                </li>
              </ol>
              <Link className="btn btn-ghost tp-chat__cta" to="/how-it-works">How it works</Link>
            </div>

            <div className="tp-chat__side">
              <div aria-label="A WhatsApp conversation with TeddyPups U.A.E." className="tp-phone" role="group">
                <div className="tp-phone__bar">
                  <img
                    alt=""
                    className="tp-phone__avatar"
                    height="40"
                    width="40"
                    src="/brand/logo.png"
                  />
                  <span>
                    <span className="tp-phone__name">TeddyPups U.A.E.</span>
                    <span className="tp-phone__status">online</span>
                  </span>
                </div>

                <div className="tp-phone__screen">
                  <p className="tp-msg tp-msg--me">Hi TeddyPups! I'd love to know more about your puppies.</p>

                  <div className="tp-msg-group" data-show="true" data-step="0">
                    <div className="tp-msg tp-msg--them">
                      <p>Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
                      <ul aria-label="Breeds we have now" className="tp-chips">
                        <li><Link to="/puppies">Maltipoo</Link></li>
                        <li><Link to="/puppies">Pomeranian</Link></li>
                        <li><Link to="/puppies">Poodle</Link></li>
                        <li><Link to="/puppies">Cavapoo</Link></li>
                        <li><Link to="/puppies">Shih Tzu</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="tp-msg-group" data-show="true" data-step="1">
                    <div className="tp-msg tp-msg--them tp-msg--media">
                      <div className="tp-snaps">
                        <span className="tp-snaps__one">
                          <img
                            alt="Apricot puppy in showroom"
                            src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                          />
                        </span>
                        <span className="tp-snaps__one">
                          <img
                            alt="Apricot puppy close up"
                            src="/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                          />
                        </span>
                        <span className="tp-snaps__one">
                          <img
                            alt="Apricot puppy looking up"
                            src="/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg"
                          />
                        </span>
                        <span className="tp-snaps__one">
                          <img
                            alt="Apricot puppy held up"
                            src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="tp-msg tp-msg--them tp-msg--media">
                      <div className="tp-clip">
                        <video
                          aria-label="Video of puppy"
                          loop
                          muted
                          playsInline
                          poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                          src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                        />
                        <button
                          aria-label="Play video"
                          className="tp-clip__play"
                          type="button"
                          onClick={(e) => {
                            const v = e.currentTarget.previousElementSibling;
                            if (v.paused) {
                              v.play();
                              setVideoPlaying(true);
                            } else {
                              v.pause();
                              setVideoPlaying(false);
                            }
                          }}
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24">
                            {videoPlaying ? (
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            ) : (
                              <path d="M8 5v14l11-7z" />
                            )}
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="tp-msg tp-msg--them">
                      Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                    </p>
                  </div>

                  <div className="tp-msg-group" data-show="true" data-step="2">
                    <div className="tp-msg tp-msg--them">
                      <p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
                      <svg aria-hidden="true" className="tp-route" viewBox="0 0 220 70">
                        <path className="tp-route__line" d="M14 52 C 60 6, 120 70, 170 28"></path>
                        <circle className="tp-route__dot" cx="14" cy="52" r="5"></circle>
                        <path className="tp-route__home" d="M164 32 l12 -12 l12 12 v14 h-24 z"></path>
                        <path className="tp-route__heart" d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"></path>
                      </svg>
                    </div>
                  </div>

                  <p aria-hidden="true" className="tp-typing" data-show="false">
                    <span></span><span></span><span></span>
                  </p>
                </div>

                <a
                  className="tp-phone__compose"
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Say hello on WhatsApp</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M3 20l18-8L3 4v6l12 2-12 2z"></path>
                  </svg>
                </a>
              </div>

              {/* Mascot Center Dog Stop: WhatsApp Phone */}
              <PupStop pose="sit" facing="right" className="tp-chat__teddy" />
            </div>
          </div>
        </section>
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
                {previewReviews.map((rev, i) => (
                  <li key={rev.id || i} data-reveal="true" style={{ '--d': `${110 * [3, 0, 5, 1, 6, 2, 7, 4][i % 8]}ms` }}>
                    <button
                      aria-label={`Open photo ${i + 1} of 64: ${rev.caption}`}
                      className="tp-photowall__print"
                      type="button"
                    >
                      <span className="tp-polaroid" style={{ '--tilt': `${rev.tilt}deg`, '--tape': rev.tapeColor, '--i': i }}>
                        <span aria-hidden="true" className={`tp-tape tp-tape--${rev.tapeStyle}`}></span>
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
