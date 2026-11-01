import React, { useState, useRef, useEffect, useId } from 'react';
import PupBuddy from '../components/pup/PupBuddy';

const PUPPY_OPTIONS = [
  { id: '', label: 'any puppy (not sure yet)' },
  { id: '4218427a-dd65-4b09-a089-584b912aa7ab', label: 'Max (Maltipoo, boy)' },
  { id: '0abcf3f5-0080-44c1-b1e1-2a2de24a3cf4', label: 'Korean Teacup Maltipoo (girl)' },
  { id: 'c5d2cf3c-51e8-4ecf-ac94-97ef8fceb6ec', label: 'Korean Teacup Poodle (girl)' },
  { id: '9cb7d6db-bf35-4e63-8e61-ca63e1925dbd', label: 'Maltipoo & Cavapoo (boy)' },
  { id: 'b39adb3f-eace-45af-a2e8-425de01ffc50', label: 'Toy Poodle (boy & girl)' },
  { id: '027d7333-a8b2-49de-9bbc-9a47af88ebac', label: 'Maltipoo (girl)' },
  { id: 'ec3a42bf-bd62-46ba-962d-8f94f09715c5', label: 'Pomeranian (girl)' },
  { id: 'e486e544-f1fd-48f9-8ba0-f556d7ee44e7', label: 'Copper (Cavapoo, boy)' },
  { id: 'd2d146b2-6454-4e05-967a-87f2ab02946d', label: 'Shih Tzu (girl)' },
  { id: '0fe92eee-1937-48e1-b48b-77292a6f25d8', label: 'Shih Tzu (boy)' },
  { id: '0deaea0d-1c0e-4e85-868b-3c7376358e03', label: 'Maltipoo (girl)' },
  { id: 'cbfa8ebd-7e0c-4818-b0ec-144ede4d3352', label: 'Maltipoo (girl)' },
  { id: '35d5e8bd-bebb-41c7-b0a9-256482edb3c8', label: 'Korean Teacup Pomeranian (girl)' },
  { id: '9fd5c518-a1ce-46d4-b9a4-8fb9714717f4', label: 'Korean Teacup Pomeranian (girl)' },
  { id: 'e838ce49-59e0-4f3e-ab83-55cd2d98d2a2', label: 'Korean Teacup Pomeranian (boy)' },
];

const WHATSAPP_HREF =
  "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: '',
  });

  const [phase, setPhase] = useState('writing'); // 'writing' | 'sealing' | 'posting' | 'sent'
  const [minHeight, setMinHeight] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef(null);
  const sentRef = useRef(null);
  const formRef = useRef(null);

  const puppySelectId = useId();
  const messageAreaId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone or WhatsApp number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setMinHeight(containerRef.current?.offsetHeight);
    setPhase('sealing');

    window.dispatchEvent(
      new CustomEvent('pup:cue', {
        detail: { say: 'sealing the letter!', secs: 1.5 },
      })
    );

    const t1 = setTimeout(() => {
      setPhase('posting');
    }, 750);

    const t2 = setTimeout(() => {
      setMinHeight(undefined);
      setPhase('sent');
      setIsSubmitting(false);

      window.dispatchEvent(
        new CustomEvent('pup:cue', {
          detail: { say: 'letter received!', secs: 2.0 },
        })
      );
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  useEffect(() => {
    if (phase === 'sent' && sentRef.current) {
      sentRef.current.focus({ preventScroll: true });
      const rect = sentRef.current.getBoundingClientRect();
      const headerH = 76;
      if (rect.top < headerH + 8) {
        window.scrollBy({ top: rect.top - headerH - 24, behavior: 'smooth' });
      }
    }
  }, [phase]);

  return (
    <div className="tp-page" data-page="contact">
      <section
        aria-labelledby="contact-title"
        className="tp-scene"
        data-pup-scene="true"
        data-tone="light"
        style={{ '--sky-top': '#fff9ee', '--sky-bottom': '#f9dca4' }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 className="font-plush text-giant max-w-[12ch] lg:col-span-7" id="contact-title">
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&#x27;d love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Right Column: Hand-written Letter Form & Mailbox Animation */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div
                ref={containerRef}
                className="tp-post"
                data-phase={phase}
                style={{ minHeight }}
              >
                {/* 1. Writing Form */}
                {phase !== 'sent' && (
                  <form
                    ref={formRef}
                    aria-hidden={phase !== 'writing' ? true : undefined}
                    className="tp-letterform"
                    inert={phase !== 'writing' ? '' : undefined}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg
                        aria-hidden="true"
                        className="size-9 text-toffee"
                        fill="currentColor"
                        viewBox="0 0 64 64"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                    {Object.keys(errors).length > 0 && (
                      <div className="tp-letterform__alert" role="alert">
                        <p className="font-semibold">Please check the required fields:</p>
                        <ul>
                          {Object.entries(errors).map(([field, err]) => (
                            <li key={field} id={`${field}-err`}>
                              {err}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="tp-letterform__line">
                      my name is{' '}
                      <span className="tp-blank" style={{ '--size': '16ch' }}>
                        <input
                          aria-describedby={errors.name ? 'name-err' : undefined}
                          aria-invalid={errors.name ? 'true' : undefined}
                          aria-label="Your name (required)"
                          autoComplete="name"
                          maxLength={80}
                          minLength={2}
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </span>
                      , and you can reach me on{' '}
                      <span className="tp-blank" style={{ '--size': '15ch' }}>
                        <input
                          aria-describedby={errors.phone ? 'phone-err' : undefined}
                          aria-invalid={errors.phone ? 'true' : undefined}
                          aria-label="Phone or WhatsApp number with country code (required)"
                          autoComplete="tel"
                          inputMode="tel"
                          name="phone"
                          placeholder="+971 50 123 4567"
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </span>{' '}
                      or by email at{' '}
                      <span className="tp-blank" style={{ '--size': '20ch' }}>
                        <input
                          aria-label="Email (optional)"
                          autoComplete="email"
                          name="email"
                          placeholder="optional"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </span>
                      .
                    </p>

                    <p className="tp-letterform__line">
                      I live in{' '}
                      <span className="tp-blank" style={{ '--size': '13ch' }}>
                        <input
                          aria-label="Your area (optional)"
                          autoComplete="address-level2"
                          maxLength={80}
                          name="area"
                          placeholder="e.g. Dubai Marina"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        />
                      </span>
                      , and I&#x27;m curious about{' '}
                      <span className="tp-blank tp-blank--select">
                        <label className="sr-only" htmlFor={puppySelectId}>
                          Puppy you&#x27;re interested in (optional)
                        </label>
                        <select
                          id={puppySelectId}
                          name="puppyId"
                          value={formData.puppyId}
                          onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                        >
                          {PUPPY_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    <label className="sr-only" htmlFor={messageAreaId}>
                      Your message (optional)
                    </label>
                    <textarea
                      id={messageAreaId}
                      className="tp-letterform__note"
                      maxLength={2000}
                      name="message"
                      placeholder="Anything else you&#x27;d like to tell us…"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="tp-letterform__sign">
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button
                        className="btn btn-primary disabled:opacity-70"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? 'Sealing the envelope…' : 'Post my letter'}
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. Sealing & Posting Mailbox Animation */}
                {(phase === 'sealing' || phase === 'posting') && (
                  <div aria-hidden="true" className="tp-post__scene">
                    <svg className="tp-post__envelope" viewBox="0 0 160 112">
                      <rect
                        fill="#fffdf8"
                        height="90"
                        rx="6"
                        stroke="#2a170e"
                        strokeWidth="4"
                        width="152"
                        x="4"
                        y="18"
                      />
                      <path
                        d="M6 104 64 62M154 104 96 62"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <path
                        className="tp-post__flap"
                        d="M6 22 80 74 154 22"
                        fill="#fbe3b4"
                        stroke="#2a170e"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      />
                      <circle cx="80" cy="72" fill="#a24a1a" r="11" stroke="#2a170e" strokeWidth="3" />
                    </svg>

                    <svg className="tp-post__box" viewBox="0 0 200 260">
                      <rect
                        fill="#5a3a28"
                        height="86"
                        stroke="#2a170e"
                        strokeWidth="4"
                        width="28"
                        x="86"
                        y="170"
                      />
                      <path
                        d="M30 70a70 54 0 0 1 140 0v104H30z"
                        fill="#c2622b"
                        stroke="#2a170e"
                        strokeLinejoin="round"
                        strokeWidth="5"
                      />
                      <rect fill="#2a170e" height="14" rx="7" width="84" x="58" y="86" />
                      <path
                        d="M44 128h112"
                        opacity=".35"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <g className="tp-post__flag">
                        <path d="M170 120V64" stroke="#2a170e" strokeLinecap="round" strokeWidth="5" />
                        <path
                          d="M170 64h22v16h-22"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeLinejoin="round"
                          strokeWidth="4"
                        />
                      </g>
                    </svg>
                  </div>
                )}

                {/* 3. Sent Confirmation */}
                {phase === 'sent' && (
                  <div ref={sentRef} className="tp-post__sent" role="status" tabIndex={-1}>
                    <svg
                      aria-hidden="true"
                      className="tp-post__box tp-post__box--sent"
                      viewBox="0 0 200 150"
                    >
                      <rect
                        fill="#5a3a28"
                        height="52"
                        stroke="#2a170e"
                        strokeWidth="4"
                        width="28"
                        x="86"
                        y="96"
                      />
                      <path
                        d="M30 50a70 44 0 0 1 140 0v52H30z"
                        fill="#c2622b"
                        stroke="#2a170e"
                        strokeLinejoin="round"
                        strokeWidth="5"
                      />
                      <rect fill="#2a170e" height="12" rx="6" width="84" x="58" y="58" />
                      <path d="M170 92V22" stroke="#2a170e" strokeLinecap="round" strokeWidth="5" />
                      <path
                        d="M170 22h22v16h-22"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      />
                    </svg>
                    <p className="font-plush mt-4 text-[2rem]">Message received!</p>
                    <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">
                      Thank you — our team will get back to you promptly. For the quickest reply, message us on WhatsApp.
                    </p>
                    <a
                      className="btn btn-whatsapp mt-6"
                      href={WHATSAPP_HREF}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      WhatsApp us
                    </a>
                  </div>
                )}
              </div>

              {/* Teddy mascot waiting for letter */}
              <div className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40" data-facing="left">
                <PupBuddy facing="left" pose="sit" label="Teddy, waiting for your letter" />
              </div>
            </div>

            {/* Left Column: Direct WhatsApp, Phone, Email & Downtown Dubai Shopfront */}
            <div className="lg:col-span-5 lg:row-start-1">
              <a
                className="btn btn-whatsapp w-full sm:w-auto"
                href={WHATSAPP_HREF}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp +971 54 167 6733
              </a>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">call us</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <a className="link-ink" href="tel:+971541676733">
                      +971 54 167 6733
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">email</dt>
                  <dd className="mt-1 break-all text-lg font-semibold">
                    <a className="link-ink" href="mailto:teddypupsdubai@gmail.com">
                      teddypupsdubai@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Downtown Dubai Shopfront Section */}
              <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 right-0 w-3/4 text-toffee/30"
                  viewBox="0 0 300 120"
                >
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                </svg>

                <div className="tp-visit relative p-7 pt-6">
                  <div>
                    <h2 className="font-plush text-[2rem] leading-tight" id="visit-title">
                      Visit us in Downtown Dubai
                    </h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                      Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.
                    </p>

                    <p className="mt-4 flex items-center gap-2 font-semibold">
                      <svg
                        aria-hidden="true"
                        className="size-5 shrink-0 text-toffee-deep"
                        fill="currentColor"
                        viewBox="0 0 64 64"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>

                    <a
                      className="btn btn-ghost mt-6 !bg-milk"
                      href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className="tp-visit__photo">
                    <img
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      decoding="async"
                      loading="lazy"
                      src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        objectFit: 'cover',
                        objectPosition: '45.3% 44.4%',
                      }}
                    />
                  </figure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
