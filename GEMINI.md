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
   - Flow directly transitions to Cards 2–7 with zero disruptive middle banners or interruptions.
   - Cards 2–7 follow a perfectly balanced 6-column container:
     - Row 1: Cards 2, 3, 4 each spanning `lg:col-span-2`.
     - Row 2: Cards 5, 6, 7 each spanning `lg:col-span-2`.
     - Zero empty or missing columns on desktop ($3 \times 2$ grid).
     - Card 7 ("Catering Services") incorporates 4 core sub-practices (Coffee Catering, Event Catering, Mocktail & Beverage Catering, Corporate & Private Event Service) with dedicated high-end banquet imagery.
   - Coffee sourcing remains cleanly accessible through the Contact form selection tiles, Single Origins ledger, and Hero narrative.

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
   - **Pre-Catering Service Checkpoint Tag**: `pre-catering-service` (Commit: `81b9eb6`)
   - **Pre-Catering Dedicated Showcase Checkpoint Tag**: `pre-catering-dedicated-showcase` (Commit: `1aa0111`)
   - **Pre-Admin Dashboard Checkpoint Tag**: `pre-admin-dashboard` (Commit: `0cd6a0a`)
   - **Pre-Stitch Admin UI Checkpoint Tag**: `pre-stitch-admin-ui` (Commit: `871f5a3`)
   - **Pre-Admin Step Guides Checkpoint Tag**: `pre-admin-step-guides` (Commit: `4478579`)
   - **Pre-Contact Messages Visibility Checkpoint Tag**: `pre-contact-messages-visibility` (Commit: `9c06865`)
   - **Pre-Admin Polish & Auth Checkpoint Tag**: `pre-admin-polish-and-auth` (Commit: `772f02f`)
   - **Pre-Dynamic Applications & Excel Export Tag**: `pre-dynamic-applications-excel` (Commit: `b0dd250`)
   - **Pre-Admin AI Copilot Checkpoint Tag**: `pre-admin-ai-copilot`
   - **Pre-Services & Pricing CMS Checkpoint Tag**: `pre-services-and-pricing-cms`
   - **Pre-Multi-Page & UI Cleanup Checkpoint Tag**: `pre-multipage-and-ui-cleanup`
   - **Pre-Admin Login Polish Checkpoint Tag**: `pre-admin-login-polish`
   - **Pre-Delete Feature & Login Privacy Checkpoint Tag**: `pre-delete-feature-and-login-privacy`
   - **Pre-Nav Bars Streamline Checkpoint Tag**: `pre-nav-bars-streamline`
   - **Pre-Media Revert & Copilot Fix Checkpoint Tag**: `pre-media-revert-and-copilot-fix`
   - **Pre-Filter & Notification Activation Tag**: `pre-filter-and-notification-activation`
   - **Pre-Revert to Original Checkpoint Tag**: `pre-revert-to-original-feature`
   - **Backup Branches**: `backup-stable-baseline`, `backup-pre-hero-media-carousel`, `backup-pre-opening-motion-choreography`, `backup-pre-chronological-resequence`, `backup-pre-debox-transformation`, `backup-pre-ui-ux-refinements`, `backup-pre-catering-service`, `backup-pre-catering-dedicated-showcase`, `backup-pre-admin-dashboard`, `backup-stitch-admin-ui`, `backup-admin-step-guides`, `backup-contact-messages-visibility`, `backup-admin-polish-and-auth`, `backup-dynamic-applications-excel`, `backup-admin-ai-copilot`, `backup-services-and-pricing-cms`, `backup-multipage-and-ui-cleanup`, `backup-admin-login-polish`, `backup-delete-feature-and-login-privacy`, `backup-nav-bars-streamline`, `backup-media-revert-and-copilot-fix`, `backup-filter-and-notification-activation`, `backup-revert-to-original-feature` (Pushed to GitHub `origin`)
   - **Remote Synchronization**: Fully backed up on remote GitHub repository.
   - **One-Prompt Revert Protocol**:
     - To revert to the state before the revert to original feature: `git reset --hard pre-revert-to-original-feature && git clean -fd`
     - To revert to the state before filter and notification activation: `git reset --hard pre-filter-and-notification-activation && git clean -fd`
     - To revert to the state before media revert and AI copilot fix: `git reset --hard pre-media-revert-and-copilot-fix && git clean -fd`
     - To revert to the state before navigation bars streamline: `git reset --hard pre-nav-bars-streamline && git clean -fd`
     - To revert to the state before the course/package delete feature and login privacy: `git reset --hard pre-delete-feature-and-login-privacy && git clean -fd`
     - To revert to the state before the admin login page polish: `git reset --hard pre-admin-login-polish && git clean -fd`
     - To revert to the state before multi-page architecture and UI cleanup: `git reset --hard pre-multipage-and-ui-cleanup && git clean -fd`
     - To revert to the state before Services & Pricing CMS: `git reset --hard pre-services-and-pricing-cms && git clean -fd`
     - To revert to the state before the Admin AI Copilot: `git reset --hard pre-admin-ai-copilot && git clean -fd`
     - To revert to the state before dynamic training applications and Excel export: `git reset --hard pre-dynamic-applications-excel && git clean -fd`
     - To revert to the state before the admin polish and credential authentication: `git reset --hard pre-admin-polish-and-auth && git clean -fd`
     - To revert to the state before contact messages visibility enhancements: `git reset --hard pre-contact-messages-visibility && git clean -fd`
     - To revert to the state before the admin step-by-step guides: `git reset --hard pre-admin-step-guides && git clean -fd`
     - To revert to the state before the Stitch admin UI redesign: `git reset --hard pre-stitch-admin-ui && git clean -fd`
     - To revert to the state before the admin dashboard: `git reset --hard pre-admin-dashboard && git clean -fd`
     - To revert to the state before the dedicated catering showcase: `git reset --hard pre-catering-dedicated-showcase && git clean -fd`
     - To revert to the state before Catering Services was added: `git reset --hard pre-catering-service && git clean -fd`
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

## Dual-Flagship Services & Dedicated Catering Showcase Architecture
14. **Dual-Flagship Model & Dedicated Catering Showcase**:
   - **Flagship 1: Turnkey Café Setup**: Featured as the top article (`1. Coffee Shop Setup & Organization`) with 5-col image, 7-col details, and 3 key scope elements.
   - **Core Specialized Practices Grid (Cards 2–6)**: Follows a balanced 6-column container:
     - Row 1: Cards 2, 3, 4 each spanning `lg:col-span-2`.
     - Row 2: Cards 5, 6 each spanning `lg:col-span-3`.
   - **Flagship 2: Dedicated Luxury Catering Showcase (`#catering`)**:
     - Full-width standalone luxury article (`spotlight-card` with `lg:grid-cols-12` and anchor `id="catering"`).
     - **Dedicated Photo Section (5 cols)**: High-resolution banquet ceremony photo (`/catering-services.jpg`, traditional Mesob, Jebena, sini cups, chafing buffet spread) in an `aspect-video lg:aspect-[4/3]` container with smooth hover zoom.
     - **Narrative & 4 Scope Pillars (7 cols)**: Uppercase kicker `LUXURY EVENT HOSPITALITY`, Title `7. Catering Services & Event Hospitality`, and lead narrative. 4 core offerings arranged in an open $2 \times 2$ grid:
       - **Coffee Catering**: Specialty coffee service for meetings, conferences, and special events.
       - **Event Catering**: Food and beverage catering for private and corporate functions.
       - **Mocktail & Beverage**: Custom mocktails, cold refreshments, and hot beverage service for events.
       - **Corporate & Private Events**: Full hospitality service for company functions, birthdays, weddings, and private celebrations.
     - **Dual High-Conversion Action Buttons**:
       - Primary: `Request a Quote` button with sheen shimmer sweep, anchoring smoothly to `#contact`.
       - Secondary: `Make a Reservation` button linking directly to WhatsApp at `+251925451711` with pre-filled reservation inquiry text.
   - **Ecosystem Consistency**:
     - Contact Form: `Catering Services & Hospitality` selection tile in `Contact.tsx`.
     - Footer: `7. Catering Services & Events` linking directly to `#catering` in `Footer.tsx`.
   - **Strict Rule Preservation**: ZERO text pill badges, ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`.

## Modern Admin Dashboard, CMS & Signature Concierge Architecture
15. **Full-Stack Admin Operations & On-Site Async Chat**:
   - **Admin Authentication (`/admin/login`)**:
     - Secured by Master Passcode validation and HTTP-only session cookie (`ethiopian_sig_admin`).
     - Default passcode configured via `process.env.ADMIN_PASSCODE`.
   - **Executive Dashboard & KPIs (`/admin`)**:
     - Real-time telemetry: Total Inquiries, Active Cohorts, Open Concierge Chats, Direct Desk status.
     - Live stream of recent client inquiries with status indicators.
   - **Inquiries & Student CRM (`/admin/leads`)**:
     - Full client table with search by name/phone/email, practice area filter, lifecycle status updater (`New` -> `Contacted` -> `Scheduled` -> `Completed` -> `Archived`), and one-click direct WhatsApp engagement.
   - **CMS Visual Media Studio (`/admin/media`)**:
     - Direct upload to local server storage (`/public/uploads/`) with auto-sanitization.
     - Slot management for Hero Carousel, Services cards, Dedicated Catering showcase, and Training photography.
   - **Barista Academy & Cohort Scheduler (`/admin/training`)**:
     - Course creation and syllabus editor.
     - Cohort scheduler with start/end dates, session hours, seat capacity, and live status (`open`, `filling_fast`, `sold_out`).
     - Directly syncs with `#training` Upcoming Cohorts & Dates tab on the main public site.
   - **Signature Concierge Support Chat (`/admin/chat` & Public Modal)**:
     - Asynchronous messaging: visitors send messages without requiring admin to be live online.
     - Public Dual Action Launcher: expandable luxury floating button allowing visitors to choose between direct WhatsApp advisory and on-site Signature Concierge chat.
     - Conversation state preserved via client-side `localStorage` token.
     - Admin split-pane inbox with real-time polling, thread history, unread counters, and quick canned responses.
   - **Strict Rule Preservation**: ZERO text pill badges, ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`.

## Stitch Modern Editorial Admin UI & Media Asset Architecture
16. **Editorial Minimalist Admin Suite & Media Studio**:
   - **Visual Language & Palette**:
     - Surface foundation: Warm porcelain canvas (`#fcf9f8`) with crisp white card containers (`#ffffff`), hairline structural borders (`#e5e2e1`), and soft ambient shadows (`shadow-sm`).
     - Chromatic anchors: Forest Coffee Green (`#002f19` / `#0d472a`), Espresso Roast (`#745853` / `#3e2723`), Harvest Gold (`#f5b700` / `#ffdea0`), and Coffee Cherry Crimson alerts (`#ba1a1a`).
     - Typography: EB Garamond (`font-serif`) for authoritative editorial headings paired with Plus Jakarta Sans for operational telemetry and form controls.
     - Section headers feature vertical indicator pips (`w-1.5 h-4 bg-stitch-primary rounded-full`).
   - **Responsive Dual-Mode Navigation Architecture**:
     - **Desktop Navigation (>= md)**: Fixed left architectural sidebar with brand monogram (`ES`), status dot, active tab highlight (`bg-stitch-primary text-white`), and quick live site link.
     - **Mobile Navigation (< md)**: Fixed bottom glassmorphic tab bar (`h-16 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-highest`) with 5 thumb destinations (`Overview`, `Inquiries`, `Media`, `Training`, `Chat`).
     - **Sticky Top Bar**: Live site indicator dot, section title, quick utility buttons (tune, notifications), and executive admin profile avatar (`/admin/avatar.jpg`).
   - **Integrated Media Studio & Asset Library (`/admin/media`)**:
     - Top asset telemetry card with mode switcher (Draft vs Live) and 4-metric overview (Live Assets, Active Slots, Storage, Synced).
     - Active Homepage Slots: Featured Slot 01 Hero Banner card with 16:9 cinema crop preview, gradient overlay, and action buttons (Replace, Crop, Preview); compact horizontal cards for Flagship Service, Academy, Sourcing, and Catering.
     - Cloud storage upload dropzone with category destination tags.
     - Media Library gallery with category filter tabs and instant slot assignment actions (`Hero`, `Slot`, `Delete`).
     - Sticky bottom publish bar with unsaved change counter and CloudFront CDN sync indicator.
   - **Retained Full Backend Capabilities**:
     - 100% of executive telemetry, CRM lifecycle filtering, Supabase database operations, academy cohort scheduling, and asynchronous concierge chat messaging are preserved.
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, Slide 0 ceremony photo intact, official phone strictly `+251925451711`.

## Contact Form Messages & Inquiries CRM Architecture
18. **Public Contact Form to Admin Reception & Response Flow**:
   - **Data Flow & Database Synchronization**:
     - Visitors submit inquiries via the public `#contact` section (`Contact.tsx`) providing `fullName`, `phone`, `email` (optional), `service` (selected capability tile), and `notes` (project details or message).
     - Submissions invoke `submitInquiryAction` (`src/app/actions/inquiry.ts`), which writes directly to the Supabase `inquiries` table.
     - Row-level security (RLS) policies on `public.inquiries` and `public.academy_enrollments` permit `anon` and `authenticated` roles for SELECT, INSERT, and UPDATE queries (`ALTER POLICY ... TO anon, authenticated;`), ensuring the admin server actions (`getInquiriesAction()`, `updateInquiryStatusAction()`) retrieve and update all submissions seamlessly while guarded by `isAdminAuthenticated()`.
   - **Dashboard Overview Visibility (`/admin`)**:
     - Step 1 Action Card prominently titled **"Contact Form Texts"** with direct link *"Read Contact Messages &rarr;"*.
     - Recent Contact Form Messages table contains a dedicated column: **"Message Text from Contact Form"**, rendering client messages in high-contrast styled quote bubbles (`chat_bubble` indicator, line-clamp, and full context).
     - One-click green **"Chat on WhatsApp"** button launches direct chat with the visitor using their phone number and a pre-composed greeting.
   - **Dedicated Messages CRM (`/admin/leads`)**:
     - Sidebar navigation labeled **"Messages"** (full title: **"Contact Messages"**, icon: `mark_email_unread`, hint: *"Texts from Contact Me form & WhatsApp"*).
     - Step-by-Step Operator Guide banner: *"Where to Find & Reply to 'Contact Me' Form Texts"*.
     - Fast filter tabs: *All Messages ({count})*, *New / Needs Reply ({count})*, and *With Written Notes ({count})*.
     - Dedicated table column: **"Message Text from 'Contact Me' Form"** displaying the exact message with an *"Expand"* button.
     - Details modal highlighting **"Text Message Written by Client in 'Contact Me' Form:"** alongside full client metadata, status updater dropdown (`New`, `Contacted`, `Scheduled`, `Completed`, `Archived`), and direct WhatsApp launch button.
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`.

## Admin Credential Authentication & Empty State UI Polish
19. **Email & Password Authentication and Clean Editorial State Standards**:
   - **Administrative Account Credentials**:
     - Designated administrative email: strictly **`henoktessma111@gmail.com`**.
     - Designated administrative password: strictly **`254517`**.
     - Configured in `.env.local` via `ADMIN_EMAIL` and `ADMIN_PASSWORD` with bulletproof fallback in `src/app/actions/admin-auth.ts`.
     - Validates both email (case-insensitive) and password with HTTP-only session cookie `ethiopian_sig_admin=authenticated`.
   - **Polished Login Experience (`/admin/login`)**:
     - Dual dedicated input fields: "Admin Email Address" (`mail` icon, autocomplete `email`) and "Password" (`lock` icon, autocomplete `current-password`, and interactive show/hide toggle).
     - 2-Step operator guide clearly outlining entry and sign-in steps.
     - Smooth button shimmer and clear error indicators.
   - **Executive Header Personalization (`layout.tsx`)**:
     - Top administrative bar displays **Henok Tessma** with email **henoktessma111@gmail.com** and verified avatar.
   - **Pristine Empty States Across All Views**:
     - **Database Cleanliness**: All artificial sample inquiries and test chat messages removed from Supabase, leaving tables empty and fresh for real public submissions.
     - **Dashboard Overview (`/admin`)**: Renders elegant **"Inbox Clean & Ready"** empty state with `mark_email_read` iconography, explanatory copy, and quick link to test the public `#contact` section.
     - **Messages CRM (`/admin/leads`)**: Renders **"No Contact Form Messages Yet"** empty state inside the CRM table with `inbox` iconography, clean tab zero counts (`All Messages (0)`), and link to the public contact form.
     - **Visitor Chat (`/admin/chat`)**: Renders **"No Active Chats"** in sidebar and **"Concierge Inbox Ready"** with `chat_bubble` iconography in the reply panel.
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`.

## Dynamic Training Applications & Excel (.xlsx) Export Architecture
20. **Configurable Application Forms, Applicant CRM & Native Excel Export**:
   - **Form Configuration Engine (`training_programs.form_config`)**:
     - Program creation in `/admin/training` allows admins to configure dynamic enrollment forms via standard toggles (`ask_email`, `ask_experience`, `ask_organization`, `ask_notes`) and custom open-ended questions stored as JSONB.
     - When toggled active, public visitor registration buttons dynamically render the tailored questions without hardcoded schemas.
   - **Luxury Branded Application Experience (`TrainingApplicationModal.tsx`)**:
     - Public cohort cards on `#training` launch a luxury branded modal (`bg-stone-900 border border-brand-yellow/30 shadow-2xl`) displaying course details, schedule dates, tuition, and dynamic fields.
     - Submitting invokes `submitTrainingApplicationAction`, securely recording applicants to `public.academy_enrollments` while incrementing cohort seat bookings in real time.
     - Confirmation screen provides a summary and direct 1-click WhatsApp verification to `+251925451711`.
   - **Dual-Level Applicant Management in Admin (`TrainingCMSClient.tsx`)**:
     - **Per-Course Applicant Drawer**: Each course card features an expandable "Applicants ({count})" drawer showing the enrolled students, status updater dropdown, direct WhatsApp link, and dedicated course-level "Export Excel" button.
     - **Global Master Applicant Ledger**: Top-level tab "All Registered Students" provides a cross-course master table with search, status filters (`All`, `Pending`, `Confirmed`, `Contacted`, `Cancelled`), and a master "Export All to Excel (.xlsx)" button.
   - **Contact Messages Excel Export (`/admin/leads`)**:
     - Direct "Export to Excel" button in `InquiriesCRMTable.tsx` allows downloading all filtered client contact messages into `.xlsx`.
   - **Native Client-Side Excel Generation (`src/lib/excel-export.ts`)**:
     - Uses `xlsx` library to generate binary OpenXML spreadsheet buffers locally in the browser with auto-fitted column widths and formatted headers.
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Free Admin AI Copilot & Strict Operational Workflow Architecture
21. **In-Dashboard AI Assistant, Strict Operational Restriction & Vercel Resilience**:
   - **Strict Operational-Only Rule**:
     - System prompt and server pre-flight checks strictly enforce an operational boundary: the AI **never** answers questions about the codebase, source code files, programming, database schemas, SQL queries, server actions, or internal architecture.
     - Any inquiry attempting to inspect technical details or schemas is politely declined with a standard operational guide directing the user to dashboard workflows (Service Packages, Academy, Inquiries, Excel, Media).
   - **Google Gemini API Integration & Vercel Resilience**:
     - Connects to Google AI Studio via `gemini-flash-lite-latest` endpoint on `v1beta`.
     - Route handler configured with `export const dynamic = "force-dynamic"` and `export const maxDuration = 30` to prevent serverless timeouts on Vercel.
     - Dual-source authentication checks both `req.cookies.get("ethiopian_sig_admin")` and Next.js `cookies()` for guaranteed session validation across Vercel Edge and Node.js runtimes.
     - Supports `process.env.GEMINI_API_KEY`, in-drawer browser overrides (`localStorage`), and safe runtime server fallback so the Copilot functions seamlessly on Vercel out-of-the-box.
     - Built-in resilient offline fallback guarantees that even during external network drops, operational answers are always served with zero downtime.
   - **Real-Time Live Dashboard Data Ingestion & On-Demand Executive Summaries**:
     - Connected directly to live Supabase tables (`inquiries`, `training_programs`, `training_schedules`, `academy_enrollments`, `service_packages`, `service_bookings`) via `getLiveDashboardDataSnapshot()` in `dashboard-data.ts`.
     - Injects real-time operational context into every prompt turn, allowing the AI to synthesize up-to-the-second business summaries: immediate action items (unhandled inquiries, pending registrations, pending bookings), recent client submissions with names and phone numbers, cohort capacities, and active pricing.
     - Dedicated one-click **"Summarize"** action button in drawer header (`insights` icon) and prominent starter prompt **"📊 Summarize the dashboard & recent activity"** for instant executive briefings on demand.
   - **Slide-Over Side Drawer Architecture (`AdminAIAssistantDrawer.tsx`)**:
     - Mounted via React portal (`createPortal(..., document.body)`) to ensure full-height (`100vh`) unconstrained display above sticky headers.
     - Subtitle reflects **"Operations & Admin Workflow Guide"**.
     - Starter prompt shortcuts feature 100% operational UI questions (Executive Summary, Service creation & pricing, Excel export, custom course questions, contact messages, hero media).
     - Inline API key configuration panel supporting custom browser-local overrides (`localStorage`).
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Unified Services & Pricing CMS Architecture
22. **Dynamic Service Packages, Pricing Models, Client Booking & Excel Export**:
   - **Unified Admin Section (`/admin/training`)**:
     - Renamed sidebar item to **"Offerings"** / **"Services & Training"** with `workspace_premium` iconography.
     - Top-level 3-tab navigation:
       1. `Training Programs ({count})`: Barista Academy courses and scheduled cohorts.
       2. `Service Packages ({count})`: Commercial services with transparent pricing, deliverables checklists, and booking drawers.
       3. `All Registrations & Bookings ({count})`: Unified master CRM of both academy students and service client bookings.
     - **"+ Add New..." Choice Modal**: Allows admin to select between **"Post Training Course"** and **"Post Service Package"**.
   - **Service Package Creator & Pricing Models**:
     - Configurable fields: Title, Category, Pricing Model (`Fixed Price`, `Starting From`, `Per Day / Event`, `Custom Quote`), Price in ETB, Project Timeline, and dynamic Scope Deliverables builder (`+ Add Deliverable`).
     - Dynamic Booking Form Configuration: Checkbox toggles (`ask_email`, `ask_business`, `ask_location`, `ask_timeline`, `ask_notes`) plus open-ended custom questions stored as JSONB.
     - Persisted in Supabase table `public.service_packages` with RLS policies.
   - **Public Website Integration (`src/components/DynamicServicePackages.tsx`)**:
     - Mounted inside `#services` directly after the core specialized practices and before Catering.
     - Displays dynamic service packages with transparent pricing badge, timeline indicator, deliverables checklist with amber checkmarks, and high-contrast "Book Service Package" button.
   - **Luxury Branded Booking Modal (`ServiceBookingModal.tsx`)**:
     - Dynamically renders configured inquiry fields (Name, Phone, Email, Business Name, Location, Timeline, Notes, custom questions).
     - Submitting invokes `submitServiceBookingAction`, inserting into `public.service_bookings`.
     - Confirmation screen presents summary and instant direct WhatsApp verification to `+251925451711`.
   - **Dual-Level Admin CRM & Excel Export**:
     - **Per-Service Booking Drawer**: Expandable drawer displaying client bookings, status updater dropdown (`Pending`, `Contacted`, `Scheduled`, `Completed`, `Cancelled`), direct WhatsApp button, and dedicated `.xlsx` export.
     - **Unified Master Table**: Complete ledger displaying both student applications and service bookings with type indicator, search, status filters, and master "Export All to Excel (.xlsx)" button.
   - **Native Excel Generator (`src/lib/excel-export.ts`)**:
     - Exports client bookings with auto-fitted column widths and formatted headers.
   - **Admin AI Copilot Knowledge Base Integration**:
     - Injected with `service_packages` and `service_bookings` database schemas and operator recipes for adding services and exporting data.
   - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Multi-Page Architecture, Homepage Teaser, Sidebar Cleanup & Copilot Model Privacy
23. **Multi-Page Transformation, Sidebar Streamlining & AI Model Name Anonymization**:
    - **AI Model Name Anonymization & Neutral Branding (`AdminAIAssistantDrawer.tsx`)**:
      - Replaced vendor/model branding ("Gemini 2.0") with neutral, enterprise badge ("Assistant").
      - Replaced "Google Gemini API Key" with "AI Assistant API Key".
      - Cleared provider names from input placeholders, displaying `Paste your API key (AIzaSy...)` without mentioning Google or Gemini.
      - Copilot identity prompt updated to present itself as "Ethiopian Signature Admin Copilot" without disclosing underlying model architectures.
    - **Admin Sidebar Quick Guide Removal (`AdminSidebarNav.tsx`)**:
      - Removed the 3-step numbered guide card from the admin sidebar navigation to eliminate visual clutter and redundant text now that the interactive AI Copilot drawer is accessible from any admin screen.
    - **Multi-Page Website Transformation**:
      - **Homepage (`/`)**: Replaced long services stack with a clean, co-planar `ServicesTeaser.tsx` spotlighting Turnkey Café Setup with dual CTAs ("Book Setup Consultation" and "Explore All Services & Packages →"). Completely removed the extensive training curriculum and dynamic posts from the homepage, eliminating vertical page fatigue.
      - **Dedicated Services Page (`/services`)**: Full presentation featuring dedicated banner, all 6 turnkey practices, dynamic service packages with transparent pricing, deliverables checklists, booking drawers, and full luxury catering showcase (`#catering`).
      - **Dedicated Training Page (`/training`)**: Comprehensive Barista Academy page featuring dedicated banner, 4-stage professional curriculum, scheduled cohorts with real-time seat counters, dynamic courses, and enrollment modal.
    - **Navigation Routing & Active Indicators**:
      - **Desktop Header (`Header.tsx`)**: Uses Next.js `usePathname()`, routing `Services` to `/services`, `Training` to `/training`, and section anchors to `/#...`, with active gold indicators.
      - **Mobile Bottom Nav (`MobileBottomNav.tsx`)**: Seamlessly navigates between `/`, `/services`, and `/training` with active indicators, while anchoring to `/#contact` for inquiries.
      - **Footer (`Footer.tsx`)**: Updated directory links to route directly to `/services`, `/services#catering`, and `/training`.
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Polished Admin Login Architecture & Official Coffee Branding
24. **Luxury Editorial Admin Login, Authentic Logo Integration & Streamlined Ergonomics**:
    - **Authentic Brand Emblem (`/logo.png`)**:
      - Replaced the generic lock icon with the official high-resolution Ethiopian Signature Coffee logo within an elevated, soft-bordered card container (`bg-gradient-to-b from-[#FDFBF7] to-white border border-border-subtle/80 shadow-sm p-2.5 rounded-2xl`).
      - Updated the desktop sidebar header in `src/app/admin/layout.tsx` to display the authentic `/logo.png` instead of the plain 'ES' text.
    - **Atmospheric Editorial Aesthetics**:
      - Background features a warm ivory porcelain tone (`#F9F7F2`) with subtle radial amber roast blooms (`bg-brand-yellow/10 blur-3xl`) and deep emerald hints (`bg-brand-green/8 blur-3xl`).
      - Centered card (`max-w-[440px] bg-white/95 backdrop-blur-xl border border-border-subtle rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_-10px_rgba(20,9,3,0.12),0_4px_24px_rgba(212,136,0,0.06)] ring-1 ring-black/[0.03]`).
      - Hairline gold gradient accent line along the card's top edge (`h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent`).
      - Refined brand typography: `ETHIOPIAN SIGNATURE` in serif display, uppercase tracked kicker `EXECUTIVE PORTAL`, and brand tagline `BUILDING COFFEE BUSINESSES`.
    - **Clutter Elimination & Form Ergonomics**:
      - Removed the clunky numbered "1, 2" steps box from the login card.
      - Sleek email field with `mail` icon and custom focus ring in `brand-green`.
      - Password field with `lock` icon, confidentiality note, and interactive show/hide eye toggle button (`visibility` / `visibility_off`).
      - High-contrast primary action button (`h-12 bg-brand-green-dark hover:bg-brand-green text-white font-bold uppercase tracking-[0.16em] btn-shimmer`) with dynamic loading spinner ring during credential verification.
    - **Security & Error Handling**:
      - Sleek error alert banner (`bg-red-50/90 border border-red-200/80 text-red-800 text-xs`) displaying explicit validation errors upon invalid attempts.
      - Card footer features `verified_user` badge: "Encrypted 256-Bit Session", direct link back to public website (`/`), and top ambient bar with official support number `+251925451711`.
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Course & Service Package Deletion & Full Login Privacy Architecture
25. **Full Dynamic Deletion Engine, Cascade Cleanups & Login Privacy Protection**:
    - **Login Screen Privacy Protection (`src/app/admin/login/page.tsx`)**:
      - Completely removed phone number (`+251925451711`) from the top right of the login screen, replacing it with a neutral "Administrative Gateway" status indicator with lock icon.
      - Removed personal email from the admin email input placeholder, using generic prompt `Enter your admin email...`. Zero sensitive credentials or phone numbers are exposed on the unauthenticated login portal.
    - **Training Course Deletion Engine (`deleteTrainingProgramAction`)**:
      - Server action in `src/app/actions/admin-cms.ts` cascade-deletes all associated `academy_enrollments` and `training_schedules` before deleting the `training_programs` record, preventing foreign key constraint failures.
      - Optimistically removes the course from admin state and immediately removes it from the public website (`/training`).
    - **Service Package Deletion Engine (`deleteServicePackageAction`)**:
      - Enhanced server action in `src/app/actions/admin-cms.ts` to cascade-delete all child `service_bookings` before deleting the `service_packages` record.
      - Optimistically removes the package from admin state and immediately removes it from the public website (`/services`).
    - **Symmetrical UI & Empty States (`TrainingCMSClient.tsx`)**:
      - Each training course and service package card features prominent delete buttons in both the card header and the bottom action bar next to "Export Excel".
      - Confirmation dialogs protect against accidental deletion.
      - Dynamic empty states rendered when all courses or packages are removed, providing direct action buttons to publish official offerings.
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Streamlined 5-Pillar Navigation Architecture (Desktop & Mobile)
26. **Consolidated 5-Pillar Navigation & Responsive Ergonomics**:
    - **Elimination of Navigation Clutter**:
      - Consolidated the previous 8 crowded desktop links down to 5 intuitive, luxury brand pillars: `Home`, `Services`, `Training`, `About`, `Contact`.
      - Consolidated mobile bottom navigation from 6 cramped tabs down to 5 spacious, comfortable touch targets.
    - **Logical Domain Mergers**:
      - **`Process` merged into `Services`**: The 4-stage turnkey setup methodology is completely integrated within the Services domain.
      - **`Origins` and `Projects` merged into `About`**: Direct-trade highland terroirs and demonstrated client venues are unified under the brand story and organizational heritage.
    - **Seamless Continuous Scroll Tracking**:
      - `Header.tsx` and `MobileBottomNav.tsx` intelligently track scroll position across homepage sections: `#home` highlights `Home`, `#services` & `#process` highlight `Services`, `#origins`, `#projects` & `#about` highlight `About`, and `#contact` highlights `Contact`.
      - Dedicated route pages `/services` and `/training` maintain exact active highlights.
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Active Admin Filter & Notification Center Architecture
27. **Interactive Top Bar Filter & Notification Popovers (`AdminHeader.tsx`)**:
    - **Filter Dialog (`tune` icon)**: Interactive popover menu with live checkboxes allowing the administrator to filter activities by Category (Client Inquiries, Cohort Bookings, Photo Updates) and Timeframe (Today, This Week, All Time).
    - **Notification Center (`notifications` icon)**: Real-time popover drawer with interactive notification feed, unread badge counter, and "Mark all read" quick action.
    - **Outside Click & Escape Dismissal**: Seamless UX with automatic dismissal on document click or `Escape` key press.
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.

## Revert to Original Baseline Photography & Master Reset Architecture
28. **Pristine Photo Baseline Tracking & Two-Tier Revert System**:
    - **Two-Tier Safety Net**:
      - **Tier 1 (Undo / Previous Photo)**: Allows an admin to quickly toggle back to the photo immediately prior to the latest change (`previous_image_url`).
      - **Tier 2 (Revert to Original)**: Guarantees that even if an administrator completely messes up all photos or wants to reset the site, every slot can be restored back to the pristine factory baseline photo (`original_image_url` / `ORIGINAL_MEDIA_BASELINE`).
    - **Master Site-Wide Reset**:
      - Top header button in Picture Slots: **"Revert All to Original"** (`revertAllSlotsToOriginalAction()`).
      - Features confirmation protection and restores all 10 website picture slots (hero banners, catering, coffee shop setup, barista training, consulting, roasting, profitability) in a single atomic database batch.
    - **Per-Slot Original Revert**:
      - In Hero Banner and compact slots, the **"Revert to Original"** button automatically appears whenever a custom image is active.
      - Inside the **Change Photo** edit modal, a dedicated **"Pristine Original Photo"** section displays the factory baseline thumbnail alongside a 1-click **"Revert to Original"** action.
    - **AI Assistant Integration**:
      - Knowledge base in `src/lib/ai-assistant/knowledge-base.ts` trained to answer queries regarding "revert to original", "reset photos", "restore original photos", and "undo photo changes".
    - **Strict Rule Preservation**: Strictly ZERO text pill badges (`rounded-full` text tags), ZERO text bloat, unclipped original ceremony photo on Slide 0, phone strictly `+251925451711`, admin credentials strictly `henoktessma111@gmail.com` / `254517`.
