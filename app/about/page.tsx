"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AppointmentModal from "@/components/ui/AppointmentModal";
import { useState } from "react";

const values = [
  {
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    title: "Clinical Excellence",
    description:
      "We hold ourselves to the highest clinical standards, investing in continuous education and the latest evidence-based techniques to deliver outcomes that consistently exceed expectations.",
  },
  {
    icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    title: "Genuine Warmth",
    description:
      "Dentistry is deeply personal. We create a calm, unhurried environment where every patient feels genuinely cared for — not processed. Your comfort and confidence are our priority at every visit.",
  },
  {
    icon: "M1 6s2-2 6-2 8 4 12 4 6-2 6-2V2s-2 2-6 2-8-4-12-4-6 2-6 2v4M1 22V6M23 22V6M1 14s2-2 6-2 8 4 12 4 6-2 6-2",
    title: "Minimal Intervention",
    description:
      "We believe in doing as little as necessary to achieve the best possible result. Preserving natural tooth structure and avoiding unnecessary treatment are core principles of our practice philosophy.",
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    title: "Patient Trust",
    description:
      "We earn trust through transparency — honest treatment planning, clear pricing, and always putting your long-term oral health above short-term commercial considerations.",
  },
];

const milestones = [
  { year: "2007", event: "Dentl founded by Dr. Sophia Harrington on Harley Street" },
  { year: "2010", event: "Expanded to full specialist team with oral surgery and orthodontics" },
  { year: "2014", event: "Launched digital smile design suite with 3D treatment previews" },
  { year: "2018", event: "Awarded 'Best Dental Practice in London' by Dental Excellence Awards" },
  { year: "2021", event: "Opened new paediatric dentistry suite with sensory-friendly design" },
  { year: "2024", event: "Celebrated 10,000+ successful smile transformations" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-anim"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "ease.smooth", delay: 0.1 }
    );
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(6rem, 12vw, 10rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(184,149,106,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container" ref={heroRef}>
          <Badge variant="gold" size="md" className="hero-anim" style={{ marginBottom: "1.5rem" }}>
            Our Story
          </Badge>
          <h1
            className="hero-anim"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: "0 0 1.5rem",
              maxWidth: "700px",
            }}
          >
            Where Precision Meets Warmth
          </h1>
          <p
            className="hero-anim"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "580px",
              margin: "0 0 2.5rem",
            }}
          >
            Since 2007, Dentl has been London&apos;s destination for dentistry that combines world-class
            clinical outcomes with a genuinely human touch. We believe exceptional dental care changes
            lives — and we prove it every day.
          </p>
          <div className="hero-anim" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
              Book a Consultation
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/team">
              Meet the Team
            </Button>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
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
            Our Mission
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ink)",
              margin: "0 0 2rem",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Dentistry That Transforms Lives
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "var(--charcoal)",
              marginBottom: "1.5rem",
            }}
          >
            Dr. Sophia Harrington founded Dentl with a singular conviction: that dental care should be
            something patients look forward to, not dread. Having trained in London, Zurich, and Milan,
            she brought together the best of European clinical tradition and fused it with the warmth
            and accessibility she felt was missing from premium dentistry.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "var(--charcoal)",
            }}
          >
            Today, Dentl is home to a team of six specialist clinicians, each one chosen not only for
            their clinical excellence but for their exceptional ability to connect with patients. Our
            practice on Harley Street combines the latest dental technology with an environment
            designed to feel calm, elegant, and reassuring — because we believe the space in which
            care is delivered matters as much as the care itself.
          </p>
          <div
            style={{ width: "60px", height: "1px", background: "var(--gold)", margin: "2.5rem 0 0" }}
          />
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ backgroundColor: "var(--mist)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
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
            What Drives Us
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ink)",
              margin: "0 0 3rem",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Our Core Values
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "4px",
                  padding: "2rem",
                  border: "1px solid var(--ash)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(184,149,106,0.1)",
                    border: "1px solid rgba(184,149,106,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={v.icon} />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-md)",
                    color: "var(--ink)",
                    margin: "0 0 0.75rem",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--leading-loose)",
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
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
            Our Journey
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ivory)",
              margin: "0 0 3.5rem",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Milestones
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                  paddingBottom: i < milestones.length - 1 ? "2.5rem" : 0,
                  borderLeft: "1px solid rgba(184,149,106,0.3)",
                  paddingLeft: "2rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-7px",
                    top: "4px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-sm)",
                      color: "var(--gold)",
                      margin: "0 0 0.35rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {m.year}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      lineHeight: "var(--leading-normal)",
                      color: "rgba(247,243,238,0.75)",
                      margin: 0,
                    }}
                  >
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)", textAlign: "center" }}>
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
              color: "var(--ink)",
              margin: "0 0 1rem",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Experience the Dentl Difference
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "var(--charcoal)",
              maxWidth: "500px",
              margin: "0 auto 2.5rem",
              lineHeight: "var(--leading-loose)",
            }}
          >
            Book a consultation and discover why thousands of patients trust Dentl for the care
            that matters most.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
              Book Appointment
            </Button>
            <Button variant="ghost" size="lg" as="a" href="/team">
              Meet Our Dentists
            </Button>
          </div>
        </div>
      </section>

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
