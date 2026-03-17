"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import type { Service } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useTilt, useGSAP } from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";

// ─── Hero Gold Line SVG ───────────────────────────────────────────────────────
function HeroGoldLine() {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!lineRef.current) return;
    const path = lineRef.current;
    const length = 600;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "ease.smooth",
      delay: 0.4,
    });
  }, []);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 40"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        bottom: "-4px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "110%",
        maxWidth: "800px",
        height: "40px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <path
        ref={lineRef}
        d="M10 28 Q 175 6 350 22 Q 525 36 690 12"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>(12);
  const [hovered, setHovered] = useState(false);

  const gradients = [
    "linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)",
    "linear-gradient(135deg, #1a1408 0%, #2d2010 100%)",
    "linear-gradient(135deg, #0d1a0d 0%, #142814 100%)",
    "linear-gradient(135deg, #1a0d1a 0%, #2e182e 100%)",
    "linear-gradient(135deg, #0a1a1a 0%, #102828 100%)",
    "linear-gradient(135deg, #1a1020 0%, #2a1830 100%)",
    "linear-gradient(135deg, #0a1628 0%, #0f2040 100%)",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/services/${service.slug}`}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div
        ref={tiltRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="service-card-item"
        style={{
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: hovered ? "var(--ink)" : "#ffffff",
          border: `1px solid ${hovered ? "rgba(184,149,106,0.3)" : "var(--ash)"}`,
          cursor: "pointer",
          transition: "background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          boxShadow: hovered
            ? "0 24px 64px rgba(10,22,40,0.4)"
            : "0 2px 16px rgba(10,22,40,0.06)",
          transformStyle: "preserve-3d",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Gold accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: hovered ? "3px" : "0px",
            background: "linear-gradient(90deg, var(--gold), #D4B896, var(--gold))",
            transition: "height 0.35s ease",
            zIndex: 2,
          }}
        />

        {/* SVG Illustration Area */}
        <div
          style={{
            height: "180px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered
              ? gradient
              : "linear-gradient(180deg, var(--mist) 0%, var(--ash) 100%)",
            transition: "background 0.5s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: `1px solid ${hovered ? "rgba(184,149,106,0.2)" : "rgba(10,22,40,0.06)"}`,
              transition: "border-color 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: `1px solid ${hovered ? "rgba(184,149,106,0.12)" : "rgba(10,22,40,0.04)"}`,
              transition: "border-color 0.5s ease",
            }}
          />
          <svg
            viewBox="0 0 24 24"
            width="52"
            height="52"
            style={{
              position: "relative",
              zIndex: 1,
              transition: "transform 0.4s ease, filter 0.4s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered ? "drop-shadow(0 0 10px rgba(184,149,106,0.6))" : "none",
            }}
            aria-hidden="true"
          >
            <path
              d={service.icon}
              fill={hovered ? "var(--gold)" : "var(--charcoal)"}
              style={{ transition: "fill 0.4s ease" }}
            />
          </svg>
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flexGrow: 1,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-tight)",
              color: hovered ? "var(--ivory)" : "var(--ink)",
              margin: 0,
              transition: "color 0.4s ease",
            }}
          >
            {service.name}
          </h3>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <Badge variant={hovered ? "gold" : "mist"} size="sm">
              {service.priceRange}
            </Badge>
            <Badge variant={hovered ? "gold" : "mist"} size="sm">
              {service.duration}
            </Badge>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-normal)",
              color: hovered ? "rgba(247,243,238,0.72)" : "var(--charcoal)",
              margin: 0,
              flexGrow: 1,
              transition: "color 0.4s ease",
            }}
          >
            {service.shortDescription}
          </p>

          {/* "Learn More" slides up on hover */}
          <div
            style={{
              overflow: "hidden",
              height: hovered ? "46px" : "0px",
              transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              style={{
                transform: hovered ? "translateY(0)" : "translateY(46px)",
                transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                paddingTop: "0.5rem",
              }}
            >
              <Button
                as="a"
                href={`/services/${service.slug}`}
                variant="primary"
                size="sm"
                magnetic={false}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Staggered Grid ───────────────────────────────────────────────────────────
function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".service-card-item");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: { each: 0.07, from: "start" as const },
        ease: "ease.snap",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2rem",
        alignItems: "stretch",
      }}
    >
      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "ease.smooth", delay: 0.1 }
      );
    }
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "ease.smooth", delay: 0.25 }
      );
    }
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "ease.smooth",
          delay: 0.7,
          transformOrigin: "center",
        }
      );
    }
    if (subRef.current) {
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "ease.smooth", delay: 0.65 }
      );
    }
  }, []);

  return (
    <section
      style={{
        backgroundColor: "var(--ink)",
        minHeight: "52vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingBlock: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(184,149,106,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      {/* Central glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(184,149,106,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1.25rem",
          }}
        >
          Dentl Clinic · London
        </p>

        {/* Headline wrapped for gold-line SVG */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            Our Services
          </h1>
          <HeroGoldLine />
        </div>

        <div
          ref={dividerRef}
          style={{
            width: "60px",
            height: "1px",
            background: "var(--gold)",
            margin: "1.75rem auto",
          }}
        />

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            lineHeight: "var(--leading-loose)",
            color: "rgba(247,243,238,0.68)",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          From preventive care to complete smile transformations — every
          treatment delivered with precision, artistry, and warmth.
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main>
      <Hero />

      {/* Grid Section */}
      <section
        style={{
          backgroundColor: "var(--ivory)",
          paddingBlock: "clamp(4rem, 8vw, 9rem)",
        }}
      >
        <div className="container">
          <div
            style={{
              marginBottom: "3.5rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.5rem",
                }}
              >
                {services.length} Treatments Available
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  lineHeight: "var(--leading-tight)",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Complete Dental Care
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-normal)",
                color: "var(--charcoal)",
                maxWidth: "380px",
                margin: 0,
              }}
            >
              Every treatment is tailored to your unique anatomy, goals, and
              timeline — no one-size-fits-all protocols.
            </p>
          </div>

          <ServicesGrid />
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(3rem, 6vw, 6rem)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Ready to Begin?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              marginBottom: "1.5rem",
            }}
          >
            Your Journey Starts Here
          </h2>
          <p
            style={{
              color: "rgba(247,243,238,0.65)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
              lineHeight: "var(--leading-loose)",
            }}
          >
            Book a complimentary consultation and let our specialists craft a
            personalised treatment plan for you.
          </p>
          <Button as="a" href="/contact" variant="primary" size="lg">
            Book a Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
