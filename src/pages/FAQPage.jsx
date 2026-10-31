import React, { useState } from 'react';
import PupBuddy from '../components/pup/PupBuddy';

const FAQS_LIST = [
  {
    id: 'f1',
    q: 'Are your puppies vaccinated and health-checked?',
    a: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)'
  },
  {
    id: 'f2',
    q: 'Can I meet a puppy before I decide?',
    a: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    tilt: '1.2deg',
    pin: 'var(--color-sky-deep)'
  },
  {
    id: 'f3',
    q: 'Can I take my puppy home the same day?',
    a: 'Local puppies are available immediately, so you can take your puppy home the same day.',
    tilt: '-0.8deg',
    pin: '#d9a13c'
  },
  {
    id: 'f4',
    q: 'Do you import puppies from abroad?',
    a: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
    tilt: '1.8deg',
    pin: '#c45a6a'
  },
  {
    id: 'f5',
    q: 'How does an imported puppy travel to Dubai?',
    a: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
    tilt: '-1.2deg',
    pin: 'var(--color-toffee)'
  },
  {
    id: 'f6',
    q: 'Will I see photos and health details first?',
    a: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
    tilt: '0.7deg',
    pin: 'var(--color-sky-deep)'
  },
  {
    id: 'f7',
    q: 'Do you deliver?',
    a: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
    tilt: '-1.9deg',
    pin: '#d9a13c'
  },
  {
    id: 'f8',
    q: 'Which breeds do you usually have?',
    a: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
    tilt: '1.4deg',
    pin: '#c45a6a'
  },
  {
    id: 'f9',
    q: 'Is there help after my puppy comes home?',
    a: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)'
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState(new Set());

  const toggleNote = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        window.dispatchEvent(
          new CustomEvent('pup:cue', {
            detail: { say: 'good question!', secs: 1.2 }
          })
        );
      }
      return next;
    });
  };

  const filteredFaqs = FAQS_LIST.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tp-page" data-page="faq">
      <section
        aria-labelledby="faq-title"
        className="tp-scene tp-faqroom overflow-hidden"
        data-pup-scene="true"
        data-tone="light"
        style={{ '--sky-top': '#fffcf5', '--sky-bottom': '#fbe1ae' }}
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-[48ch]">
            <h1 className="font-plush text-giant" id="faq-title">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-4 text-[var(--ink-soft)]">
              Everything you need to know about adopting a puppy with TeddyPups in Dubai — visits, health checks, travel, and aftercare.
            </p>
          </header>

          <div className="mt-14 tp-notes">
            {/* Sticky Side Column: Search & Mascot */}
            <aside aria-label="Find a question" className="tp-notes__side">
              <label className="font-scrawl tp-notes__label" htmlFor="faq-search-input">
                sniff out a question
              </label>
              <div className="tp-notes__search">
                <svg aria-hidden="true" className="tp-notes__lens" viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m15.5 15.5 5 5" />
                </svg>
                <input
                  id="faq-search-input"
                  type="search"
                  autoComplete="off"
                  placeholder="delivery, Korea, vaccinated…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <p aria-live="polite" className="tp-notes__count">
                {filteredFaqs.length} note{filteredFaqs.length === 1 ? '' : 's'} on the board
              </p>

              <div className="tp-notes__teddy">
                <span aria-hidden="true" className="tp-notes__bubble font-plush">
                  <span className="tp-notes__q">?</span>
                  <span className="tp-notes__a">!</span>
                </span>
                <PupBuddy facing="right" pose="sit" />
              </div>
            </aside>

            {/* Right Column: Corkboard Notes */}
            <div className="tp-notes__board">
              <ul className="tp-notes__list">
                {filteredFaqs.map((item, idx) => {
                  const isOpen = openIds.has(item.id);
                  return (
                    <li
                      key={item.id}
                      className="tp-note"
                      data-reveal="true"
                      data-open={isOpen ? 'true' : undefined}
                      style={{
                        '--tilt': item.tilt,
                        '--pin': item.pin,
                        '--i': idx
                      }}
                    >
                      <span aria-hidden="true" className="tp-note__pin" />
                      <h2 className="tp-note__q">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`a-${item.id}`}
                          id={`q-${item.id}`}
                          onClick={() => toggleNote(item.id)}
                        >
                          <span className="font-plush-text">{item.q}</span>
                          <span aria-hidden="true" className="tp-note__chevron" />
                        </button>
                      </h2>
                      <div
                        id={`a-${item.id}`}
                        role="region"
                        aria-labelledby={`q-${item.id}`}
                        className="tp-note__answer"
                        style={{ display: isOpen ? 'block' : 'none' }}
                      >
                        <div className="tp-note__flap">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Bottom WhatsApp CTA */}
              <div className="mt-16 flex flex-col items-start gap-4 rounded-3xl bg-[var(--color-creme)] p-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-plush text-2xl text-[var(--ink)]">
                    Still have a question?
                  </h3>
                  <p className="mt-1 text-[var(--ink-soft)]">
                    Our concierge team is available 24/7 on WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/971507779999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Chat with concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
