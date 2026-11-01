import React, { useState } from 'react';

export default function EnquiryLetterForm({ puppy, whatsappHref }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultWaHref =
    whatsappHref ||
    `https://wa.me/971541676733?text=${encodeURIComponent(
      `Hi TeddyPups! I'm interested in ${puppy.name}, the ${puppy.breed}`
    )}`;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please provide a valid phone or WhatsApp number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate natural submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="tp-sent rounded-[2rem] border-[3px] border-cocoa bg-honey p-8 text-center shadow-lg"
      >
        {/* Illustrated Envelope with Wax Stamp */}
        <svg
          viewBox="0 0 120 84"
          className="tp-envelope mx-auto w-32 drop-shadow-md"
          aria-hidden="true"
        >
          <path
            d="M6 10h108v68H6z"
            fill="#fffdf8"
            stroke="#2a170e"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M6 10l54 40 54-40"
            fill="none"
            stroke="#2a170e"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            cx="94"
            cy="62"
            r="12"
            fill="#c2622b"
            stroke="#2a170e"
            strokeWidth="2.5"
          />
        </svg>

        <p className="font-plush mt-4 text-[2rem] text-cocoa">Message received!</p>
        <p className="mx-auto mt-2 max-w-[38ch] text-cocoa-soft font-medium">
          Thank you — our concierge team will get back to you promptly. For the quickest reply, message us directly on WhatsApp.
        </p>
        <a
          href={defaultWaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-6 inline-flex"
        >
          WhatsApp us
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-cocoa">
            Your name <span className="text-toffee-ink">*</span>
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Sarah"
            className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
          />
          {errors.name && (
            <p className="mt-1 text-sm font-semibold text-[#b3261e]">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-cocoa">
            Phone or WhatsApp <span className="text-toffee-ink">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+971 50 123 4567"
            className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
          />
          {errors.phone ? (
            <p className="mt-1 text-sm font-semibold text-[#b3261e]">{errors.phone}</p>
          ) : (
            <p className="mt-1 text-sm text-cocoa-soft">With country code, e.g. +971</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-cocoa">
            Email <span className="font-normal text-cocoa-soft">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-cocoa">
            Your area <span className="font-normal text-cocoa-soft">(optional)</span>
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            placeholder="e.g. Dubai Marina"
            className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[0.95rem] font-semibold text-cocoa">
          Message <span className="font-normal text-cocoa-soft">(optional)</span>
        </label>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={`Tell us when you'd like to meet ${puppy.name} or any questions you have...`}
          className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 py-3 text-base outline-none focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full sm:w-auto cursor-pointer"
      >
        {isSubmitting ? 'Sending enquiry...' : `Send enquiry about ${puppy.name}`}
      </button>
    </form>
  );
}
