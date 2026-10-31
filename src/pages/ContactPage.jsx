import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    breed: 'Maltipoo',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-page="contact" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Header */}
        <header className="mb-14 text-center">
          <p className="font-scrawl text-lg text-toffee-ink">warm welcome</p>
          <h1 className="font-plush text-giant text-cocoa mt-2">Get in touch with us</h1>
          <p className="text-lede mt-4 max-w-[50ch] mx-auto text-cocoa-soft leading-relaxed">
            Visit our boutique showroom in Downtown Dubai or speak directly with our puppy concierge team.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Showroom Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2.5rem] bg-milk p-8 shadow-xl border-2 border-honey/40 space-y-6">
              <h2 className="font-plush text-3xl text-cocoa">Visit us in Downtown Dubai</h2>

              <div className="space-y-4 text-cocoa-soft text-base">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold text-cocoa">Showroom Location</p>
                    <p className="text-sm">Downtown Dubai, United Arab Emirates</p>
                    <p className="text-xs text-cocoa-soft/80 mt-0.5">Complimentary valet parking available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-bold text-cocoa">Visiting Hours</p>
                    <p className="text-sm">Daily from 10:00 AM – 9:00 PM</p>
                    <p className="text-xs text-cocoa-soft/80 mt-0.5">Walk-ins welcome, private appointments recommended</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-bold text-cocoa">WhatsApp & Call</p>
                    <p className="text-sm font-semibold text-toffee">+971 54 167 6733</p>
                    <p className="text-xs text-cocoa-soft/80 mt-0.5">Instant response in English, Arabic & Russian</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-bold text-cocoa">Email</p>
                    <p className="text-sm">teddypupsadmin@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20like%20to%20schedule%20a%20visit%20to%20your%20Downtown%20Dubai%20showroom."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full flex justify-center text-base"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Stylized Map View */}
            <div className="rounded-[2.5rem] bg-[#e8e0d5] p-6 shadow-md border-2 border-cocoa/10 relative overflow-hidden aspect-[16/10] flex flex-col justify-between">
              <div className="z-10 bg-milk/90 backdrop-blur-sm p-4 rounded-2xl max-w-xs shadow-sm">
                <p className="font-plush text-lg text-cocoa font-bold">Downtown Dubai</p>
                <p className="text-xs text-cocoa-soft">Near Burj Khalifa & Dubai Mall</p>
              </div>
              <div className="z-10 flex justify-end">
                <a
                  href="https://maps.google.com/?q=Downtown+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-cocoa px-4 py-2 text-xs font-semibold text-milk hover:bg-toffee transition"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Letter / Booking Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-[#fffaf0] p-8 md:p-12 shadow-2xl border-4 border-honey relative">
              <div className="absolute right-8 top-8 rounded-xl border-2 border-dashed border-toffee p-2 text-center text-xs font-scrawl text-toffee rotate-6">
                <span>POSTAGE PAID</span>
                <br />
                <span>DUBAI UAE</span>
              </div>

              <p className="font-scrawl text-2xl text-cocoa mb-6">Dear TeddyPups team,</p>

              {submitted ? (
                <div className="rounded-2xl bg-honey/40 p-8 text-center space-y-4 animate-fadeIn">
                  <span className="text-5xl block">💌</span>
                  <h3 className="font-plush text-3xl text-cocoa">Thank you, {formData.name}!</h3>
                  <p className="text-cocoa-soft text-base">
                    We received your note. Our concierge will contact you on WhatsApp ({formData.phone}) to confirm your visit date.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary mt-4"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-scrawl text-lg text-cocoa block">My name is:</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-2xl border-2 border-honey/60 bg-milk px-5 py-3.5 text-cocoa placeholder:text-cocoa/30 focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-scrawl text-lg text-cocoa block">My phone / WhatsApp:</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-2xl border-2 border-honey/60 bg-milk px-5 py-3.5 text-cocoa placeholder:text-cocoa/30 focus:border-toffee focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-scrawl text-lg text-cocoa block">Preferred Breed:</label>
                      <select
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        className="w-full rounded-2xl border-2 border-honey/60 bg-milk px-5 py-3.5 text-cocoa focus:border-toffee focus:outline-none"
                      >
                        <option value="Maltipoo">Maltipoo</option>
                        <option value="Korean Teacup Poodle">Korean Teacup Poodle</option>
                        <option value="Pomeranian">Pomeranian</option>
                        <option value="Cavapoo">Cavapoo</option>
                        <option value="Shih Tzu">Shih Tzu</option>
                        <option value="Other / Surprise me">Other / Surprise me</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-scrawl text-lg text-cocoa block">I would love to visit on:</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-2xl border-2 border-honey/60 bg-milk px-5 py-3.5 text-cocoa focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-scrawl text-lg text-cocoa block">Personal Note / Message:</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your home, questions about sizing, or puppy preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border-2 border-honey/60 bg-milk px-5 py-3.5 text-cocoa placeholder:text-cocoa/30 focus:border-toffee focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn btn-primary w-full flex justify-center text-lg">
                      Send Letter &amp; Request Visit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
