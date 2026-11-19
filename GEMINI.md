# Ethiopian Signature Coffee - Project Guidelines & Learned Preferences

## Hero Section Architecture & Visual Layout
1. **Hero Layout & Geometry**:
   - The hero section uses an evenly balanced **6-column / 6-column** grid (`grid-cols-1 lg:grid-cols-12`, with `lg:col-span-6` text and `lg:col-span-6` visual card), eliminating horizontal dead space.
   - The coffee ceremony photo is preserved as a **FULL, standalone image element** in a luxury framed card container (`rounded-2xl sm:rounded-3xl overflow-hidden shadow-roast-bloom border border-border-subtle bg-stone-900 ring-1 ring-border-subtle`, `aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.5] xl:aspect-[4/3.3] max-h-[480px]`).
   - The source photo must remain the unclipped, pristine original showing the woman's complete natural hair curls, Habesha Kemis, cross, Jebena, and smoking incense. It must NEVER be artificially cropped at the hair or blended into the page background.
   - Main content top clearance is set to `pt-16 sm:pt-20 md:pt-24`, preventing excessive vertical gap under the fixed navbar while keeping the image card vertically centered.

## Services Section Structure
2. **Symmetrical Grid Layout**:
   - Card 1 ("Coffee Shop Setup & Organization") is featured as the flagship article.
   - Sourcing Banner ("Premium Ethiopian Coffee Sourcing") highlights direct trade supply.
   - Cards 2–6 follow a symmetrical 6-column container:
     - Row 1: Cards 2, 3, 4 each spanning `lg:col-span-2`.
     - Row 2: Cards 5, 6 each spanning `lg:col-span-3`.
     - Zero empty or missing columns on desktop.

## Header & Navigation Standards
3. **Contrast & Tap Targets**:
   - Fixed header uses an opaque cream backdrop (`bg-[#FBF9F5]/98 backdrop-blur-lg border-b border-border-subtle shadow-[0_2px_16px_rgba(36,20,10,0.06)]`) so dark sections (`#training`, footer) never bleed through and compromise navigation legibility.
   - Mobile hamburger menu toggle button meets the standard minimum 44×44px tap target (`w-11 h-11 min-w-[44px] min-h-[44px]`).

## Mobile Usability & Ergonomics
4. **Sticky WhatsApp Button**:
   - On mobile screens (`< sm`), it renders as a sleek **48×48px circular FAB** (`w-12 h-12 rounded-full p-0 flex items-center justify-center`) positioned safely at `bottom-20 right-3` above `MobileBottomNav`.
   - This compact footprint guarantees zero occlusion of the Contact form fields (Email, Area of Interest, and Message).
   - On desktop (`sm:` and above), it expands to the full pill with `"Chat on WhatsApp"` text.

## Contact Channels & Standardized Phone
5. **Contact Phone & Messaging**:
   - Official contact phone, WhatsApp, and Telegram number across all components, forms, and pages is strictly: **`+251925451711`**.
