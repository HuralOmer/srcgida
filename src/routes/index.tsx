import { useState } from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  UtensilsCrossed,
  Warehouse,
  ArrowRight,
  Sparkles,
  Search,
  ShieldCheck,
  Package,
  Truck,
  Tag,
  ClipboardList,
  Globe2,
  Clock,
  BadgeCheck,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Header, WhatsAppIcon } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import heroImage from "@/assets/hero-trucks.png";
import marineImg from "@/assets/serve-marine.jpg";
import hotelImg from "@/assets/serve-hotel.jpg";
import wholesaleImg from "@/assets/serve-wholesale.jpg";
import catDryImg from "@/assets/cat-dry.jpg";
import catFrozenImg from "@/assets/cat-frozen.jpg";
import catFreshImg from "@/assets/cat-fresh.jpg";
import catBevImg from "@/assets/cat-bev.jpg";
import catDairyImg from "@/assets/cat-dairy.jpg";
import catCustomImg from "@/assets/cat-custom.jpg";
import footerLogo from "@/assets/logo-src-top.png";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string;
        autoplay?: boolean;
      };
    }
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SRC Supplies — İstanbul'un en güvenilir gıda tedarikçisi" },
      {
        name: "description",
        content:
          "İstanbul'un en yeni ve verimli gemi tedarikçisi. Marine supply, hotels, wholesale buyers için tam izlenebilir ve uyumlu B2B gıda tedariki.",
      },
      { property: "og:title", content: "MarinSupply — Reliable Ship Supply in Istanbul" },
      { property: "og:description", content: "Trusted B2B food supply for marine, hospitality, and wholesale." },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/905468333700";
const WEB3FORMS_ACCESS_KEY = "ed2564da-0f8d-4fcc-aa22-f16a545d56a8";

function Index() {
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onRequestQuote={() => setIsRfqOpen(true)} />
      <WhoWeServe />
      <Categories />
      <CoreServices />
      <HowItWorks />
      <WhyUs />
      <FAQ />
      <FinalCTA />
      <Footer />
      <RFQModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero({ onRequestQuote }: { onRequestQuote: () => void }) {
  const { t } = useI18n();
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover" }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,25,35,0.55)" }} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-white w-full">
        <div className="flex items-center justify-between gap-8">
          <div
            className="max-w-3xl rounded-3xl px-8 py-12 md:px-14 md:py-16 animate-hero-up"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-hero-up delay-150">
              {t("hero.h1.part1")}{" "}
              <span style={{ color: "var(--color-brand-300)" }}>{t("hero.h1.part2")}</span>
            </h1>
            <h2 className="mt-6 text-lg md:text-xl font-normal text-white/85 max-w-2xl leading-relaxed animate-hero-up delay-300">
              {t("hero.h2")}
            </h2>
            <div className="mt-10 flex flex-wrap gap-4 animate-hero-up delay-500">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                {t("cta.getQuote")} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--color-accent-green)" }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("cta.whatsapp")}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- WHO WE SERVE ---------- */
function WhoWeServe() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const items = [
    { img: marineImg, icon: Anchor, title: t("serve.marine.title"), desc: t("serve.marine.desc") },
    { img: hotelImg, icon: UtensilsCrossed, title: t("serve.hotel.title"), desc: t("serve.hotel.desc") },
    { img: wholesaleImg, icon: Warehouse, title: t("serve.wholesale.title"), desc: t("serve.wholesale.desc") },
  ];
  return (
    <section ref={ref} id="about" className="py-24 bg-background">
      <div className={cn("mx-auto max-w-7xl px-6", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <SectionHeading
          eyebrow={t("serve.eyebrow")}
          title={t("serve.title")}
          subtitle={t("serve.subtitle")}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={it.img} alt={it.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "var(--gradient-brand)", color: "white" }}>
                    <it.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold">{it.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                <a href="#services" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--color-brand-800)" }}>
                  {t("cta.learnMore")} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CATEGORIES ---------- */
function Categories() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const cats = [
    { img: catDryImg, title: t("cat.dry"), ex: t("cat.dry.ex") },
    { img: catFrozenImg, title: t("cat.frozen"), ex: t("cat.frozen.ex") },
    { img: catFreshImg, title: t("cat.fresh"), ex: t("cat.fresh.ex") },
    { img: catBevImg, title: t("cat.bev"), ex: t("cat.bev.ex") },
    { img: catDairyImg, title: t("cat.dairy"), ex: t("cat.dairy.ex") },
    { img: catCustomImg, title: t("cat.custom"), ex: t("cat.custom.ex") },
  ];
  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "var(--color-brand-100)", backgroundImage: "linear-gradient(180deg, transparent, rgba(255,255,255,0.6))" }}>
      <div className={cn("mx-auto max-w-7xl px-6", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <SectionHeading eyebrow={t("cat.eyebrow")} title={t("cat.title")} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.ex}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CORE SERVICES ---------- */
function CoreServices() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const services = [
    { icon: Search, title: t("core.sourcing"), desc: t("core.sourcing.d") },
    { icon: ShieldCheck, title: t("core.qc"), desc: t("core.qc.d") },
    { icon: Package, title: t("core.pack"), desc: t("core.pack.d") },
    { icon: Truck, title: t("core.log"), desc: t("core.log.d") },
    { icon: Tag, title: t("core.label"), desc: t("core.label.d") },
    { icon: ClipboardList, title: t("core.custom"), desc: t("core.custom.d") },
  ];
  return (
    <section ref={ref} id="services" className="py-24 bg-background">
      <div className={cn("mx-auto max-w-7xl px-6 grid gap-14 lg:grid-cols-12", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <div className="lg:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-brand-600)" }}>
            {t("core.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">{t("core.title")}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">{t("core.desc")}</p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white"
            style={{ background: "var(--gradient-brand)" }}
          >
            {t("cta.talkToTeam")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-[var(--color-brand-600)] hover:shadow-[var(--shadow-card)]">
              <s.icon className="h-6 w-6" strokeWidth={1.5} style={{ color: "var(--color-brand-800)" }} />
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const steps = [
    { n: "01", t: t("how.s1.t"), d: t("how.s1.d") },
    { n: "02", t: t("how.s2.t"), d: t("how.s2.d") },
    { n: "03", t: t("how.s3.t"), d: t("how.s3.d") },
    { n: "04", t: t("how.s4.t"), d: t("how.s4.d") },
    { n: "05", t: t("how.s5.t"), d: t("how.s5.d") },
  ];
  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "var(--color-secondary)" }}>
      <div className={cn("mx-auto max-w-7xl px-6", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <SectionHeading eyebrow={t("how.eyebrow")} title={t("how.title")} />
        <div className="relative mt-16">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-brand-600), transparent)" }} />
          <div className="grid gap-10 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="text-center lg:text-left">
                <div className="relative inline-grid h-16 w-16 place-items-center rounded-full text-lg font-bold text-white" style={{ background: "var(--gradient-brand)" }}>
                  {s.n}
                </div>
                <h3 className="mt-5 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const items = [
    { icon: Package, t: t("why.moq"), d: t("why.moq.d") },
    { icon: Clock, t: t("why.fast"), d: t("why.fast.d") },
    { icon: ShieldCheck, t: t("why.qc"), d: t("why.qc.d") },
    { icon: Sparkles, t: t("why.custom"), d: t("why.custom.d") },
    { icon: Tag, t: t("why.pack"), d: t("why.pack.d") },
    { icon: Globe2, t: t("why.global"), d: t("why.global.d") },
  ];
  return (
    <section ref={ref} className="py-24 text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className={cn("mx-auto max-w-7xl px-6", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-brand-300)" }}>
            {t("why.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{t("why.title")}</h2>
          <p className="mt-5 text-white/75 leading-relaxed">{t("why.desc")}</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.t}
              className="rounded-xl p-6 transition-all hover:-translate-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            >
              <it.icon className="h-6 w-6" strokeWidth={1.5} style={{ color: "var(--color-brand-300)" }} />
              <h3 className="mt-4 font-semibold">{it.t}</h3>
              <p className="mt-1 text-sm text-white/70 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];
  return (
    <section ref={ref} className="py-24 bg-background">
      <div className={cn("mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-12", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-brand-600)" }}>{t("faq.eyebrow")}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">{t("faq.title")}</h2>
          <p className="mt-5 text-muted-foreground">{t("faq.desc")}</p>
        </div>
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card overflow-hidden px-6 transition-all duration-300 lg:hover:-translate-y-0.5 lg:hover:border-[var(--color-brand-600)] lg:hover:shadow-[var(--shadow-card)] data-[state=open]:border-[var(--color-brand-600)] data-[state=open]:bg-[var(--color-brand-100)]"
              >
                <AccordionTrigger className="py-5 text-base font-medium transition-colors duration-300 hover:no-underline data-[state=open]:text-[var(--color-brand-800)]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed data-[state=open]:text-[var(--color-brand-800)]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <section ref={ref} id="contact" className="py-24 text-white relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full" style={{ background: "var(--color-brand-300)", opacity: 0.15, filter: "blur(80px)" }} />
      <div className={cn("mx-auto max-w-4xl px-6 text-center relative", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <BadgeCheck className="mx-auto h-10 w-10" style={{ color: "var(--color-brand-300)" }} />
        <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">{t("cta.title")}</h2>
        <p className="mt-5 text-white/80 text-lg">{t("cta.subtitle")}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsFormOpen((open) => !open)}
            aria-expanded={isFormOpen}
            aria-controls="quote-form"
            className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            {t("cta.getInTouch")} <ArrowRight className={cn("h-4 w-4 transition-transform", isFormOpen && "rotate-90")} />
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-accent-green)" }}
          >
            <WhatsAppIcon className="h-4 w-4" /> {t("cta.whatsappShort")}
          </a>
        </div>
        <div
          id="quote-form"
          className={cn(
            "mx-auto grid max-w-2xl transition-[grid-template-rows,opacity,transform,margin-top] duration-500 ease-out",
            isFormOpen ? "mt-10 grid-rows-[1fr] opacity-100 translate-y-0" : "mt-0 grid-rows-[0fr] opacity-0 translate-y-3",
          )}
        >
          <div className="overflow-hidden">
            {submitState === "success" ? (
              <div className="rounded-2xl border border-emerald-200/30 bg-white/10 p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-md animate-fade-in-up">
                <lottie-player
                  src="/lottie/message-sent-plane.json"
                  background="transparent"
                  speed="1"
                  autoplay
                  className="mx-auto h-52 w-52"
                  aria-label={t("form.successAnimation")}
                />
                <h3 className="mt-4 text-2xl font-bold text-white">{t("form.successTitle")}</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80">{submitMessage}</p>
              </div>
            ) : (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  setSubmitState("submitting");
                  setSubmitMessage("");

                  try {
                    const formData = new FormData(form);
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: formData,
                    });
                    const result = await response.json();

                    if (response.ok && result.success) {
                      form.reset();
                      setSubmitState("success");
                      setSubmitMessage(t("form.success"));
                      return;
                    }

                    setSubmitState("error");
                    setSubmitMessage(result.message || t("form.error"));
                  } catch {
                    setSubmitState("error");
                    setSubmitMessage(t("form.error"));
                  }
                }}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-left shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8"
              >
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="SRC Gida Website Contact Form" />
                <input type="hidden" name="from_name" value="SRC Gida Website" />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-white/90">{t("form.name")}</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-2 h-12 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--color-brand-300)] focus:ring-2 focus:ring-white/30"
                      placeholder={t("form.namePlaceholder")}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-white/90">{t("form.phone")}</span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      className="mt-2 h-12 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--color-brand-300)] focus:ring-2 focus:ring-white/30"
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="text-sm font-medium text-white/90">{t("form.email")}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="mt-2 h-12 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--color-brand-300)] focus:ring-2 focus:ring-white/30"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </label>
                <label className="mt-5 block">
                  <span className="text-sm font-medium text-white/90">{t("form.message")}</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-md border border-white/20 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[var(--color-brand-300)] focus:ring-2 focus:ring-white/30"
                    placeholder={t("form.messagePlaceholder")}
                  />
                </label>
                {submitMessage && (
                  <p className="mt-5 rounded-md border border-red-200/50 bg-red-500/20 px-4 py-3 text-sm font-medium text-red-50">
                    {submitMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {submitState === "submitting" ? t("form.submitting") : t("form.submit")} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- RFQ MODAL ---------- */
function RFQModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm md:py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-background text-foreground shadow-2xl animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("rfq.close")}
          className="absolute right-4 top-4 z-10 inline-grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>

        {submitState === "success" ? (
          <div className="px-6 py-14 text-center md:px-10">
            <lottie-player
              src="/lottie/message-sent-plane.json"
              background="transparent"
              speed="1"
              autoplay
              className="mx-auto h-56 w-56"
              aria-label={t("form.successAnimation")}
            />
            <h2 className="mt-5 text-3xl font-bold">{t("rfq.successTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{submitMessage}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              {t("rfq.close")}
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-6 py-7 md:px-10">
              <h2 className="text-2xl font-bold md:text-3xl">{t("rfq.title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("rfq.subtitle")}</p>
            </div>

            <form
              className="px-6 py-8 md:px-10"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                setSubmitState("submitting");
                setSubmitMessage("");

                try {
                  const response = await fetch("/api/rfq", {
                    method: "POST",
                    body: new FormData(form),
                  });
                  const result = await response.json();

                  if (response.ok && result.success) {
                    form.reset();
                    setFileNames([]);
                    setSubmitState("success");
                    setSubmitMessage(t("rfq.success"));
                    return;
                  }

                  setSubmitState("error");
                  setSubmitMessage(result.message || t("rfq.error"));
                } catch {
                  setSubmitState("error");
                  setSubmitMessage(t("rfq.error"));
                }
              }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <RFQField label={t("rfq.name")} name="name" required />
                <RFQField label={t("rfq.company")} name="company" required />
                <RFQField label={t("rfq.email")} name="email" type="email" required />
                <RFQField label={t("rfq.phone")} name="phone" type="tel" required />
                <RFQField label={t("rfq.vessel")} name="vessel" />
                <RFQField label={t("rfq.port")} name="port" />
                <RFQField label={t("rfq.eta")} name="eta" type="datetime-local" />

                <label className="block">
                  <span className="text-sm font-medium">{t("rfq.documents")}</span>
                  <div className="relative mt-2 grid min-h-52 place-items-center rounded-md border-2 border-dashed border-border bg-secondary/40 px-6 py-8 text-center transition hover:border-[var(--color-brand-600)]">
                    <input
                      type="file"
                      name="documents"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.zip,.rar"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(event) => {
                        setFileNames(Array.from(event.currentTarget.files ?? []).map((file) => file.name));
                      }}
                    />
                    <div>
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background text-[var(--color-brand-800)]">
                        <Upload className="h-5 w-5" />
                      </span>
                      <p className="mt-4 font-semibold">{t("rfq.drop")}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{t("rfq.browse")}</p>
                      <p className="mt-3 text-xs font-medium text-muted-foreground">{t("rfq.supported")}</p>
                      {fileNames.length > 0 && (
                        <ul className="mt-4 space-y-1 text-xs font-medium text-[var(--color-brand-800)]">
                          {fileNames.map((name) => (
                            <li key={name}>{name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-medium">{t("rfq.message")}</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--color-brand-600)] focus:ring-2 focus:ring-[var(--color-brand-300)]/40"
                />
              </label>

              <label className="mt-5 flex items-start gap-3 text-sm">
                <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 rounded border-input" />
                <span>{t("rfq.terms")}</span>
              </label>

              {submitMessage && submitState === "error" && (
                <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  {submitMessage}
                </p>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex min-w-36 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {submitState === "submitting" ? t("rfq.submitting") : t("rfq.submit")} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function RFQField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-input bg-background px-4 text-sm outline-none transition focus:border-[var(--color-brand-600)] focus:ring-2 focus:ring-[var(--color-brand-300)]/40"
      />
    </label>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <footer ref={ref} className="bg-[oklch(0.15_0.04_250)] text-white/80 py-16">
      <div className={cn("mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-4", isVisible ? "animate-fade-in-up" : "section-hidden")}>
        <div>
          <img src={footerLogo} alt="SRC Gıda" className="h-12 w-auto object-contain" />
          <p className="mt-4 text-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white">{t("footer.about")}</a></li>
            <li><a href="#services" className="hover:text-white">{t("footer.services")}</a></li>
            <li><a href="#contact" className="hover:text-white">{t("footer.contact")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.categories")}</h4>
          <ul className="space-y-2 text-sm">
            <li>{t("cat.dry")}</li>
            <li>{t("cat.frozen")}</li>
            <li>{t("cat.fresh")}</li>
            <li>{t("cat.bev")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.contactCol")}</h4>
          <ul className="space-y-2 text-sm">
            <li>Istanbul, Türkiye</li>
            <li>sales@srcgida.com</li>
            <li>+90 546 833 37 00</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-8 border-t border-white/10 text-xs flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Src Gıda {t("footer.rights")}</span>
        <span>{t("footer.builtIn")}</span>
      </div>
    </footer>
  );
}

/* ---------- shared ---------- */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-brand-600)" }}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
