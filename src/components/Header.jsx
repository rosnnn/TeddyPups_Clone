/**
 * Header Component
 * 
 * Replicates the authentic Next.js header behavior:
 * - Homepage (`data-home="true"`): Starts transparent over the hero sky at top.
 * - Dynamic Scroll Fade: At `scrollY > 8` (`data-scrolled="true"`), smoothly transitions
 *   milk background (`:before`) and scalloped SVG hem border (`.tp-header__hem`) to opacity 1.
 * - Subpages (`:not([data-home])`): Solid milk background and scalloped hem border always visible.
 * - Auto-Hide on Scroll Down: When scrolling down past 220px (`data-hidden="true"`), slides out
 *   of view (`translateY(-120%)`). Re-appears on scroll up or focusin.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const dialogRef = useRef(null);
  const location = useLocation();
  const headerRef = useRef(null);

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || dialog.dataset.closing) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }

    dialog.dataset.closing = "true";
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      dialog.removeEventListener("animationend", onEnd);
      if (dialog.dataset.closing) {
        delete dialog.dataset.closing;
        dialog.close();
      }
    };
    const onEnd = (e) => {
      if (e.target === dialog) {
        cleanup();
      }
    };
    timer = setTimeout(cleanup, 500);
    dialog.addEventListener("animationend", onEnd);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = -1;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      header.dataset.scrolled = currentY > 8 ? "true" : "false";
      if (Math.abs(currentY - lastY) > 6) {
        header.dataset.hidden = currentY > lastY && currentY > 220 ? "true" : "false";
        lastY = currentY;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onFocusIn = () => {
      header.dataset.hidden = "false";
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Puppies', path: '/puppies' },
    { name: 'Happy families', path: '/happy-families' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Visit & contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const pawPath = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        data-scrolled="false"
        data-hidden="false"
        data-home={location.pathname === '/' ? "true" : undefined}
        className="tp-header fixed inset-x-0 top-0 z-50"
      >
        <div className="tp-header__bar gutter">
          <Link to="/" className="tp-header__brand" aria-label="TeddyPups U.A.E. — home">
            <img
              alt="TeddyPups"
              width="56"
              height="56"
              className="tp-header__logo"
              src="/brand/logo.png"
            />
            <span className="font-plush tp-header__name">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="tp-header__nav">
            <ul>
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="tp-nav-link"
                      data-active={active ? "true" : "false"}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{link.name}</span>
                      <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true" fill="currentColor">
                        <path d={pawPath}></path>
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tp-header__end">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-header__wa"
            >
              WhatsApp us
            </a>

            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden"
              aria-haspopup="dialog"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 64 64" className="size-4" aria-hidden="true" fill="currentColor">
                <path d={pawPath}></path>
              </svg>
              Menu
            </button>
          </div>
        </div>

        {/* Decorative Scallop Hem */}
        <svg aria-hidden="true" className="tp-header__hem" width="100%" height="14" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill"></path>
              <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line"></path>
            </pattern>
          </defs>
          <rect width="100%" height="14" fill="url(#tp-hem)"></rect>
        </svg>
      </header>

      {/* Mobile Drawer Native Dialog */}
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="tp-menu m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40"
        onClick={(e) => e.target === dialogRef.current && closeMenu()}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        onClose={(e) => {
          delete e.currentTarget.dataset.closing;
        }}
      >
        <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
          <div className="flex items-center justify-between">
            <span className="font-scrawl text-lg">where to, friend?</span>
            <button
              type="button"
              onClick={closeMenu}
              className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)]"
                      data-active={active ? "true" : "false"}
                    >
                      <span className="flex items-center gap-3">
                        {link.name}
                        {active && (
                          <svg viewBox="0 0 64 64" className="inline size-8" aria-hidden="true" fill="currentColor">
                            <path d={pawPath}></path>
                          </svg>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 pt-4 border-t border-cocoa/10">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              className="btn btn-whatsapp w-full flex justify-center text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            <p className="text-center text-sm font-medium text-cocoa/80">
              Downtown Dubai · +971 54 167 6733
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
