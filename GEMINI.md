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

## Professional Footer Architecture
6. **4-Column Luxury Enterprise Footer**:
   - Background uses deep luxury emerald forest green (`bg-brand-green-dark` `#062b18`) with top subtle heritage accent ribbon.
   - Eliminates oversized, blurry background logo watermarks and centered flyer-style text.
   - 4-column structured desktop grid (`lg:grid-cols-12`):
     - Column 1 (`lg:col-span-4`): Brand logo mark, identity title, executive value proposition, physical headquarters in Addis Ababa, standardized phone `+251925451711`, email, and operating hours (EAT / UTC+3).
     - Column 2 (`lg:col-span-3`): Full directory of Services & Advisory (6 core turnkey practices) with direct anchor navigation.
     - Column 3 (`lg:col-span-2`): Direct-Trade Single Origins directory (Yirgacheffe, Sidama, Guji, Harrar) with tasting profiles and cooperative allocations.
     - Column 4 (`lg:col-span-3`): Direct Channels desk with verified WhatsApp pill, Telegram pill, and high-contrast gold 'Book Setup Advisory' action button.
   - Sub-footer legal bar with copyright, location accreditation, and smooth 'Back to Top ↑' anchor.
   - Preserves semantic `<footer>` element and `#footer` anchor to ensure the sticky WhatsApp button's `IntersectionObserver` continues to automatically hide with zero occlusion.

## Rollback & Baseline Preservation
7. **Pristine Snapshot Baseline**:
   - **Baseline Git Tag**: `baseline-stable` (Commit: `001d894`)
   - **Pre-Media Checkpoint Tag**: `pre-hero-media-carousel` (Commit: `04eacee`)
   - **Pre-Opening Motion Choreography Tag**: `pre-opening-motion-choreography` (Commit: `d822e2e`)
   - **Pre-Resequencing Checkpoint Tag**: `pre-chronological-resequence` (Commit: `a2d6404`)
   - **Pre-De-Box Checkpoint Tag**: `pre-debox-transformation` (Commit: `3e6d9ec`)
   - **Pre-UI/UX Refinements Checkpoint Tag**: `pre-ui-ux-refinements` (Commit: `7321bef`)
   - **Backup Branches**: `backup-stable-baseline`, `backup-pre-hero-media-carousel`, `backup-pre-opening-motion-choreography`, `backup-pre-chronological-resequence`, `backup-pre-debox-transformation`, `backup-pre-ui-ux-refinements` (Pushed to GitHub `origin`)
   - **Remote Synchronization**: Fully backed up on remote GitHub repository.
   - **One-Prompt Revert Protocol**:
     - To revert to the state before UI/UX refinements: `git reset --hard pre-ui-ux-refinements && git clean -fd`
     - To revert to the state before the de-box transformation: `git reset --hard pre-debox-transformation && git clean -fd`
     - To revert to the state before chronological re-sequencing: `git reset --hard pre-chronological-resequence && git clean -fd`
     - To revert to the state before the opening motion choreography: `git reset --hard pre-opening-motion-choreography && git clean -fd`
     - To revert to the state before the media carousel: `git reset --hard pre-hero-media-carousel && git clean -fd`
     - To revert to the absolute baseline: `git reset --hard baseline-stable && git clean -fd`

## Motion & Web Dynamics Architecture (Anti-PDF Standards)
8. **Dynamic Web Physics & Cleanliness Rules**:
   - **Strictly ZERO Pill Badges**: Never add `rounded-full` text tags, chips, or pill badges (e.g. `INTERACTIVE EXPLORER`, `CLIENT PORTFOLIO`).
   - **Strictly ZERO Text Bloat**: Maintain concise copy; never add accordion drawers, long competency matrices, or heavy FAQ blocks.
   - **Hero Live Proof Counters**: In `Hero.tsx`, the 3 quantity metrics animate from 0 to target (`14+`, `250+`, `100%`) on page mount with smooth decelerating curve (`easeOutQuart` over ~1.2s).
   - **Header Reading Progress Bar**: Thin 2.5px golden gradient line at bottom edge of fixed header tracks overall scroll percentage (0% to 100%).
   - **Staggered Scroll Reveal**: Elements smoothly reveal upon scrolling using lightweight, zero-dependency `IntersectionObserver` with staggered delays (`delay-100` to `delay-400`).
   - **Kinetic Card Physics**: Cards feature subtle elevation (`-translate-y-1.5`) and warm amber glow on hover (`hover:shadow-roast-bloom hover:ring-1 hover:ring-brand-yellow/40`).
   - **Bidirectional Scroll Reactivity**: Cards smoothly appear upon entering the viewport and gracefully fade away / scale down when exiting past the viewport edge in both directions (`.reveal-on-scroll`, `.reveal-visible`), re-revealing smoothly when scrolled back.
   - **Masked Line-Reveal Typography**: Major section headlines (H1, H2) use `.mask-reveal-wrap` and `.mask-reveal-content` to emerge upward from behind an invisible baseline mask with silky cubic-bezier deceleration.
   - **Interactive Cursor Spotlight Glare**: Cards across Single Origins, Services, Training, and Projects feature `.spotlight-card` projecting an organic radial amber light that dynamically tracks `--mouse-x` and `--mouse-y`.
   - **Button Shimmer**: Primary CTA buttons feature hardware-accelerated subtle sheen sweep on mouse hover (`.btn-shimmer`).

## Hero Sequential Media Showcase Architecture
9. **Story Progression & Crossfading Media**:
   - **Sequential Order**:
     1. Slide 0: Woman Coffee Ceremony Photo (unclipped original, 5.5s display).
     2. Slide 1: Freshly Roasted Beans in Clay Pot with Jebena and Incense (`/hero/roast-and-jebena.jpg`, 5.0s display).
     3. Slide 2: Overhead Hands Gathering Celebrating Coffee (`/hero/coffee-community-celebration.jpg`, 5.0s display).
     4. Slide 3: Traditional Ceremony Video (`/hero/ceremony-video.mp4`, 10.6s playback).
   - **Crossfade Physics**: `absolute inset-0 transition-opacity duration-1000 ease-in-out` ensures zero layout jump or content reflow.
   - **Video Completion Callback**: Video mounts with `muted`, `playsinline`, and `preload="auto"`. Upon `onEnded`, the video smoothly fades away and the carousel loops back to Slide 0.
   - **Audio Toggle**: Discreet circular glassmorphic speaker button (`w-8 h-8`) allows visitors to unmute ceremony audio during video playback.
   - **Segment Story Indicators**: 4 thin geometric accent lines (`h-[2.5px] rounded-full`, active `w-8 sm:w-10 bg-brand-yellow`, inactive `w-3 sm:w-4 bg-white/40`) allow slide navigation without any text pill badges.

## Initial Page Load Motion Choreography
10. **Staggered Orchestrated Cascade Architecture ($0\text{ms} \rightarrow 1000\text{ms}$)**:
   - **Header & Top Accent Line**: Glide down from top screen edge (`.mount-header`, `0ms - 700ms`, `cubic-bezier(0.16, 1, 0.3, 1)`).
   - **Mobile Bottom Navigation**: Glides up from bottom edge (`.mount-mobile-nav`, `0ms - 700ms`, `cubic-bezier(0.16, 1, 0.3, 1)`).
   - **Visual Media Showcase Card**: Blooms and rises into place (`.mount-hero-card`, `150ms - 1000ms`, `translateY(28px) scale(0.96)` to `translateY(0) scale(1)`).
   - **Masked H1 Headline**: Emerges upward from behind invisible baseline clip mask (`.mount-headline`, `250ms - 1100ms`).
   - **Hero Narrative Paragraph**: Floats up smoothly into position (`.mount-paragraph`, `400ms - 1150ms`).
   - **Quantitative Proof Metrics**: 3 metric cards stagger in sequentially (`.mount-metric-1` at 500ms, `.mount-metric-2` at 600ms, `.mount-metric-3` at 700ms) with synchronized live counters rolling up as each card lands (`14+`, `250+`, `100%`).
   - **Dual CTA Buttons**: Float up into position (`.mount-cta`, `800ms - 1550ms`) with subtle sheen sweep on hover.
   - **Accessibility Guarantees**: Under `@media (prefers-reduced-motion: reduce)`, all mount keyframes are disabled and elements render instantaneously with zero delay or motion.
   - **Strict Preservation**: Zero layout shift (CLS), zero text bloat, and strictly zero text pill badges (`rounded-full` tags).

## Chronological Information Architecture (IA) Standards
11. **10-Stage High-Converting Narrative Sequence**:
   - **Order**:
     1. `Hero` (`#home`): Value proposition, live metric counters, sequential media showcase, dual CTAs.
     2. `TrustRibbon`: 5 industry alignments (SCA Standards, Direct Cooperatives, Hotels, Cafés, ECTA export).
     3. `Services` (`#services`): Flagship Turnkey Setup & Organization + 5 specialized practices.
     4. `Process` (`#process`): 4-Stage turnkey methodology (Concept, Layout, Sourcing/Academy, Launch & SOPs).
     5. `Training` (`#training`): 4-Stage barista curriculum in deep luxury forest green container.
     6. `SingleOrigins` (`#origins`): 4 direct-trade highland terroirs (Yirgacheffe, Sidama, Guji, Harrar).
     7. `Projects` (`#projects`): Demonstrated executed works with quantifiable metrics (`6-Week Launch`, `+32% Margin Lift`, `1,200kg/mo Roasting`).
     8. `About` (`#about`): Mission statement, brand philosophy, and Addis Ababa headquarters.
     9. `Contact` (`#contact`): Direct booking desk, consultation form, phone, WhatsApp, Telegram.
     10. `Footer` (`#footer`): 4-Column luxury enterprise footer, deep directory, location coordinates.
   - **Navigation Consistency**: Desktop fixed header contains 8 primary links matching the exact chronological sequence. Mobile bottom bar features 6 core thumb destinations with automated scroll mapping.
   - **Strict Rule Preservation**: ZERO text pill badges, ZERO text bloat, unclipped original ceremony photo, phone `+251925451711`.

## De-Boxed Architecture Standards (Anti-Card Fatigue)
12. **Organic Layout Archetypes & Monotony Elimination**:
   - **Hero Proof Metrics**: Borderless, open-air editorial typography with hairline dividers (`divide-x divide-border-subtle/80 py-2.5 border-y border-border-subtle/70`), eliminating 3 card boxes while maintaining live animated roll-ups (`14+`, `250+`, `100%`).
   - **Trust Ribbon**: Seamless, borderless architectural ribbon separating Hero and Services without card container frames.
   - **Process ("How We Work")**: Connected progressive timeline with a continuous connecting guideline linking milestone nodes (`01`, `02`, `03`, `04`) and free-flowing deliverables, replacing 4 disconnected card boxes.
   - **Single Origins**: Unified Artisanal Terroir Ledger with faint vertical dividing rules (`divide-x`), displaying regional terroirs (*Yirgacheffe*, *Sidama*, *Guji*, *Harrar*) as an open sensory table rather than 4 separate card boxes.
   - **About Section**: Typographic Brand Manifesto featuring a prominent, unboxed pull-quote with amber accent line and asymmetric story pillars, replacing the nested box-within-a-box.
   - **Strict Rule Preservation**: ZERO text pill badges, ZERO text bloat, unclipped original ceremony photo, phone `+251925451711`.

## UI/UX Polish & Mobile Refinements Standards
13. **Mobile Contrast, Collision Avoidance & Form Refinements**:
   - **Top Header Contrast & Mobile Legibility**:
     - Header uses 100% solid porcelain cream (`bg-[#FBF9F5]`) across both rest and scrolled states.
     - Completely prevents dark background imagery or deep green sections from bleeding through on narrow viewports.
     - Brand title `ETHIOPIAN SIGNATURE` strictly preserves brand color (`text-brand-green` `#0B4D2C`), achieving superior WCAG AAA contrast ratio (>12:1) against the solid cream background.
   - **Sticky WhatsApp FAB Spacing & Dual Occlusion Avoidance**:
     - Mobile positioning elevated to `bottom-24 right-4` (`bottom: 96px`, `right: 16px`), establishing a safe 39px vertical clearance above `MobileBottomNav` and preventing card border clipping.
     - Dual-target `IntersectionObserver` continuously monitors both `footer` and `#contact` (`threshold: 0.08`), automatically fading out the button (`opacity-0 pointer-events-none translate-y-3`) whenever either section enters the viewport. Guarantees zero occlusion of form fields, inputs, or CTA buttons.
   - **Contact Form Input Ergonomics & Selection Grid**:
     - Replaced sample placeholder text (`Abebe Bikila`, `+251 92 545 1711`, `abebe@example.com`) with clear, subtle instructional prompt text (`Enter your full name`, `e.g. +251 91 234 5678`, `e.g. name@company.com (optional)`, `Describe your venue location, concept, opening timeline, or advisory needs...`) using `placeholder:text-text-muted/45 font-normal`.
     - Replaced single-string select dropdown with a responsive 2-column interactive grid of `rounded-xl` selection tiles (`SERVICE_OPTIONS`) featuring active checkmark toggles (`check_circle`), tactile active scale feedback, and strictly zero text pill badges.
   - **Strict Rule Preservation**: ZERO text pill badges, ZERO text bloat, unclipped original ceremony photo, phone strictly `+251925451711`.

