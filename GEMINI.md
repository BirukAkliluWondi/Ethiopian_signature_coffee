# Ethiopian Signature Coffee - Project Guidelines & Learned Preferences

## Hero Section Architecture & Visual Layout
1. **Hero Layout & Geometry**:
   - The hero section uses an evenly balanced **6-column / 6-column** grid (`grid-cols-1 lg:grid-cols-12`, with `lg:col-span-6` text and `lg:col-span-6` visual card), eliminating horizontal dead space.
   - The coffee ceremony photo is preserved as a **FULL, standalone image element** in a luxury framed card container (`rounded-2xl sm:rounded-3xl overflow-hidden shadow-roast-bloom border border-border-subtle bg-stone-900 ring-1 ring-border-subtle`, `aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.5] xl:aspect-[4/3.3] max-h-[480px]`).
   - The source photo must remain the unclipped, pristine original showing the woman's complete natural hair curls, Habesha Kemis, cross, Jebena, and smoking incense. It must NEVER be artificially cropped at the hair or blended into the page background.
   - Main content top clearance is set to `pt-16 sm:pt-20 md:pt-24 lg:pt-28`, preventing excessive vertical gap under the fixed navbar while keeping the desktop side-by-side hero layout breathing and co-planar.
   - Left hero column maintains comfortable, generous vertical rhythm without a kicker badge by applying `lg:pt-12`, keeping the H1 headline comfortably lower (~50px below the card top, aligned with the shoulder in the photo at $y \approx 160\text{px}$) and ensuring the dual CTA buttons bottom edge aligns within $\le 1\text{px}$ of the ceremony photo card bottom ($y \approx 593\text{px}$).
   - Hero proof metrics: The 3 quantity cards (`14+ Turnkey Venues`, `250+ Certified Baristas`, `100% Direct-Trade Origins`) are positioned directly above the CTA buttons, maintaining clean vertical rhythm and breathing room.
   - On mobile viewports (`< sm`), the ceremony visual container applies `pt-4 -mb-4`, ensuring an exact 12px clearance below the mobile navigation header while keeping the H1 headline and body text below completely stationary. On intermediate / half-screen desktop viewports (`sm` and `md`, 640px to 1023px), it applies `sm:pt-5 sm:-mb-5 md:pt-6 md:-mb-6` to provide comfortable clearance under the 84px header without shifting the headline below, returning to `lg:pt-0 lg:mb-0` on full desktop side-by-side view.

## Direct-Trade Single Origins Section
2. **Single Origins Architecture**:
   - Positioned directly above `#services` ("Our Services") and below `#about`.
   - Displays 4 regional terroir cards in a symmetrical 4-column desktop grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`):
     - **Yirgacheffe**: Floral & Delicate
     - **Sidama**: Complex & Balanced
     - **Guji**: Lush & Exotic
     - **Harrar**: Wild & Sun-Dried
   - Header features uppercase kicker `THE BIRTHPLACE OF ARABICA`, title `Direct-Trade Single Origins`, and partner allocation copy.

## Services Section Structure
2. **Symmetrical Grid Layout**:
   - Card 1 ("Coffee Shop Setup & Organization") is featured as the flagship article.
   - Flow directly transitions to Cards 2–6 with zero disruptive middle banners or interruptions.
   - Cards 2–6 follow a symmetrical 6-column container:
     - Row 1: Cards 2, 3, 4 each spanning `lg:col-span-2`.
     - Row 2: Cards 5, 6 each spanning `lg:col-span-3`.
     - Zero empty or missing columns on desktop.
   - Coffee sourcing remains cleanly accessible through the Contact form dropdown and Hero narrative.

## Header & Navigation Standards
3. **Responsive Navigation Architecture by Viewport**:
   - Fixed header uses an opaque cream backdrop (`bg-[#FBF9F5]/98 backdrop-blur-lg border-b border-border-subtle shadow-[0_2px_16px_rgba(36,20,10,0.06)]`) so dark sections (`#training`, footer) never bleed through and compromise navigation legibility.
   - **Full Desktop View (`lg:`, 1024px+)**: Navigation is located ONLY in the top header as clean horizontal links (`Home`, `About`, `Services`, `Training`, `Projects`, `Contact`). Bottom navigation is completely hidden (`lg:hidden`).
   - **Half-Screen Desktop & Mobile View (`< lg`, < 1024px)**: Navigation is located ONLY at the bottom (`MobileBottomNav` fixed at bottom, `lg:hidden`). The top header displays ONLY the pristine logo & brand typography with zero hamburger button, eliminating duplicate or confusing navbars.

## Mobile Usability & Ergonomics
4. **Sticky WhatsApp Button (Minimalist & Occlusion-Free)**:
   - Rendered as an ultra-minimalist, sleek circular FAB across all viewports (`w-11 h-11` on mobile, `w-12 h-12` on desktop) using authentic WhatsApp green (`bg-[#25D366] hover:bg-[#20ba5a]`) with a crisp solid white WhatsApp icon.
   - Elimination of tacky visual clutter: No flashing/pulsing yellow radar dots, no permanent bulky 224px text capsules.
   - Desktop hover micro-interaction: Subtle, clean tooltip (`WhatsApp`) appears only on mouse hover, keeping the resting state 100% minimal.
   - Zero Occlusion & Dynamic Collision Avoidance:
     - On desktop (`sm:bottom-6 sm:right-6`), the 48px circle sits in the outer gutter on standard viewports (>1350px) and maintains safe clearance from hero imagery and cards on compact viewports.
     - On mobile (`bottom-20 right-3`), the 44px circle floats safely above `MobileBottomNav`, avoiding form fields and text.
     - Dynamic Footer Auto-Hide: Uses an `IntersectionObserver` to automatically fade out (`opacity-0 pointer-events-none translate-y-3`) whenever the footer is in view, guaranteeing that footer text, copyright, and location coordinates are NEVER covered or occluded.

## Contact Channels & Standardized Phone
5. **Contact Phone & Messaging**:
   - Official contact phone, WhatsApp, and Telegram number across all components, forms, and pages is strictly: **`+251925451711`**.
