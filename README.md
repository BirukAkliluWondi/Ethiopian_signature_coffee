# Ethiopian Signature Coffee

> **Beyond Coffee, Building Coffee Businesses**

Discover the excellence of Ethiopian coffee. We bring together premium Ethiopian coffee, professional barista and customer service training, coffee business consultancy, and innovative café solutions.

Recreated with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, preserving the exact UI/UX, brand typography, color palette, and cross-device responsiveness.

---

## Brand & Core Mission
- **Brand**: Ethiopian Signature Coffee
- **Mission**: To promote Ethiopian coffee culture and empower coffee businesses to achieve excellence.
- **Slogan**: Beyond Coffee, Building Coffee Businesses.

---

## Technology Stack & Architecture
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (`EB Garamond`, `Plus Jakarta Sans`, `Material Symbols Outlined`)
- **Structure**:
  - `src/app/layout.tsx` — Global root layout, font configurations, and metadata
  - `src/app/page.tsx` — Unified page combining modular sections
  - `src/app/globals.css` — Base styles, safe area insets, scrollbar handling
  - `src/components/Header.tsx` — Responsive desktop/mobile header with drawer menu
  - `src/components/Hero.tsx` — Mobile image-first hero showcase with verified button hierarchy
  - `src/components/About.tsx` — Mission, vision, and core approach cards
  - `src/components/Services.tsx` — Flagship service showcase & specialty capability grid
  - `src/components/Training.tsx` — Structured 4-stage professional barista curriculum
  - `src/components/Projects.tsx` — Executed café setups and hospitality engagements
  - `src/components/Contact.tsx` — Omnichannel communication channels & consultation form
  - `src/components/Footer.tsx` — Brand identity, quick links, and headquarters info
  - `src/components/MobileBottomNav.tsx` — Native fixed bottom app bar for mobile touch

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node.js v24.22.1)
- npm 9+

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the assigned port) in your browser.

### Production Build & Run
```bash
npm run build
npm run start
```
