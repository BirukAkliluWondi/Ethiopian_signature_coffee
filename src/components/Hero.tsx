"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";

function useCounter(target: number, duration: number = 1200, delay: number = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let animId: number;
    let timerId: NodeJS.Timeout;

    timerId = setTimeout(() => {
      let startTime: number | null = null;
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(ease * target));

        if (progress < 1) {
          animId = requestAnimationFrame(tick);
        } else {
          setCount(target);
        }
      };

      animId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(animId);
    };
  }, [target, duration, delay]);

  return count;
}

interface MediaSlide {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  duration?: number;
  objectPosition?: string;
}

const HERO_SLIDES: MediaSlide[] = [
  {
    id: "ceremony-woman",
    type: "image",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDDk-iFEvRORMomf5aJppkPdG4X1Afc0D1RwBOm5ZtWA5r-y2Fyk-Srlgmy6w0-XU6hgHyrtZHntI6m50dGyZiGAT5Z4lVML8lFr_PhoYRLtlSA0cAmeC_YyVt7YCSt2qR49OxsjXxr-zwduJ6SQPKxbroL9vdg2pZU8E_F-s3VpJPowK1lkr1Gms7ycTU43SRwoS98u0CrzuJ3y8S2Ym8a7J-x4IWdPiRIOE_vxRrmiLghhNGr-x5",
    alt: "Traditional Ethiopian Coffee Ceremony - Woman Pouring Coffee",
    duration: 5500,
    objectPosition: "object-top",
  },
  {
    id: "roast-and-jebena",
    type: "image",
    src: "/hero/roast-and-jebena.jpg",
    alt: "Freshly Roasted Ethiopian Coffee Beans in Clay Pot with Steaming Incense and Jebena",
    duration: 5000,
    objectPosition: "object-center",
  },
  {
    id: "coffee-community",
    type: "image",
    src: "/hero/coffee-community-celebration.jpg",
    alt: "Overhead Gathering of Hands Celebrating Ethiopian Coffee Ceremony with Cini Cups",
    duration: 5000,
    objectPosition: "object-center",
  },
  {
    id: "ceremony-video",
    type: "video",
    src: "/hero/ceremony-video.mp4",
    alt: "Traditional Ethiopian Coffee Ceremony Preparation and Pouring Video",
    objectPosition: "object-center",
  },
];

export default function Hero({
  mediaSlots,
}: {
  mediaSlots?: Record<string, string>;
}) {
  const venuesCount = useCounter(14, 1000, 500);
  const baristasCount = useCounter(250, 1200, 600);
  const originsCount = useCounter(100, 1100, 700);

  const slides = useMemo(() => {
    return HERO_SLIDES.map((slide) => {
      if (slide.id === "ceremony-woman" && mediaSlots?.hero_slide_0) {
        return { ...slide, src: mediaSlots.hero_slide_0 };
      }
      if (slide.id === "roast-and-jebena" && mediaSlots?.hero_slide_1) {
        return { ...slide, src: mediaSlots.hero_slide_1 };
      }
      if (slide.id === "coffee-community" && mediaSlots?.hero_slide_2) {
        return { ...slide, src: mediaSlots.hero_slide_2 };
      }
      return slide;
    });
  }, [mediaSlots]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Handle automatic slide progression for static images
  useEffect(() => {
    if (currentSlide.type === "image") {
      const duration = currentSlide.duration || 5000;
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, currentSlide, nextSlide]);

  // Handle video playback when video slide is active
  useEffect(() => {
    if (currentSlide.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled safely by browser policy
        });
      }
    }
  }, [currentSlideIndex, currentSlide.type, isMuted]);

  // When video completely finishes playing, advance and fade away
  const handleVideoEnded = () => {
    nextSlide();
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <section
      className="reveal-on-scroll reveal-visible grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-10 xl:gap-12 items-center scroll-mt-28 relative section-transition-glow"
      id="home"
    >
      {/* Story, Headline & CTAs (On mobile: order-2, displays below visual showcase; Desktop: lg:order-1) */}
      <div className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-4 lg:gap-5 order-2 lg:order-1 lg:pt-8">
        <div className="mask-reveal-wrap">
          <h1 className="mask-reveal-content mount-headline font-serif text-[22px] sm:text-4xl lg:text-[2.95rem] xl:text-[3.15rem] font-bold text-brand-green leading-[1.14] tracking-tight">
            Discover the Excellence of Ethiopian Coffee
          </h1>
        </div>

        <p className="mount-paragraph text-[12.5px] sm:text-[15px] xl:text-base text-text-muted leading-[1.38] sm:leading-relaxed max-w-xl lg:max-w-none font-normal">
          We bring together premium Ethiopian coffee, professional coffee training, business consultancy, and innovative café solutions. From centuries-old ceremonial roots to modern commercial venues, we help coffee businesses achieve excellence.
        </p>

        {/* Quantitative Proof Metrics: Open-Air Editorial Typography (Borderless, High-Luxury) */}
        <div className="grid grid-cols-3 divide-x divide-border-subtle/80 py-1.5 sm:py-2 lg:py-2.5 border-y border-border-subtle/70 my-0">
          <div className="mount-metric-1 flex flex-col pr-2 sm:pr-4 group">
            <span className="font-serif text-xl sm:text-3xl lg:text-[2rem] font-bold text-brand-green leading-none tracking-tight group-hover:text-brand-green-light transition-colors">
              {venuesCount}+
            </span>
            <span className="text-[9.5px] sm:text-xs text-text-muted font-medium mt-1 leading-tight whitespace-nowrap sm:whitespace-normal">
              Turnkey Venues
            </span>
          </div>
          <div className="mount-metric-2 flex flex-col px-2 sm:px-4 group">
            <span className="font-serif text-xl sm:text-3xl lg:text-[2rem] font-bold text-brand-green leading-none tracking-tight group-hover:text-brand-green-light transition-colors">
              {baristasCount}+
            </span>
            <span className="text-[9.5px] sm:text-xs text-text-muted font-medium mt-1 leading-tight whitespace-nowrap sm:whitespace-normal">
              Certified Baristas
            </span>
          </div>
          <div className="mount-metric-3 flex flex-col pl-2 sm:pl-4 group">
            <span className="font-serif text-xl sm:text-3xl lg:text-[2rem] font-bold text-brand-green leading-none tracking-tight group-hover:text-brand-green-light transition-colors">
              {originsCount}%
            </span>
            <span className="text-[9.5px] sm:text-xs text-text-muted font-medium mt-1 leading-tight whitespace-nowrap sm:whitespace-normal">
              Direct-Trade Origins
            </span>
          </div>
        </div>

        {/* CTAs: Secondary Outline on Left, Primary Main Action on Right (Side-by-side on mobile & desktop for clean above-the-fold framing) */}
        <div className="mount-cta grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-0.5 sm:pt-1 lg:pt-6 w-full sm:w-auto">
          {/* Secondary Outline Action (Left) */}
          <Link
            className="group h-10 sm:h-11 lg:h-12 w-full sm:w-auto px-3 sm:px-7 lg:px-8 rounded-xl border-2 border-brand-green text-brand-green bg-white hover:bg-brand-green/5 text-center font-semibold text-[13px] sm:text-sm whitespace-nowrap active:scale-95 transition-all shadow-cozy-sm hover:shadow-cozy flex items-center justify-center hover:-translate-y-0.5 duration-200"
            href="/services"
          >
            <span>Explore Services</span>
          </Link>
          {/* Primary Solid Confirmation Action (Right) */}
          <Link
            className="group btn-shimmer h-10 sm:h-11 lg:h-12 w-full sm:w-auto px-3 sm:px-7 lg:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-center font-semibold text-[13px] sm:text-sm shadow-cozy hover:shadow-cozy-float whitespace-nowrap active:scale-95 transition-all flex items-center justify-center hover:-translate-y-0.5 duration-200"
            href="/contact"
          >
            <span>Start Advisory</span>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Showcase (On mobile/tablet: order-1; Full Desktop: lg:order-2) */}
      <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end pt-3.5 sm:pt-3 lg:pt-0">
        <div className="mount-hero-card relative w-full max-w-[268px] sm:max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-roast-bloom border border-border-subtle bg-stone-900 group ring-1 ring-border-subtle">
          <div className="relative w-full aspect-[4/3] lg:aspect-[4/3.4] xl:aspect-[4/3.2] lg:max-h-[420px] xl:max-h-[445px]">
            {/* Sequential Crossfading Media Showcase */}
            {slides.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {slide.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={slide.alt}
                      className={`w-full h-full object-cover ${
                        slide.objectPosition || "object-center"
                      } transition-transform duration-[6000ms] ease-out ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                      src={slide.src}
                    />
                  ) : (
                    <video
                      ref={slide.id === "ceremony-video" ? videoRef : undefined}
                      aria-label={slide.alt}
                      className="w-full h-full object-cover object-center"
                      muted={isMuted}
                      onEnded={handleVideoEnded}
                      playsInline
                      preload="auto"
                      src={slide.src}
                    />
                  )}
                </div>
              );
            })}

            {/* Subtle Gradient Vignette at Bottom Edge for Story Depth */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/70 via-stone-950/25 to-transparent pointer-events-none z-20" />

            {/* Sound Toggle (Only visible when video slide is active) */}
            {currentSlide.type === "video" && (
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute ceremony audio" : "Mute ceremony audio"}
                className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-stone-950/60 hover:bg-stone-950/80 text-white/90 hover:text-white backdrop-blur-md transition-all flex items-center justify-center border border-white/20 shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>
            )}

            {/* Minimalist Segment Story Progress Lines (No text pill badges) */}
            <div
              className="absolute bottom-3 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5"
              aria-label="Hero visual media slides"
            >
              {slides.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-[2.5px] rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-8 sm:w-10 bg-brand-yellow shadow-[0_0_8px_rgba(212,136,0,0.8)]"
                        : "w-3 sm:w-4 bg-white/40 hover:bg-white/75"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
