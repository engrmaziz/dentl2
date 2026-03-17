"use client";

import React, { use, useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AppointmentModal from "@/components/ui/AppointmentModal";
import { useGSAP } from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";

// ─── generateStaticParams ────────────────────────────────────────────────────
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// ─── Before/After Slider ──────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; calcPos(e.clientX); };
  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging.current) calcPos(e.clientX); }, [calcPos]);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
  const onTouchStart = (e: React.TouchEvent) => { dragging.current = true; calcPos(e.touches[0].clientX); };
  const onTouchMove = useCallback((e: TouchEvent) => { if (dragging.current) calcPos(e.touches[0].clientX); }, [calcPos]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        border: "1px solid var(--ash)",
      }}
    >
      {/* Before panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #e8e0d8 0%, #d4c8bc 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Before</p>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(45,55,72,0.12)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="var(--charcoal)" opacity="0.4"/></svg>
          </div>
        </div>
        <span style={{ position: "absolute", top: "1rem", left: "1rem", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", background: "rgba(255,255,255,0.7)", padding: "0.25rem 0.6rem", borderRadius: "2px" }}>Before</span>
      </div>

      {/* After panel (clipped) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          background: "linear-gradient(135deg, var(--ink) 0%, #1a2d4a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>After</p>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(184,149,106,0.15)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="var(--gold)"/></svg>
          </div>
        </div>
        <span style={{ position: "absolute", top: "1rem", left: "1rem", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", background: "rgba(10,22,40,0.7)", padding: "0.25rem 0.6rem", borderRadius: "2px" }}>After</span>
      </div>

      {/* Drag Handle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          transform: "translateX(-50%)",
          width: "2px",
          background: "var(--gold)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(184,149,106,0.5)",
            cursor: "ew-resize",
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M8 5l-7 7 7 7M16 5l7 7-7 7" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              borderBottom: "1px solid var(--ash)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.4rem 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-md)",
                  lineHeight: "var(--leading-tight)",
                  color: "var(--ink)",
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  fontSize: "1.4rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: "transform 0.3s ease, background 0.3s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  background: isOpen ? "var(--gold)" : "transparent",
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke={isOpen ? "var(--ivory)" : "var(--gold)"} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--leading-loose)",
                  color: "var(--charcoal)",
                  paddingBottom: "1.4rem",
                  margin: 0,
                }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Animated Procedure Timeline ─────────────────────────────────────────────
function ProcedureTimeline({ steps }: { steps: { step: number; title: string; description: string }[] }) {
  const lineRef = useRef<SVGLineElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stepsRef.current || !lineRef.current) return;
    const line = lineRef.current;
    const totalLen = 600;
    gsap.set(line, { strokeDasharray: totalLen, strokeDashoffset: totalLen });
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "ease.smooth",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    const items = stepsRef.current.querySelectorAll(".timeline-step");
    gsap.fromTo(
      items,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "ease.snap",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
      {/* Gold vertical line SVG */}
      <div style={{ flexShrink: 0, paddingTop: "0.5rem" }}>
        <svg
          aria-hidden="true"
          width="2"
          height={`${steps.length * 140}px`}
          viewBox={`0 0 2 ${steps.length * 140}`}
          style={{ overflow: "visible" }}
        >
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2={steps.length * 140}
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div ref={stepsRef} style={{ display: "flex", flexDirection: "column", gap: "2.5rem", flexGrow: 1 }}>
        {steps.map((step) => (
          <div key={step.step} className="timeline-step" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div
              style={{
                flexShrink: 0,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--ink)",
                border: "1px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "-25px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  color: "var(--gold)",
                  fontWeight: 600,
                }}
              >
                {String(step.step).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-md)",
                  color: "var(--ink)",
                  margin: "0 0 0.5rem",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--leading-loose)",
                  color: "var(--charcoal)",
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated Benefit Checkmark ───────────────────────────────────────────────
function BenefitItem({ text, index }: { text: string; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!itemRef.current) return;
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "ease.snap",
        delay: index * 0.08,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    if (checkRef.current) {
      const path = checkRef.current;
      const len = path.getTotalLength ? path.getTotalLength() : 30;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "ease.smooth",
        delay: index * 0.08 + 0.2,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [index]);

  return (
    <div
      ref={itemRef}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1rem 1.25rem",
        background: "var(--mist)",
        borderRadius: "4px",
        border: "1px solid var(--ash)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(184,149,106,0.12)",
          border: "1px solid rgba(184,149,106,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1px",
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            ref={checkRef}
            d="M4 12l5 5L20 7"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          lineHeight: "var(--leading-normal)",
          color: "var(--charcoal)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Hero SVG (animated stroke draw) ─────────────────────────────────────────
function ServiceHeroSVG({ iconPath }: { iconPath: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    registerGSAP();
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength ? pathRef.current.getTotalLength() : 100;
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len, fill: "none" });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "ease.smooth",
        delay: 0.3,
        onComplete() {
          if (pathRef.current) {
            gsap.to(pathRef.current, { fill: "var(--gold)", duration: 0.6, ease: "ease.smooth" });
          }
        },
      });
    }
    if (circleRef.current) {
      gsap.fromTo(circleRef.current, { scale: 0, opacity: 0, transformOrigin: "center" }, { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1,0.5)", delay: 0.1 });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Decorative rings */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 300"
        width="300"
        height="300"
        style={{ position: "absolute", opacity: 0.12 }}
      >
        <circle cx="150" cy="150" r="120" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="150" cy="150" r="90" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="60" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
      </svg>

      {/* Main icon */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(184,149,106,0.08)",
          border: "1px solid rgba(184,149,106,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width="72" height="72" aria-hidden="true">
          <circle ref={circleRef} cx="12" cy="12" r="11" fill="none" stroke="rgba(184,149,106,0.15)" strokeWidth="0.5" />
          <path
            ref={pathRef}
            d={iconPath}
            stroke="var(--gold)"
            strokeWidth="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);
  const [modalOpen, setModalOpen] = useState(false);

  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroLeftRef.current) {
      gsap.fromTo(heroLeftRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1, ease: "ease.smooth", delay: 0.1 });
    }
    if (heroRightRef.current) {
      gsap.fromTo(heroRightRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: "ease.smooth", delay: 0.3 });
    }
  }, []);

  if (!service) {
    return (
      <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem", textAlign: "center", padding: "4rem 2rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>404</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: 0 }}>Service Not Found</h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", maxWidth: "400px" }}>The service you're looking for doesn't exist. Browse all our treatments below.</p>
        <Button as="a" href="/services" variant="primary" size="md">View All Services</Button>
      </main>
    );
  }

  const relatedServiceData = service.relatedServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <main>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(184,149,106,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div ref={heroLeftRef}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>
                <Link href="/services" style={{ color: "inherit", textDecoration: "none", opacity: 0.7 }}>Services</Link>
                {" · "}
                {service.name}
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-hero)",
                  lineHeight: "var(--leading-tight)",
                  color: "var(--ivory)",
                  margin: "0 0 1.25rem",
                }}
              >
                {service.name}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  lineHeight: "var(--leading-normal)",
                  color: "rgba(247,243,238,0.65)",
                  fontStyle: "italic",
                  margin: "0 0 1.75rem",
                }}
              >
                {service.tagline}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <Badge variant="gold" size="md">{service.priceRange}</Badge>
                <Badge variant="gold" size="md">{service.duration}</Badge>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
                  Book Appointment
                </Button>
                <Button variant="secondary" size="lg" as="a" href="#procedure">
                  See Procedure
                </Button>
              </div>
            </div>

            {/* Right — SVG illustration */}
            <div
              ref={heroRightRef}
              style={{
                height: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ServiceHeroSVG iconPath={service.icon} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS IT ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Understanding the Treatment
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 2rem", lineHeight: "var(--leading-tight)" }}>
            What Is {service.name}?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: "var(--leading-loose)", color: "var(--charcoal)", margin: 0 }}>
            {service.whatIsIt}
          </p>
          <div style={{ width: "60px", height: "1px", background: "var(--gold)", margin: "2.5rem 0 0" }} />
        </div>
      </section>

      {/* ── 3. WHO NEEDS IT ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--mist)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                Is This For Me?
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 2rem", lineHeight: "var(--leading-tight)" }}>
                Who Needs It?
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: "var(--charcoal)", margin: 0 }}>
                {service.whoNeedsIt}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", label: "London-based" },
                { icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", label: "Safe & Certified" },
                { icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z", label: "All Ages Welcome" },
                { icon: "M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z", label: "Free Consultation" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.5rem",
                    background: "white",
                    borderRadius: "4px",
                    border: "1px solid var(--ash)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(184,149,106,0.1)", border: "1px solid rgba(184,149,106,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path d={item.icon} fill="var(--gold)" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--ink)", margin: 0 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PROCEDURE TIMELINE ─────────────────────────────────────────── */}
      <section id="procedure" style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Step by Step
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 3.5rem", lineHeight: "var(--leading-tight)" }}>
            The Procedure
          </h2>
          <ProcedureTimeline steps={service.procedure} />
        </div>
      </section>

      {/* ── 5. BENEFITS ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ink)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Why Choose This Treatment
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ivory)", margin: "0 0 3rem", lineHeight: "var(--leading-tight)" }}>
            Key Benefits
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {service.benefits.map((benefit, i) => (
              <BenefitItem key={i} text={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BEFORE/AFTER SLIDER ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--mist)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Real Results
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 0.75rem", lineHeight: "var(--leading-tight)" }}>
            Before & After
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--charcoal)", margin: "0 0 2.5rem", lineHeight: "var(--leading-normal)" }}>
            Drag the handle to reveal the transformation.
          </p>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Common Questions
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 3rem", lineHeight: "var(--leading-tight)" }}>
            Frequently Asked
          </h2>
          <FAQAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* ── 8. BOOKING CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(4rem, 8vw, 8rem)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(184,149,106,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse at center, rgba(184,149,106,0.07) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Badge variant="gold" size="md" style={{ marginBottom: "1.5rem" }}>
            {service.priceRange}
          </Badge>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ivory)", margin: "1.25rem 0 1rem", lineHeight: "var(--leading-tight)" }}>
            Ready for Your {service.name}?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "rgba(247,243,238,0.65)", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: "var(--leading-loose)" }}>
            {service.tagline} — Book your consultation today and take the first step.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
              Book Appointment
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/services">
              All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ── 9. RELATED SERVICES ───────────────────────────────────────────── */}
      {relatedServiceData.length > 0 && (
        <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
          <div className="container">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Explore More
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--ink)", margin: "0 0 3rem", lineHeight: "var(--leading-tight)" }}>
              Related Services
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
              {relatedServiceData.map((rel) => {
                if (!rel) return null;
                return (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        padding: "2rem",
                        background: "white",
                        borderRadius: "4px",
                        border: "1px solid var(--ash)",
                        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(10,22,40,0.12)";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,149,106,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ash)";
                      }}
                    >
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--mist)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                          <path d={rel.icon} fill="var(--gold)" />
                        </svg>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", color: "var(--ink)", margin: "0 0 0.5rem", lineHeight: "var(--leading-tight)" }}>
                        {rel.name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--charcoal)", lineHeight: "var(--leading-normal)", margin: "0 0 1rem" }}>
                        {rel.shortDescription}
                      </p>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        Learn More →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
