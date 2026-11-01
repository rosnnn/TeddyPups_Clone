import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PupStop from './pup/PupStop';

const STEPS = [
  {
    num: 1,
    title: 'Choose your breed',
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    num: 2,
    title: 'Get photos & videos',
    text: 'Receive real-time photos, 4K videos, and veterinary updates directly via WhatsApp before making a decision.',
  },
  {
    num: 3,
    title: 'Delivery or collection',
    text: 'Meet your puppy at our Dubai showroom or enjoy safe, climate-controlled, white-glove delivery straight to your doorstep.',
  },
];

const BREEDS = [
  { slug: 'maltipoo', name: 'Maltipoo' },
  { slug: 'pomeranian', name: 'Pomeranian' },
  { slug: 'poodle', name: 'Poodle' },
  { slug: 'cavapoo', name: 'Cavapoo' },
  { slug: 'shih-tzu', name: 'Shih Tzu' },
];

const SNAPS = [
  '/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg',
  '/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg',
  '/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg',
  '/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg',
];

export default function JourneyChatSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const stepsListRef = useRef(null);
  const screenRef = useRef(null);
  const videoRef = useRef(null);
  const prevStepRef = useRef(-1);

  // IntersectionObserver for steps on scroll
  useEffect(() => {
    if (!stepsListRef.current) return;
    const items = [...stepsListRef.current.children];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) {
              setActiveStep(idx);
            }
          }
        }
      },
      { rootMargin: '-28% 0px -62% 0px' }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Handle typing effect and pup cue when step updates
  useEffect(() => {
    if (activeStep < 0) return;
    if (activeStep === prevStepRef.current) return;
    prevStepRef.current = activeStep;

    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      const stepEl = screenRef.current?.querySelector(`[data-step="${activeStep}"]`);
      if (stepEl) {
        window.dispatchEvent(
          new CustomEvent('pup:cue', {
            detail: {
              look: stepEl,
              secs: 1.4,
              say: activeStep === 1 ? 'ooh, photos!' : activeStep === 2 ? 'home soon!' : undefined,
            },
          })
        );
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [activeStep]);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlayingVideo(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlayingVideo(false);
    }
  };

  return (
    <section
      aria-labelledby="journey-title"
      className="tp-scene tp-chat"
      data-pup-scene="true"
      data-tone="light"
      style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        {/* Left Column: Story & Steps */}
        <div className="tp-chat__story">
          <h2 className="font-plush text-huge" id="journey-title">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol ref={stepsListRef} className="tp-chat__steps">
            {STEPS.map((step, idx) => (
              <li
                key={step.title}
                className="tp-chat__step"
                data-active={idx === activeStep ? 'true' : undefined}
                data-done={idx < activeStep ? 'true' : undefined}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  {step.num}
                </span>
                <h3 className="font-plush tp-chat__title">{step.title}</h3>
                <p className="tp-chat__text">{step.text}</p>
              </li>
            ))}
          </ol>

          <Link to="/how-it-works" className="btn btn-ghost tp-chat__cta">
            How it works
          </Link>
        </div>

        {/* Right Column: Phone Screen */}
        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            {/* Phone Header */}
            <div className="tp-phone__bar">
              <img
                src="/brand/logo.png"
                alt=""
                width="40"
                height="40"
                className="tp-phone__avatar"
              />
              <span>
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">
                  {isTyping ? 'typing…' : 'online'}
                </span>
              </span>
            </div>

            {/* Chat Screen */}
            <div ref={screenRef} className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I'd love to know more about your puppies.
              </p>

              {/* Step 0: Choose your breed */}
              <div
                className="tp-msg-group"
                data-step="0"
                data-show={0 < activeStep || (0 === activeStep && !isTyping) ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[0].text}</p>
                  <ul aria-label="Breeds we have now" className="tp-chips">
                    {BREEDS.map((b) => (
                      <li key={b.slug}>
                        <Link to={`/puppies?breed=${b.slug}`}>{b.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 1: Photos & Videos */}
              <div
                className="tp-msg-group"
                data-step="1"
                data-show={1 < activeStep || (1 === activeStep && !isTyping) ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {SNAPS.map((snapUrl, sIdx) => (
                      <span key={sIdx} className="tp-snaps__one">
                        <img
                          src={snapUrl}
                          alt="Puppy preview"
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tp-clip">
                  <video
                    ref={videoRef}
                    src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                    poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="A puppy video"
                    onEnded={() => setIsPlayingVideo(false)}
                  />
                  <button
                    type="button"
                    className="tp-clip__play"
                    onClick={toggleVideo}
                    aria-pressed={isPlayingVideo}
                    aria-label={isPlayingVideo ? 'Pause video' : 'Play video'}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {isPlayingVideo ? (
                        <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                      ) : (
                        <path d="M8 5v14l11-7z" />
                      )}
                    </svg>
                  </button>
                </div>

                <p className="tp-msg tp-msg--them">{STEPS[1].text}</p>
              </div>

              {/* Step 2: Delivery & Collection */}
              <div
                className="tp-msg-group"
                data-step="2"
                data-show={2 < activeStep || (2 === activeStep && !isTyping) ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[2].text}</p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path
                      d="M14 52 C 60 6, 120 70, 170 28"
                      className="tp-route__line"
                    />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path
                      d="M164 32 l12 -12 l12 12 v14 h-24 z"
                      className="tp-route__home"
                    />
                    <path
                      d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                      className="tp-route__heart"
                    />
                    <g transform="translate(70 22) scale(.3) rotate(70 32 32)">
                      <circle cx="32" cy="42" r="14" fill="currentColor" />
                      <circle cx="16" cy="22" r="6" fill="currentColor" />
                      <circle cx="28" cy="14" r="6" fill="currentColor" />
                      <circle cx="44" cy="18" r="6" fill="currentColor" />
                    </g>
                    <g transform="translate(104 38) scale(.3) rotate(100 32 32)">
                      <circle cx="32" cy="42" r="14" fill="currentColor" />
                      <circle cx="16" cy="22" r="6" fill="currentColor" />
                      <circle cx="28" cy="14" r="6" fill="currentColor" />
                      <circle cx="44" cy="18" r="6" fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Typing Bubble */}
              <p
                className="tp-typing"
                data-show={isTyping ? 'true' : 'false'}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </p>
            </div>

            {/* Compose Bar Link */}
            <a
              href="https://wa.me/971507779999"
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          {/* Teddy sitting beside phone */}
          <PupStop
            pose="sit"
            facing="right"
            className="tp-chat__teddy"
          />
        </div>
      </div>
    </section>
  );
}
