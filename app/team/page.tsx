"use client";

import React, { useState } from "react";
import { team } from "@/data/team";
import type { Doctor } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AppointmentModal from "@/components/ui/AppointmentModal";

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid var(--ash)",
        background: "white",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered ? "0 20px 60px rgba(10,22,40,0.14)" : "0 2px 12px rgba(10,22,40,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Gradient avatar */}
      <div
        style={{
          height: "220px",
          background: doctor.image,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "rgba(247,243,238,0.12)",
            border: "2px solid rgba(247,243,238,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true" fill="none" stroke="rgba(247,243,238,0.6)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </div>
        <Badge
          variant="gold"
          size="sm"
          style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
        >
          {doctor.experience} yrs exp
        </Badge>
      </div>

      {/* Content */}
      <div style={{ padding: "1.75rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-md)",
            color: "var(--ink)",
            margin: "0 0 0.25rem",
            lineHeight: "var(--leading-tight)",
          }}
        >
          {doctor.name}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--gold)",
            margin: "0 0 0.25rem",
            fontWeight: 500,
          }}
        >
          {doctor.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "var(--charcoal)",
            margin: "0 0 1rem",
            letterSpacing: "0.04em",
          }}
        >
          {doctor.specialization}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-loose)",
            color: "var(--charcoal)",
            margin: "0 0 1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {doctor.bio[0]}
        </p>
        {/* Languages */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {doctor.languages.map((lang) => (
            <Badge key={lang} variant="mist" size="sm">
              {lang}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Badge variant="gold" size="md" style={{ marginBottom: "1.5rem" }}>
            The Specialists
          </Badge>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: "0 0 1.25rem",
              maxWidth: "600px",
            }}
          >
            Meet Our Expert Team
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "520px",
              margin: 0,
            }}
          >
            Six dedicated specialists, each at the pinnacle of their field, united by a shared
            commitment to exceptional care and outstanding clinical outcomes.
          </p>
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {team.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS STRIP ── */}
      <section style={{ backgroundColor: "var(--mist)", paddingBlock: "clamp(4rem, 8vw, 7rem)" }}>
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
            Our Credentials
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
            Trained at the World&apos;s Best Institutions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              "King's College London",
              "UCL Eastman Dental Institute",
              "Harvard School of Dental Medicine",
              "Guy's Hospital",
              "University of Edinburgh",
              "Paris Descartes University",
              "Karolinska Institute",
              "University of Bern",
            ].map((inst) => (
              <div
                key={inst}
                style={{
                  padding: "1.25rem",
                  background: "white",
                  borderRadius: "4px",
                  border: "1px solid var(--ash)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    color: "var(--ink)",
                    fontWeight: 500,
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  {inst}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          textAlign: "center",
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
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ivory)",
              margin: "0 0 1rem",
            }}
          >
            Book with a Specialist Today
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "440px",
              margin: "0 auto 2.5rem",
              lineHeight: "var(--leading-loose)",
            }}
          >
            Every new patient journey begins with a thorough consultation. Meet your specialist and
            discover your personalised treatment plan.
          </p>
          <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
            Book a Consultation
          </Button>
        </div>
      </section>

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
