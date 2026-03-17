"use client";

import React, { useRef, useState, useEffect } from "react";
import type { Service, Doctor, Testimonial, BlogPost } from "@/types";
import {
  useTilt,
  useCountUp,
  useGSAP,
  wordReveal,
  lineReveal,
} from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog-posts";
import HeroCanvasLoader from "@/components/three/HeroCanvasLoader";
import AppointmentModal from "@/components/ui/AppointmentModal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const tiltRef = useTilt<HTMLDivElement>(10);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={tiltRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "320px",
        height: "420px",
        flexShrink: 0,
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: hovered ? "var(--ink)" : "var(--ivory)",
        border: "1px solid var(--ash)",
        cursor: "pointer",
        transition: "background-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 24px 64px rgba(10,22,40,0.35)"
          : "0 2px 16px rgba(10,22,40,0.06)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gold bar slides up on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: hovered ? "4px" : "0px",
          backgroundColor: "var(--gold)",
          transition: "height 0.35s ease",
        }}
      />

      {/* Icon area */}
      <div
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered
            ? "linear-gradient(180deg, rgba(184,149,106,0.12) 0%, transparent 100%)"
            : "linear-gradient(180deg, var(--mist) 0%, var(--ivory) 100%)",
          transition: "background 0.4s ease",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: service.icon }}
          style={{
            width: "64px",
            height: "64px",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s",
            filter: hovered
              ? "brightness(1.4) sepia(0.4) saturate(1.5)"
              : "none",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.6rem",
          }}
        >
          {service.duration}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-lg)",
            fontWeight: 400,
            color: hovered ? "var(--ivory)" : "var(--ink)",
            marginBottom: "0.75rem",
            transition: "color 0.3s",
            lineHeight: 1.25,
          }}
        >
          {service.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: hovered ? "rgba(247,243,238,0.65)" : "var(--charcoal)",
            lineHeight: 1.6,
            transition: "color 0.3s",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.shortDescription}
        </p>
      </div>
    </div>
  );
}

// ─── Doctor Card ──────────────────────────────────────────────────────────────

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const tiltRef = useTilt<HTMLDivElement>(8);

  return (
    <div
      ref={tiltRef}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "var(--ivory)",
        border: "1px solid var(--ash)",
        transition: "box-shadow 0.3s",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          height: "220px",
          background: doctor.image,
          display: "flex",
          alignItems: "flex-end",
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(247,243,238,0.15)",
            border: "2px solid rgba(247,243,238,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-sm)",
            color: "var(--ivory)",
            fontWeight: 400,
          }}
        >
          {(() => {
            const parts = doctor.name.split(" ").filter(Boolean);
            const first = parts.find((p) => p !== "Dr." && p !== "Mr." && p !== "Ms." && p !== "Mrs.") ?? parts[0];
            const last = parts[parts.length - 1];
            return (first[0] ?? "") + (last !== first ? (last[0] ?? "") : "");
          })()}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.35rem",
          }}
        >
          {doctor.experience} yrs exp.
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-md)",
            fontWeight: 400,
            color: "var(--ink)",
            marginBottom: "0.25rem",
          }}
        >
          {doctor.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--charcoal)",
            marginBottom: "1rem",
          }}
        >
          {doctor.title}
        </p>
        <Badge variant="gold" size="sm">
          {doctor.specialization}
        </Badge>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: 0,
        backgroundColor: "var(--ivory)",
        borderRadius: "4px",
        padding: "2.5rem 2rem",
        border: "1px solid var(--ash)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Large quote mark */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "5rem",
          lineHeight: 0.8,
          color: "var(--gold)",
          opacity: 0.35,
          display: "block",
          userSelect: "none",
          marginBottom: "0.25rem",
        }}
      >
        &ldquo;
      </span>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--charcoal)",
          lineHeight: 1.75,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {testimonial.text}
      </p>

      {/* Stars */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={i < testimonial.rating ? "var(--gold)" : "none"}
            stroke="var(--gold)"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: testimonial.avatar.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "#fff",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {testimonial.avatar.initials}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            {testimonial.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--gold)",
              letterSpacing: "0.06em",
            }}
          >
            {testimonial.treatment}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Blog Card (large) ────────────────────────────────────────────────────────

function BlogCardLarge({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        flex: "0 0 58%",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "rgba(247,243,238,0.04)",
        border: "1px solid rgba(247,243,238,0.1)",
        transition: "border-color 0.3s",
        borderColor: hovered
          ? "rgba(184,149,106,0.5)"
          : "rgba(247,243,238,0.1)",
      }}
    >
      <div
        style={{
          height: "300px",
          background: post.featuredImage,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: hovered ? "rgba(10,22,40,0.1)" : "rgba(10,22,40,0.3)",
            transition: "background-color 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            left: "1.25rem",
          }}
        >
          <Badge variant="gold">{post.category}</Badge>
        </div>
      </div>

      <div style={{ padding: "2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "rgba(184,149,106,0.8)",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          {post.readTime} min read &middot;{" "}
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 400,
            color: "var(--ivory)",
            marginBottom: "1rem",
            lineHeight: 1.25,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "rgba(247,243,238,0.6)",
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
        <p
          style={{
            marginTop: "1.25rem",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          Read Article →
        </p>
      </div>
    </a>
  );
}

function BlogCardSmall({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "1.25rem",
        textDecoration: "none",
        padding: "1.5rem",
        borderRadius: "4px",
        backgroundColor: "rgba(247,243,238,0.04)",
        border: "1px solid rgba(247,243,238,0.1)",
        transition: "border-color 0.3s",
        borderColor: hovered
          ? "rgba(184,149,106,0.4)"
          : "rgba(247,243,238,0.1)",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "2px",
          background: post.featuredImage,
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <Badge variant="gold" size="sm">
          {post.category}
        </Badge>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--ivory)",
            margin: "0.5rem 0 0.4rem",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "rgba(247,243,238,0.5)",
          }}
        >
          {post.readTime} min read
        </p>
      </div>
    </a>
  );
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────

const GALLERY_ITEMS = [
  {
    bg: "linear-gradient(135deg, #B8956A 0%, #0A1628 100%)",
    label: "Smile Makeover",
    span: 2,
  },
  {
    bg: "linear-gradient(135deg, #1a3a5c 0%, #B8956A 100%)",
    label: "Porcelain Veneers",
    span: 1,
  },
  {
    bg: "linear-gradient(160deg, #2D3748 0%, #B8956A 80%)",
    label: "Teeth Whitening",
    span: 1,
  },
  {
    bg: "linear-gradient(135deg, #0A1628 0%, #2E7D5E 100%)",
    label: "Dental Implants",
    span: 1,
  },
  {
    bg: "linear-gradient(135deg, #7B4F9E 0%, #0A1628 100%)",
    label: "Orthodontics",
    span: 1,
  },
  {
    bg: "linear-gradient(160deg, #B8956A 0%, #2D3748 100%)",
    label: "Cosmetic Bonding",
    span: 2,
  },
];

function GalleryItem({
  item,
}: {
  item: (typeof GALLERY_ITEMS)[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow: `span ${item.span}`,
        background: item.bg,
        borderRadius: "4px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        minHeight: item.span === 2 ? "320px" : "180px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,22,40,0.65)",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.25,0,0.25,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-md)",
            color: "var(--ivory)",
            fontWeight: 400,
            letterSpacing: "0.04em",
          }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  // ── Hero refs ──
  const heroLineRef = useRef<HTMLDivElement>(null);
  const awardRef = useRef<HTMLParagraphElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  // ── Services section refs ──
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);

  // ── How it Works SVG ref ──
  const svgPathRef = useRef<SVGPathElement>(null);

  // ── Trust bar count-up refs ──
  const countPatients = useCountUp(12000, { suffix: "+", duration: 2 });
  const countSatisfaction = useCountUp(98, { suffix: "%", duration: 1.8 });
  const countYears = useCountUp(15, { suffix: " yrs", duration: 1.5 });
  const countRating = useCountUp(4.9, { suffix: "/5", duration: 2 });

  // ── Testimonial carousel ──
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ── Inline appointment form ──
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, time: "09:00" }),
      });
      setFormStatus(res.ok ? "success" : "error");
    } catch {
      setFormStatus("error");
    }
  };

  // ── Hero entrance animation ──
  useGSAP(
    (ctx) => {
      if (
        !heroLineRef.current ||
        !awardRef.current ||
        !heroH1Ref.current ||
        !heroSubRef.current ||
        !heroCtaRef.current
      )
        return;

      const tl = gsap.timeline({ delay: 0.4 });

      // 1. Gold line draws left → right
      tl.fromTo(
        heroLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          transformOrigin: "left center",
          ease: "power3.out",
        }
      );

      // 2. "AWARD-WINNING" label fades up
      tl.fromTo(
        awardRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        "-=0.3"
      );

      // 3. H1 word-by-word clip-path reveal
      tl.add(() => {
        if (heroH1Ref.current) wordReveal(heroH1Ref.current);
      }, "-=0.1");

      // 4. Subheadline fades in
      tl.fromTo(
        heroSubRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
        "+=0.5"
      );

      // 5. CTA buttons scale in
      tl.fromTo(
        heroCtaRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.35"
      );
    },
    []
  );

  // ── Services horizontal scroll ──
  useGSAP(
    (ctx) => {
      const wrapper = servicesSectionRef.current;
      const track = servicesTrackRef.current;
      if (!wrapper || !track) return;

      const totalW = track.scrollWidth;
      const viewW = wrapper.offsetWidth;

      gsap.to(track, {
        x: -(totalW - viewW) + 80,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalW - viewW}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
    },
    []
  );

  // ── How It Works SVG path ──
  useGSAP(
    () => {
      const path = svgPathRef.current;
      if (!path) return;

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: path,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.5,
        },
      });
    },
    []
  );

  const visibleTestimonials = [0, 1, 2].map(
    (i) => testimonials[(activeTestimonial + i) % testimonials.length]
  );

  const displayedServices = services.slice(0, 8);
  const displayedDoctors = team.slice(0, 4) as Doctor[];

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />

      <main>
        {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            height: "100svh",
            minHeight: "600px",
            backgroundColor: "var(--ink)",
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
            clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 100%)",
          }}
        >
          {/* Left — copy */}
          <div
            style={{
              flex: "0 0 60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 5vw 0 max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Gold accent line */}
            <div
              ref={heroLineRef}
              style={{
                width: "56px",
                height: "2px",
                backgroundColor: "var(--gold)",
                marginBottom: "1.5rem",
                transformOrigin: "left center",
              }}
            />

            {/* Label */}
            <p
              ref={awardRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
                opacity: 0,
              }}
            >
              Award-Winning · London Dental Studio
            </p>

            {/* H1 */}
            <h1
              ref={heroH1Ref}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 400,
                color: "var(--ivory)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                maxWidth: "640px",
                marginBottom: "2rem",
              }}
            >
              Crafting Smiles. Restoring Confidence.
            </h1>

            {/* Sub */}
            <p
              ref={heroSubRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-md)",
                color: "rgba(247,243,238,0.65)",
                lineHeight: 1.75,
                maxWidth: "440px",
                marginBottom: "2.75rem",
                opacity: 0,
              }}
            >
              Where clinical precision meets genuine warmth. A sanctuary of
              dental excellence in the heart of London.
            </p>

            {/* CTAs */}
            <div
              ref={heroCtaRef}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                opacity: 0,
              }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => setAppointmentOpen(true)}
              >
                Book Appointment
              </Button>
              <Button
                variant="secondary"
                size="lg"
                as="a"
                href="/services"
              >
                Explore Services →
              </Button>
            </div>
          </div>

          {/* Right — Three.js canvas */}
          <div
            style={{
              flex: "0 0 40%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <HeroCanvasLoader />
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "3.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0.45,
              animation: "float 2.2s ease-in-out infinite",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ivory)",
              }}
            >
              Scroll
            </p>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              stroke="var(--ivory)"
              strokeWidth="1.5"
            >
              <rect x="5" y="1" width="6" height="12" rx="3" />
              <circle cx="8" cy="5" r="1.5" fill="var(--ivory)" />
              <line x1="8" y1="17" x2="8" y2="23" />
              <polyline points="5,20 8,23 11,20" />
            </svg>
          </div>
        </section>

        {/* ── SECTION 2: TRUST BAR ─────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ivory)",
            padding: "5rem 0",
          }}
        >
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
              alignItems: "center",
              gap: "0",
            }}
          >
            {[
              {
                ref: countPatients,
                label: "Patients Treated",
                initial: "12,000+",
              },
              {
                ref: countSatisfaction,
                label: "Satisfaction Rate",
                initial: "98%",
              },
              { ref: countYears, label: "Years of Excellence", initial: "15 yrs" },
              { ref: countRating, label: "Average Rating", initial: "4.9/5" },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1.5rem 2rem",
                  }}
                >
                  <p
                    ref={stat.ref as React.RefObject<HTMLParagraphElement>}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xl)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      marginBottom: "0.4rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.initial}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--charcoal)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
                {/* Gold divider */}
                {i < arr.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "56px",
                      backgroundColor: "var(--gold)",
                      opacity: 0.35,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: SERVICES PREVIEW ──────────────────────────────────── */}
        <section
          ref={servicesSectionRef}
          style={{
            backgroundColor: "var(--ivory)",
            overflow: "hidden",
            position: "relative",
            borderTop: "1px solid var(--ash)",
          }}
        >
          <div
            style={{
              padding: "5rem 0 2rem",
              paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.75rem",
              }}
            >
              Our Expertise
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontWeight: 400,
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}
            >
              What We Offer
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--charcoal)",
              }}
            >
              Scroll to explore →
            </p>
          </div>

          {/* Scrolling track */}
          <div
            ref={servicesTrackRef}
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "2rem max(2rem, calc((100vw - 1280px) / 2 + 2rem)) 4rem",
              willChange: "transform",
            }}
          >
            {displayedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* ── SECTION 4: ABOUT TEASER ──────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--mist)",
            clipPath:
              "polygon(0 4%, 100% 0, 100% 96%, 0 100%)",
            padding: "8rem 0",
            position: "relative",
          }}
        >
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            {/* Left — large quote */}
            <div>
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "var(--gold)",
                  marginBottom: "2rem",
                }}
              />
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--ink)",
                  lineHeight: 1.45,
                  margin: 0,
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: "1.75rem",
                }}
              >
                &ldquo;We believe a beautiful smile is not a luxury &mdash; it
                is a right.&rdquo;
              </blockquote>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: "var(--charcoal)",
                  marginTop: "1.5rem",
                }}
              >
                &mdash; Dr. Sophia Harrington, Principal Dentist & Founder
              </p>
              <div style={{ marginTop: "2.5rem" }}>
                <Button variant="ghost" as="a" href="/about">
                  Our Story →
                </Button>
              </div>
            </div>

            {/* Right — stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {[
                {
                  value: "Founded 2009",
                  desc: "Over fifteen years of transforming smiles across London",
                },
                {
                  value: "15 Specialist Dentists",
                  desc: "A multidisciplinary team of award-winning clinicians",
                },
                {
                  value: "3 Award-Winning Locations",
                  desc: "Mayfair, Kensington & the City of London",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  style={{
                    paddingBottom: "2.5rem",
                    borderBottom: "1px solid var(--ash)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--charcoal)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: HOW IT WORKS ──────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ink)",
            padding: "7rem 0",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                }}
              >
                The Process
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                }}
              >
                How It Works
              </h2>
            </div>

            {/* Steps + SVG connector */}
            <div style={{ position: "relative" }}>
              {/* SVG connecting line */}
              <svg
                viewBox="0 0 900 80"
                fill="none"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  top: "48px",
                  left: "16.66%",
                  width: "66.66%",
                  height: "80px",
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                <path
                  ref={svgPathRef}
                  d="M 0 40 C 150 40, 300 40, 450 40 C 600 40, 750 40, 900 40"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "3rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {[
                  {
                    num: "01",
                    title: "Consultation",
                    desc: "A comprehensive assessment of your oral health, digital imaging, and a candid conversation about your goals.",
                  },
                  {
                    num: "02",
                    title: "Personalised Plan",
                    desc: "We design a bespoke treatment roadmap tailored precisely to your anatomy, lifestyle, and aspirations.",
                  },
                  {
                    num: "03",
                    title: "Transformation",
                    desc: "Expert clinical care delivered with precision and warmth, followed by ongoing support for lasting results.",
                  },
                ].map((step) => (
                  <div key={step.num} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        border: "1.5px solid var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 2rem",
                        backgroundColor: "var(--ink)",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-sm)",
                          color: "var(--gold)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-lg)",
                        fontWeight: 400,
                        color: "var(--ivory)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "rgba(247,243,238,0.6)",
                        lineHeight: 1.7,
                        maxWidth: "260px",
                        margin: "0 auto",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FEATURED DOCTORS ──────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ivory)",
            padding: "7rem 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  The Team
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  Meet Our Specialists
                </h2>
              </div>
              <Button variant="ghost" as="a" href="/team">
                Full Team →
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {displayedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: TESTIMONIALS ──────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--mist)",
            padding: "7rem 0",
            clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                }}
              >
                Patient Stories
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                What Our Patients Say
              </h2>
            </div>

            {/* Cards */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                transition: "opacity 0.3s ease",
              }}
            >
              {visibleTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>

            {/* Dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "2.5rem",
              }}
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor:
                      i === activeTestimonial
                        ? "var(--gold)"
                        : "rgba(10,22,40,0.2)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s ease, background-color 0.3s ease",
                  }}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 8: GALLERY TEASER ─────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ivory)",
            padding: "7rem 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Results
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  Smile Gallery
                </h2>
              </div>
              <Button variant="ghost" as="a" href="/gallery">
                View All →
              </Button>
            </div>

            {/* Masonry grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridAutoRows: "180px",
                gap: "10px",
              }}
            >
              {GALLERY_ITEMS.map((item, i) => (
                <GalleryItem key={i} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 9: BLOG PREVIEW ──────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ink)",
            padding: "7rem 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Insights
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    color: "var(--ivory)",
                  }}
                >
                  From Our Journal
                </h2>
              </div>
              <Button variant="secondary" as="a" href="/blog">
                All Articles →
              </Button>
            </div>

            {/* Editorial layout: 1 large + 2 small */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "stretch",
              }}
            >
              {blogPosts[0] && <BlogCardLarge post={blogPosts[0]} />}
              <div
                style={{
                  flex: "0 0 38%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                {blogPosts[1] && <BlogCardSmall post={blogPosts[1]} />}
                {blogPosts[2] && <BlogCardSmall post={blogPosts[2]} />}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 10: APPOINTMENT CTA ──────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--ink)",
            position: "relative",
            padding: "7rem 0",
            overflow: "hidden",
          }}
        >
          {/* Geometric gold pattern */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: [
                "repeating-linear-gradient(45deg, rgba(184,149,106,0.07) 0px, rgba(184,149,106,0.07) 1px, transparent 1px, transparent 48px)",
                "repeating-linear-gradient(-45deg, rgba(184,149,106,0.07) 0px, rgba(184,149,106,0.07) 1px, transparent 1px, transparent 48px)",
              ].join(", "),
              pointerEvents: "none",
            }}
          />

          {/* Gold glow orb */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <Badge variant="gold" size="md">
                New Patients Welcome
              </Badge>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                  marginTop: "1.25rem",
                  marginBottom: "0.75rem",
                }}
              >
                Begin Your Smile Journey
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  color: "rgba(247,243,238,0.6)",
                  maxWidth: "480px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Complete this form and our team will contact you within 24 hours
                to confirm your appointment.
              </p>
            </div>

            {formStatus === "success" ? (
              <div
                style={{
                  maxWidth: "560px",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "3rem 2rem",
                  border: "1px solid rgba(184,149,106,0.3)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(184,149,106,0.06)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "2px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-lg)",
                    color: "var(--ivory)",
                    marginBottom: "0.5rem",
                    fontWeight: 400,
                  }}
                >
                  Request Received
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    color: "rgba(247,243,238,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  Thank you. A member of our team will be in touch within 24
                  hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  maxWidth: "720px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="Dr. Jane Smith"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(247,243,238,0.06)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--ivory)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(184,149,106,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(247,243,238,0.15)")
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                    placeholder="jane@example.com"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(247,243,238,0.06)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--ivory)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(184,149,106,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(247,243,238,0.15)")
                    }
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, phone: e.target.value }))
                    }
                    placeholder="+44 20 7000 0000"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(247,243,238,0.06)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--ivory)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(184,149,106,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(247,243,238,0.15)")
                    }
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, service: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(10,22,40,0.95)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: formData.service
                        ? "var(--ivory)"
                        : "rgba(247,243,238,0.4)",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      appearance: "none",
                    }}
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred date */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, date: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(247,243,238,0.06)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--ivory)",
                      outline: "none",
                      boxSizing: "border-box",
                      colorScheme: "dark",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(184,149,106,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(247,243,238,0.15)")
                    }
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Additional Notes
                  </label>
                  <textarea
                    rows={1}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, message: e.target.value }))
                    }
                    placeholder="Any specific concerns or requests…"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      backgroundColor: "rgba(247,243,238,0.06)",
                      border: "1px solid rgba(247,243,238,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--ivory)",
                      outline: "none",
                      boxSizing: "border-box",
                      resize: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(184,149,106,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(247,243,238,0.15)")
                    }
                  />
                </div>

                {/* Submit */}
                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0.5rem",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    loading={formStatus === "submitting"}
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting"
                      ? "Sending…"
                      : "Request Appointment"}
                  </Button>
                  {formStatus === "error" && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-xs)",
                        color: "var(--error, #e53e3e)",
                      }}
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
