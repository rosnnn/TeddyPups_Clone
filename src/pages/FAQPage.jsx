import React, { useState, useId, useMemo, useRef, useEffect } from 'react';
import PupBuddy from '../components/pup/PupBuddy';
import faqsData from '../data/faqsExact.json';

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const PINS = ['var(--color-toffee)', 'var(--color-sky-deep)', '#d9a13c', '#c45a6a'];
const ASK_HREF = 'https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%3A';

function Highlight({ text, query }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
      )}
    </>
  );
}

function NoteItem({ item, idx, isOpen, onToggle, query, tilt, pin }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    el.dataset.armed = 'true';
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.dataset.revealed = 'true';
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.revealed = 'true';
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className="tp-note"
      data-reveal="true"
      data-unfolded={isOpen || undefined}
      style={{
        '--tilt': `${tilt}deg`,
        '--pin': pin,
        '--i': idx,
      }}
    >
      <span aria-hidden="true" className="tp-note__pin" />
      <h2 className="tp-note__q">
        <button
          type="button"
          id={`q-${item.id}`}
          aria-expanded={isOpen}
          aria-controls={`a-${item.id}`}
          onClick={onToggle}
        >
          <span className="font-plush-text">
            <Highlight text={item.question} query={query} />
          </span>
          <span aria-hidden="true" className="tp-note__chevron" />
        </button>
      </h2>
      <div
        id={`a-${item.id}`}
        role="region"
        aria-labelledby={`q-${item.id}`}
        className="tp-note__answer"
        inert={!isOpen ? '' : undefined}
      >
        <div className="tp-note__flap">
          <p>
            <Highlight text={item.answer} query={query} />
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const inputId = useId();

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? faqsData.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : faqsData),
    [q]
  );

  const handleToggle = (id) => {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    if (isOpening) {
      window.dispatchEvent(
        new CustomEvent('pup:cue', {
          detail: { say: 'good question!', secs: 1.2 },
        })
      );
    }
  };

  return (
    <div className="tp-page" data-page="faq">
      <section
        aria-labelledby="faq-title"
        className="tp-scene tp-faqroom overflow-hidden"
        data-pup-scene="true"
        data-tone="dark"
        style={{ '--sky-top': '#a95e32', '--sky-bottom': '#331c11' }}
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="max-w-4xl">
            <h1 className="font-plush text-giant" id="faq-title">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can&#x27;t find what you&#x27;re looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>

          {/* Corkboard with sticky side filter and animated notes */}
          <div className="mt-14">
            <div className="tp-notes" data-open={openId || q ? '' : undefined}>
              {/* Sticky Sidebar: Search, Count, Pup Buddy & WhatsApp CTA */}
              <aside aria-label="Find a question" className="tp-notes__side">
                <label className="font-scrawl tp-notes__label" htmlFor={inputId}>
                  sniff out a question
                </label>
                <div className="tp-notes__search">
                  <svg aria-hidden="true" className="tp-notes__lens" viewBox="0 0 24 24">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m15.5 15.5 5 5" />
                  </svg>
                  <input
                    autoComplete="off"
                    id={inputId}
                    placeholder="delivery, Korea, vaccinated…"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <p aria-live="polite" className="tp-notes__count">
                  {query.trim()
                    ? `${filtered.length} ${filtered.length === 1 ? 'note' : 'notes'} found`
                    : `${faqsData.length} notes on the board`}
                </p>

                <div className="tp-notes__teddy">
                  <span aria-hidden="true" className="tp-notes__bubble font-plush">
                    <span className="tp-notes__q">?</span>
                    <span className="tp-notes__a">!</span>
                  </span>
                  <PupBuddy
                    pose="sit"
                    act="tilt"
                    label="Teddy, reading the notes"
                  />
                </div>

                <a
                  className="btn btn-whatsapp tp-notes__ask"
                  href={ASK_HREF}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ask your own question
                </a>
              </aside>

              {/* Corkboard Notice Board */}
              <div className="tp-notes__board">
                <ul className="tp-notes__list">
                  {filtered.map((item, idx) => {
                    const isOpen = openId === item.id || (!!q && item.answer.toLowerCase().includes(q));
                    return (
                      <NoteItem
                        key={item.id}
                        idx={idx}
                        isOpen={isOpen}
                        item={item}
                        pin={PINS[idx % PINS.length]}
                        query={query}
                        tilt={TILTS[idx % TILTS.length]}
                        onToggle={() => handleToggle(item.id)}
                      />
                    );
                  })}
                </ul>

                {/* Empty State */}
                {!filtered.length && (
                  <div className="tp-note tp-note--empty">
                    <span aria-hidden="true" className="tp-note__pin" />
                    <p className="font-plush-text text-[1.2rem] font-bold">
                      No note about “{query.trim()}” yet.
                    </p>
                    <p className="mt-2">
                      <a
                        className="link-ink"
                        href={ASK_HREF}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Ask us on WhatsApp
                      </a>{' '}
                      and we&#x27;ll answer.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
