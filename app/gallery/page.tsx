"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AppointmentModal from "@/components/ui/AppointmentModal";

const categories = ["All", "Smile Makeovers", "Veneers", "Implants", "Whitening", "Orthodontics"];

const galleryItems = [
  { id: 1, category: "Smile Makeovers", label: "Complete Smile Transformation", treatment: "Smile Makeover", gradient: "linear-gradient(135deg, #B8956A 0%, #0A1628 100%)" },
  { id: 2, category: "Veneers", label: "Porcelain Veneers", treatment: "6 Upper Veneers", gradient: "linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)" },
  { id: 3, category: "Implants", label: "Dental Implant", treatment: "Single Implant Crown", gradient: "linear-gradient(135deg, #2E7D5E 0%, #0A1628 100%)" },
  { id: 4, category: "Whitening", label: "Professional Whitening", treatment: "In-Chair Whitening", gradient: "linear-gradient(135deg, #E8C882 0%, #B8956A 100%)" },
  { id: 5, category: "Orthodontics", label: "Invisalign Treatment", treatment: "Invisalign Full", gradient: "linear-gradient(135deg, #1a3a5c 0%, #B8956A 100%)" },
  { id: 6, category: "Veneers", label: "Composite Bonding", treatment: "Full Upper Arch", gradient: "linear-gradient(135deg, #7B4F9E 0%, #0A1628 100%)" },
  { id: 7, category: "Smile Makeovers", label: "Hollywood Smile", treatment: "Veneers + Whitening", gradient: "linear-gradient(135deg, #B8956A 0%, #7B4F9E 100%)" },
  { id: 8, category: "Implants", label: "Full Arch Restoration", treatment: "All-on-4 Implants", gradient: "linear-gradient(135deg, #0A1628 0%, #2E7D5E 100%)" },
  { id: 9, category: "Orthodontics", label: "Fixed Braces Result", treatment: "Traditional Braces", gradient: "linear-gradient(135deg, #1a3a5c 0%, #2E7D5E 100%)" },
  { id: 10, category: "Whitening", label: "Home Whitening Kit", treatment: "Custom Tray Whitening", gradient: "linear-gradient(135deg, #E8C882 0%, #1a3a5c 100%)" },
  { id: 11, category: "Smile Makeovers", label: "Gum Contouring", treatment: "Crown Lengthening", gradient: "linear-gradient(135deg, #B8956A 0%, #2E7D5E 100%)" },
  { id: 12, category: "Veneers", label: "Minimal Veneers", treatment: "4 No-Prep Veneers", gradient: "linear-gradient(135deg, #2E7D5E 0%, #7B4F9E 100%)" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

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
            Patient Transformations
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
            Results That Speak
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "500px",
              margin: 0,
            }}
          >
            Browse a selection of our patient transformations. Every result shown is a real Dentl
            patient, treated by our specialist team.
          </p>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container">
          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  padding: "0.5rem 1.1rem",
                  borderRadius: "100px",
                  border: activeCategory === cat ? "1px solid var(--gold)" : "1px solid var(--ash)",
                  background: activeCategory === cat ? "var(--gold)" : "transparent",
                  color: activeCategory === cat ? "var(--ink)" : "var(--charcoal)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
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
            Ready for Your Transformation?
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
            Book a consultation and let our team design your ideal smile using our digital
            preview technology.
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

function GalleryCard({ item }: { item: (typeof galleryItems)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid var(--ash)",
        cursor: "pointer",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered ? "0 20px 50px rgba(10,22,40,0.16)" : "0 2px 12px rgba(10,22,40,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          height: "240px",
          background: item.gradient,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true" fill="none" stroke="rgba(247,243,238,0.25)" strokeWidth="0.8" strokeLinecap="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <Badge
          variant="gold"
          size="sm"
          style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
        >
          {item.category}
        </Badge>
      </div>
      <div style={{ padding: "1.25rem", background: "white" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-md)",
            color: "var(--ink)",
            margin: "0 0 0.25rem",
            lineHeight: "var(--leading-tight)",
          }}
        >
          {item.label}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--charcoal)",
            margin: 0,
          }}
        >
          {item.treatment}
        </p>
      </div>
    </div>
  );
}
