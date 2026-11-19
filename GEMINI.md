# Ethiopian Signature Coffee - Project Guidelines & Learned Preferences

## Hero Section Architecture & Visual Layout
1. **Vertical Spacing & Header Clearance**:
   - The main content container in `src/app/page.tsx` must maintain `pt-20 sm:pt-24 md:pt-28`.
   - Never reduce top padding below `pt-20`; the floating header navbar requires ~50-60px clearance so the eyebrow and H1 heading have comfortable, luxurious breathing room without being crammed against the navigation bar.

2. **Ceremony Image Footprint (Desktop)**:
   - The hero ceremony image must be anchored to the right edge (`lg:col-span-6`, container `w-full max-w-[560px] xl:max-w-[620px]` with `lg:justify-end` and `lg:object-right`).
   - The image starts flush from the right and expands towards the left (towards the text column).
   - Never set `lg:justify-start` or move the image container away from the right edge, which leaves an empty white void on the right.
   - The left edge of the ceremony image softly dissolves into the `#FAF8F3` cream background using progressive cosine feathering and CSS mask (`lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.3)_15%,black_38%)]`).

3. **Woman's Head Framing & Authenticity**:
   - The ceremony asset (`public/ceremony-blended.png` and `public/ceremony-isolated.png`) is derived directly from the authentic original high-resolution photo.
   - Never paint or generate artificial synthetic dark domes/hair lumps onto her head.
   - The natural hair and upper background wall softly feather into `#FAF8F3` cream with subtle cosine falloff, preserving her authentic appearance without hard cut lines.

4. **Mobile Presentation (Strictly Frameless)**:
   - On mobile screens, the ceremony visual must sit directly on the `#FAF8F3` page background without any rectangular card borders, backgrounds, drop shadows, or container frames (`rounded-none`, `shadow-none`, `border-none`).
   - Her head must float naturally above the hero headline with smooth 4-way vignette feathering.

5. **Contact Channels & Numbers**:
   - Official contact phone, WhatsApp, and Telegram number across all components and pages is: **`+251925451711`**.
