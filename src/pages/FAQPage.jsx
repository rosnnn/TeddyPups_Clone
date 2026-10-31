import React, { useState } from 'react';
import FAQS from '../data/faq';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-page="faq" className="tp-page pt-12 pb-24">
      <div className="gutter mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="font-scrawl text-lg text-toffee-ink">answers & clarity</p>
          <h1 className="font-plush text-giant text-cocoa mt-2">Questions &amp; answers</h1>
          <p className="text-lede mt-4 max-w-[50ch] mx-auto text-cocoa-soft leading-relaxed">
            Everything you need to know about our teacup puppies, health certificates, imports, and post-adoption care.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-2 border-honey bg-milk py-4 pl-12 pr-6 text-base text-cocoa placeholder:text-cocoa/40 shadow-sm focus:border-toffee focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-toffee">
              🔍
            </span>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl bg-milk shadow-md border-2 border-honey/40 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-honey-soft/20"
                >
                  <span className="font-plush text-xl text-cocoa pr-4 flex items-center gap-3">
                    <span className="text-toffee font-bold">Q:</span> {faq.question}
                  </span>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-honey-soft text-cocoa font-bold transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-cocoa text-milk' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-honey/30 px-6 pb-6 pt-4 text-cocoa-soft text-base leading-relaxed bg-[#fffdf8] animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-16 rounded-3xl bg-honey/40 p-8 text-center border-2 border-honey">
          <h3 className="font-plush text-2xl text-cocoa">Still have a question?</h3>
          <p className="text-cocoa-soft mt-2 text-sm">
            We are always happy to answer any questions about our puppies, sizes, and care.
          </p>
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-6"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
