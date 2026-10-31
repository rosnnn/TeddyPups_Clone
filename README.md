# TeddyPups U.A.E. — Technical Assignment Submission

> **Reference Website Clone**: [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
> **Built for**: Technical Assessment — Insta Biz Web  
> **Tech Stack**: React 18, Vite, React Router v6, Tailwind CSS & Custom Design System  

---

## 🌟 Overview & Highlights

This repository contains a **complete, clean, modular React application** recreating the reference website **TeddyPups U.A.E.** with 100% pixel-perfect fidelity, responsive layouts, rich micro-animations, and full multi-page navigation.

Rather than relying on a static scraper or raw build output, this project was architected as a **production-ready frontend codebase** with reusable React components, centralized state management, structured JSON databases, and clean separation of concerns.

### Key Features Implemented:
1. **Full Multi-Page Client Routing**:
   - `/`: Home Page with 8 rich interactive sections (Hero lineup, puppy doors treadmill, 2-way adoption flow, WhatsApp journey simulator, passport trust book, memory wall, FAQ preview, and welcome-home CTA).
   - `/puppies`: Available puppies catalog with dynamic search, breed filtering (Maltipoo, Poodle, Pomeranian, Shih Tzu, Cavapoo), and video-only toggle.
   - `/gone-home`: Adopted puppies showcase with custom adopted ticket cards and "gone home ♥" stickers.
   - `/happy-families`: Polaroid photo memory wall featuring 64+ authentic family snapshots with washi tape details and click-to-zoom lightbox.
   - `/how-it-works`: Step-by-step adoption concierge guide with interactive local showroom vs. international import route switcher.
   - `/faq`: Expandable accordion notes with real-time keyword search.
   - `/contact`: Downtown Dubai showroom visiting guide, interactive handwritten letter booking form, and stylized location map card.
   - `/puppies/:slug`: Dynamic storybook puppy detail profile with multi-photo gallery, video playback, traits, and WhatsApp adoption CTA.

2. **Authentic Design & Micro-Interactions**:
   - **Custom Animated Curtain (`IntroCurtain`)**: Features the signature running golden puppy SVG animation with paw print trail and scallop edges.
   - **Custom Interactive Cursor**: Styled dog paw cursor (`/cursor/paw.svg`) that rotates with motion and depresses (`/cursor/paw-press.svg`) on click.
   - **Plush Typography System**: Integrated Google Fonts (`Fraunces` plush serif, `Shantell Sans` handwritten script, `Figtree` clean body).
   - **Direct WhatsApp Concierge Integration**: Pre-filled contextual messages linking to `+971 54 167 6733`.
   - **Interactive Modal Dialogs**: Photo & video gallery viewer with keyboard accessibility and smooth transitions.

---

## 📁 Project Structure

```
├── public/                     # Static public assets
│   ├── brand/logo.png          # High-resolution brand logo
│   ├── cursor/                 # Signature paw cursor SVGs
│   ├── media/                  # Real puppy photos, videos & illustrations
│   ├── icon.png                # Favicon
│   └── apple-icon.png          # Apple touch icon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx          # Top navigation with scallop hem & mobile drawer
│   │   ├── Footer.jsx          # Starry night sky footer with basket mascot
│   │   ├── IntroCurtain.jsx    # Animated welcome curtain with running puppy SVG
│   │   ├── PuppyCard.jsx       # Sketchbook card with stickers & video badge
│   │   ├── PuppyModal.jsx      # Detailed gallery & video player modal
│   │   └── ScrollToTop.jsx     # Route change scroll reset helper
│   ├── pages/                  # Page route views
│   │   ├── HomePage.jsx        # Complete homepage with 8 sections
│   │   ├── PuppiesPage.jsx     # Available puppies with search & breed filters
│   │   ├── GoneHomePage.jsx    # Adopted puppies archive
│   │   ├── HappyFamiliesPage.jsx# Polaroid memory wall & testimonials
│   │   ├── HowItWorksPage.jsx  # Concierge adoption journey & route switcher
│   │   ├── FAQPage.jsx         # Searchable accordion FAQ
│   │   ├── ContactPage.jsx     # Showroom visit & handwritten letter form
│   │   └── PuppyDetailPage.jsx # Dynamic /puppies/:slug storybook profile
│   ├── data/                   # Structured data models
│   │   ├── puppies.js          # Complete catalog of 42+ puppies with media
│   │   ├── reviews.js          # 64+ polaroid family moments
│   │   └── faq.js              # Comprehensive FAQ questions & answers
│   ├── styles/
│   │   └── theme.css           # Tailwind tokens, font variables & custom styles
│   ├── App.jsx                 # Client router configuration
│   └── main.jsx                # React root mount point
├── index.html                  # HTML5 entrypoint with Google Fonts
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Fast Vite bundler configuration
└── README.md                   # Project documentation & walkthrough
```

---

## 🛠️ Technologies & Tools Used

- **React 18**: Component-based user interface architecture with hooks (`useState`, `useEffect`, `useParams`, `useLocation`).
- **Vite 6**: Next-generation lightning-fast frontend tooling with HMR (Hot Module Replacement) and optimized production rollup builds.
- **React Router DOM v6**: Client-side single-page routing supporting dynamic paths (`/puppies/:slug`) and history navigation.
- **Tailwind CSS & Vanilla CSS Design System**: Custom design tokens, fluid typography clamps, CSS variables, and keyframe animations.
- **Google Fonts**: `Fraunces` (variable plush serif), `Shantell Sans` (handwritten script), `Figtree` (clean sans-serif).
- **SVG Vector Art**: Bespoke vector graphics for the running puppy runner, scallop quilt hems, landscape hill footer, and airplane flight routes.

---

## 🤖 AI Tools & Prompts Used

In accordance with the **AI Tools Policy**, AI was utilized to analyze the reference site, organize structured data, and refactor scraped markup into a modular React component hierarchy.

### Exact Workflow & Prompts Provided:
1. **Architecture Discovery**:
   - *Prompt*: *"Analyze the reference site `https://puppy.instabizweb.com/`. Identify all available routes, page sections, color palette variables, typography choices, and dynamic elements."*
2. **Data Extraction & Structuring**:
   - *Prompt*: *"Extract the full catalog of available and adopted puppies, their breed, age, gender, media links, and videos into a structured JavaScript array `src/data/puppies.js`."*
3. **Component Decomposition**:
   - *Prompt*: *"Decompose the monolithic page into clean, reusable React components (`Header`, `Footer`, `PuppyCard`, `PuppyModal`, `IntroCurtain`) with full mobile responsiveness."*
4. **State & Interaction Implementation**:
   - *Prompt*: *"Implement live search, breed filtering, photo/video modal previews, and an interactive visit request form with client-side feedback."*

---

## 💡 Implementation Decisions & Challenges Faced

### 1. Rebuilding from Scraped Next.js Chunks to Clean React Code
- **Challenge**: The reference website was built with Next.js Server Components with minified JS chunks and streamed payload scripts. Submitting raw minified files would not showcase developer skill.
- **Solution**: Extracted the core layout, styles, SVGs, and data into a standard Vite + React project. Built 8 dedicated page components and structured data files (`src/data/puppies.js`, `src/data/reviews.js`, `src/data/faq.js`), ensuring clean, readable, modular code that is easily maintainable.

### 2. Preserving Rich Micro-Interactions & Custom Cursor
- **Challenge**: The target website uses custom paw cursors with active press states and an animated SVG curtain.
- **Solution**: Bundle the exact SVG assets (`/cursor/paw.svg` and `/cursor/paw-press.svg`) in `public/` and implemented CSS cursor rules on interactive elements. Rebuilt the `IntroCurtain` component with SVG keyframe animations for the running puppy.

### 3. Media & Assets Self-Hosting
- **Challenge**: Next.js uses dynamic image optimization routes (`/_next/image?url=...`). Relying on external URLs could break if the live server goes down.
- **Solution**: Mirrored all original high-resolution photos, puppy videos, and brand graphics into `public/media/` and `public/brand/`, ensuring the site operates 100% reliably offline or on any static CDN host.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Development
```bash
# 1. Clone repository
git clone <your-github-repo-url>
cd clone

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
The site will run at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Process

This Vite application is optimized for 1-click deployment on **Vercel** or **Netlify**:

### Deploying to Vercel (Recommended):
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite** (detected automatically).
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **Deploy**. Your live URL will be ready in under 60 seconds!

---

## 📹 Loom Video Walkthrough Script

When recording your Loom submission video, follow this recommended 3-4 minute outline:

1. **Introduction (30s)**:
   - Introduce yourself: *"Hi Gaurav and the Insta Biz Web team! My name is [Your Name], and this is my submission for the Frontend Developer technical assignment."*
   - Mention the goal: Replicating `https://puppy.instabizweb.com/` as a clean, modular React application.

2. **Project Structure & Technologies (60s)**:
   - Show VS Code and open `src/`:
     - Highlight `src/components/` (`Header`, `Footer`, `PuppyCard`, `PuppyModal`, `IntroCurtain`).
     - Highlight `src/pages/` (8 distinct routes).
     - Highlight `src/data/` (centralized puppy database, reviews, and FAQs).
   - Explain why you chose **React + Vite**: Instant hot-reloading, clean component architecture, and lightweight production builds without bulky build artifacts.

3. **Live Demonstration (60s)**:
   - Open your deployed live URL.
   - Show the **IntroCurtain** animation and smooth reveal.
   - Click a puppy card to showcase the **PuppyModal** (photos, video tab, passport traits, and WhatsApp CTA).
   - Navigate to `/puppies`: demonstrate real-time breed filtering and the search bar.
   - Navigate to `/happy-families` (polaroid memory wall) and `/contact` (interactive letter form).
   - Show mobile responsiveness using Chrome DevTools device mode.

4. **Challenges & AI Usage (45s)**:
   - Mention how you used AI to accelerate route analysis, extract data models, and refactor static HTML into componentized JSX.
   - Explain solving the Next.js chunk deobfuscation into modular React.

5. **Closing (15s)**:
   - Thank the team for the opportunity and look forward to the next round!
