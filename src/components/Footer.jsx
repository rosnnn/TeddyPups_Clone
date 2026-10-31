import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const exploreLinks = [
    { name: 'Available puppies', path: '/puppies' },
    { name: 'Gone home', path: '/gone-home' },
    { name: 'Happy families', path: '/happy-families' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Delivery & collection', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Visit & contact', path: '/contact' },
  ];

  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10">
      {/* Wavy Hill Landscape SVG */}
      <svg aria-hidden="true" className="tp-footer__hill" preserveAspectRatio="none" viewBox="0 0 1440 80">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z"></path>
      </svg>

      {/* Twinkling Stars in Night Sky */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[
            { left: '6%', top: '18%', width: '12.6px', delay: '0.00s' },
            { left: '14%', top: '42%', width: '8.4px', delay: '0.40s' },
            { left: '23%', top: '12%', width: '9.8px', delay: '0.80s' },
            { left: '31%', top: '30%', width: '7px', delay: '1.20s' },
            { left: '44%', top: '9%', width: '11.2px', delay: '1.60s' },
            { left: '52%', top: '36%', width: '7.7px', delay: '2.00s' },
            { left: '63%', top: '15%', width: '10.5px', delay: '2.40s' },
            { left: '71%', top: '40%', width: '7px', delay: '2.80s' },
            { left: '92%', top: '33%', width: '8.4px', delay: '3.20s' },
          ].map((star, i) => (
            <svg
              key={i}
              aria-hidden="true"
              className="tp-twinkle absolute text-honey"
              style={{ left: star.left, top: star.top, width: star.width, animationDelay: star.delay }}
              viewBox="0 0 40 40"
            >
              <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor"></path>
            </svg>
          ))}
        </div>
        <span className="tp-moon"></span>
      </div>

      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        {/* Brand Info */}
        <div className="md:col-span-5">
          <p className="font-plush text-big text-honey-soft">Home, at last.</p>
          <p className="mt-5 max-w-md text-milk/80 leading-relaxed">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>

        {/* Mascot Basket Illustration */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div className="tp-basket">
            <svg aria-hidden="true" className="tp-basket__back" viewBox="0 0 300 240">
              <ellipse className="tp-basket__hollow" cx="212" cy="145" rx="96" ry="12"></ellipse>
              <path className="tp-basket__rim-line" d="M116 145 A96 12 0 0 1 308 145"></path>
              <path className="tp-basket__rim" d="M116 145 A96 12 0 0 1 308 145"></path>
            </svg>

            <div className="pup-stop tp-basket__pup" data-act="basket" data-behind="true" data-facing="right">
              <div className="pup-buddy" data-facing="right">
                <svg aria-label="Teddy, sitting snug in his basket" role="img" style={{ overflow: 'visible' }} viewBox="0 0 300 240">
                  <g>
                    <g transform="translate(0 9)">
                      <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3"></path>
                      <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4"></path>
                      <circle cx="212" cy="100" r="48" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4"></circle>
                      <circle cx="170" cy="80" r="18" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4"></circle>
                      <circle cx="254" cy="80" r="18" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4"></circle>
                      <ellipse cx="196" cy="98" rx="6" ry="7" fill="#2a170e"></ellipse>
                      <ellipse cx="228" cy="98" rx="6" ry="7" fill="#2a170e"></ellipse>
                      <circle cx="198" cy="96" r="2" fill="#fff"></circle>
                      <circle cx="230" cy="96" r="2" fill="#fff"></circle>
                      <circle cx="182" cy="112" r="6" fill="#f9b9a6" opacity="0.8"></circle>
                      <circle cx="242" cy="112" r="6" fill="#f9b9a6" opacity="0.8"></circle>
                      <ellipse cx="212" cy="114" rx="7" ry="5" fill="#2a170e"></ellipse>
                    </g>
                    <g>
                      <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <svg aria-hidden="true" className="tp-basket__front" viewBox="0 0 300 240">
              <path className="tp-basket__body" d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z"></path>
              <path className="tp-basket__weave" d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206"></path>
              <path className="tp-basket__weave tp-basket__weave--stakes" d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230"></path>
              <path className="tp-basket__rim-line" d="M116 145 A96 12 0 0 0 308 145"></path>
              <path className="tp-basket__rim" d="M116 145 A96 12 0 0 0 308 145"></path>
            </svg>
          </div>
        </div>

        {/* Explore Links */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Section */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90">
            <li>
              <a
                className="font-semibold hover:text-honey flex items-center gap-1.5 transition-colors"
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp +971 54 167 6733
              </a>
            </li>
            <li>
              <a className="hover:text-honey transition-colors" href="mailto:teddypupsadmin@gmail.com">
                teddypupsadmin@gmail.com
              </a>
            </li>
            <li className="text-milk/80">Downtown Dubai, United Arab Emirates</li>
          </ul>

          <ul aria-label="Social media" className="mt-6 flex flex-wrap gap-3">
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition"
                href="https://www.instagram.com/teddypups.worldwide/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition"
                href="https://www.tiktok.com/@teddypupsuae"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition"
                href="https://www.facebook.com/profile.php?id=61567496944539"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center">
        <span className="flex items-center gap-3">
          <img alt="TeddyPups logo" className="size-9 rounded-full" width="36" height="36" src="/brand/logo.png" />
          © {new Date().getFullYear()} TeddyPups U.A.E. All rights reserved.
        </span>
        <span className="font-scrawl text-base text-honey/80">every puppy is family</span>
      </div>
    </footer>
  );
}
