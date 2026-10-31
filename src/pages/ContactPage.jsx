import React, { useState } from 'react';
import PupBuddy from '../components/pup/PupBuddy';
import PUPPIES from '../data/puppies';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number so we can reach you.');
      return;
    }
    setIsSubmitted(true);
    window.dispatchEvent(
      new CustomEvent('pup:cue', {
        detail: { say: 'letter received!', secs: 2.0 }
      })
    );
  };

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
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 className="font-plush text-giant max-w-[12ch] lg:col-span-7" id="contact-title">
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Right Column: Hand-written Letter Form */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div className="tp-post" data-phase={isSubmitted ? 'sent' : 'writing'}>
                {isSubmitted ? (
                  <div className="tp-letterform py-12 text-center">
                    <span aria-hidden="true" className="tp-letter__stamp mx-auto mb-6 block">
                      <svg aria-hidden="true" className="size-9 text-toffee" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>
                    <h3 className="font-plush text-3xl text-[var(--ink)]">Letter posted!</h3>
                    <p className="font-scrawl text-xl mt-3 text-[var(--ink-soft)]">
                      Thank you! We've received your note and will be in touch shortly on WhatsApp or phone.
                    </p>
                    <button
                      type="button"
                      className="btn btn-ghost mt-8"
                      onClick={() => {
                        setFormData({ name: '', phone: '', email: '', area: '', puppyId: '', message: '' });
                        setIsSubmitted(false);
                      }}
                    >
                      Write another letter
                    </button>
                  </div>
                ) : (
                  <form className="tp-letterform" onSubmit={handleSubmit} noValidate>
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg aria-hidden="true" className="size-9 text-toffee" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                    <p className="tp-letterform__line">
                      my name is{' '}
                      <span className="tp-blank" style={{ '--size': '16ch' }}>
                        <input
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
                      , and I'm curious about{' '}
                      <span className="tp-blank tp-blank--select">
                        <select
                          name="puppyId"
                          value={formData.puppyId}
                          onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                        >
                          <option value="">any puppy (not sure yet)</option>
                          {PUPPIES.slice(0, 14).map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.breed}, {p.gender})
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    <label className="sr-only" htmlFor="contact-note">
                      Your message (optional)
                    </label>
                    <textarea
                      id="contact-note"
                      className="tp-letterform__note"
                      maxLength={2000}
                      name="message"
                      placeholder="Anything else you'd like to tell us…"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="tp-letterform__sign">
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button className="btn btn-primary" type="submit">
                        Post my letter
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Teddy mascot waiting for letter */}
              <div className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40" data-facing="left">
                <PupBuddy facing="left" pose="sit" />
              </div>
            </div>

            {/* Left Column: Downtown Dubai Shopfront */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
              <section className="tp-shopfront mt-12 relative overflow-hidden rounded-3xl bg-[var(--color-creme)] shadow-sm">
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 right-0 w-3/4 text-toffee/30 pointer-events-none"
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

                    <p className="mt-4 flex items-center gap-2 font-semibold text-[var(--ink)]">
                      <svg aria-hidden="true" className="size-5 shrink-0 text-toffee-deep" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
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

                  <figure className="tp-visit__photo mt-6 relative h-56 w-full overflow-hidden rounded-2xl">
                    <img
                      alt="The apricot teddy bear puppy from our showroom"
                      src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      loading="lazy"
                      className="size-full object-cover"
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
