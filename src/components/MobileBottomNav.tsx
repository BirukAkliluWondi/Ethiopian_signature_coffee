export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-border-subtle shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-safe"
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto px-2">
        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-brand-green font-semibold transition-colors active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined text-[20px]">local_cafe</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">Home</span>
        </a>

        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-text-muted hover:text-brand-green font-medium transition-colors active:scale-95"
          href="#about"
        >
          <span className="material-symbols-outlined text-[20px]">info</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight">About</span>
        </a>

        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-text-muted hover:text-brand-green font-medium transition-colors active:scale-95"
          href="#services"
        >
          <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight">Services</span>
        </a>

        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-text-muted hover:text-brand-green font-medium transition-colors active:scale-95"
          href="#training"
        >
          <span className="material-symbols-outlined text-[20px]">school</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight">Training</span>
        </a>

        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-text-muted hover:text-brand-green font-medium transition-colors active:scale-95"
          href="#projects"
        >
          <span className="material-symbols-outlined text-[20px]">foundation</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight">Projects</span>
        </a>

        <a
          className="flex flex-col items-center justify-center flex-1 py-1 text-text-muted hover:text-brand-green font-medium transition-colors active:scale-95"
          href="#contact"
        >
          <span className="material-symbols-outlined text-[20px]">alternate_email</span>
          <span className="text-[9.5px] mt-0.5 tracking-tight">Contact</span>
        </a>
      </div>
    </nav>
  );
}
