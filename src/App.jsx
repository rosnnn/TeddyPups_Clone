import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroCurtain from './components/IntroCurtain';
import ScrollToTop from './components/ScrollToTop';
import PawTrailCanvas from './components/PawTrailCanvas';

import HomePage from './pages/HomePage';
import PuppiesPage from './pages/PuppiesPage';
import GoneHomePage from './pages/GoneHomePage';
import HappyFamiliesPage from './pages/HappyFamiliesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PuppyDetailPage from './pages/PuppyDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Animated Puppy Welcome Curtain */}
      <IntroCurtain />

      {/* Skip to Content for Accessibility */}
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk"
      >
        Skip to content
      </a>

      {/* Global Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main" tabIndex="-1" className="relative pt-[var(--header-h)] outline-none min-h-[80vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puppies" element={<PuppiesPage />} />
          <Route path="/gone-home" element={<GoneHomePage />} />
          <Route path="/happy-families" element={<HappyFamiliesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/puppies/:slug" element={<PuppyDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Starry Sky Footer */}
      <Footer />

      {/* Interactive Paw Trail Cursor Effect Canvas */}
      <PawTrailCanvas />
    </BrowserRouter>
  );
}
