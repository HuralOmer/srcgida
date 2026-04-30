import { useEffect, useRef, useState } from "react";
import { Menu, X, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";
import logoTop from "@/assets/logo-src-top.png";
import logoScrolled from "@/assets/logo-src-v2.png";

const WHATSAPP_URL = "https://wa.me/905468333700";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const NAV = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[var(--shadow-card)] text-foreground"
          : "text-white",
      )}
      style={{ borderBottom: scrolled ? "1px solid var(--color-border)" : "none" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img
            src={scrolled ? logoScrolled : logoTop}
            alt="Logo"
            className="h-12 w-auto object-contain transition-all duration-300"
          />
        </a>

        {/* Navbar */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
            >
              {n.label}
            </a>
          ))}
          <LangSwitcher scrolled={scrolled} />
        </nav>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--color-accent-green)" }}
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t("cta.getInTouch")}
        </a>

        <button
          aria-label="Menu"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md text-foreground">
          <div className="flex flex-col gap-4 px-6 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm font-medium">
                {n.label}
              </a>
            ))}
            <LangSwitcher scrolled />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent-green)" }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("cta.getInTouch")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity"
        aria-label="Language"
      >
        <img src={current.flag} alt={current.code} className="w-5 h-4 rounded-sm object-cover" />
        <span className="uppercase">{current.code}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border shadow-lg animate-in fade-in zoom-in-95",
            scrolled ? "bg-card text-foreground border-border" : "bg-white text-foreground border-white/20",
          )}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Lang);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <img src={l.flag} alt={l.code} className="w-5 h-4 rounded-sm object-cover" />
                <span className="uppercase text-xs font-semibold">{l.code}</span>
                <span>{l.label}</span>
              </span>
              {lang === l.code && <Check className="h-4 w-4" style={{ color: "var(--color-brand-600)" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z"/>
    </svg>
  );
}
