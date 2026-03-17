"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { registerGSAP } from "@/lib/gsap";
import { useAppStore } from "@/store";
import { magneticHover } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Team",     href: "/team"     },
  { label: "Gallery",  href: "/gallery"  },
  { label: "Blog",     href: "/blog"     },
  { label: "Contact",  href: "/contact"  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Local state drives GSAP animations synchronously; Zustand propagates to other consumers.
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamRef = useRef<HTMLButtonElement>(null);
  const { setMenuOpen: setStoreMenuOpen } = useAppStore();

  // ── Scroll detection ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change ──────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
    setStoreMenuOpen(false);
  }, [pathname, setStoreMenuOpen]);

  // ── Magnetic CTA ────────────────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    if (!ctaRef.current) return;
    return magneticHover(ctaRef.current, 0.4);
  }, []);

  // ── Mobile menu animation ───────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (menuOpen) {
      const links = menu.querySelectorAll<HTMLElement>(".mobile-nav-item");
      gsap.set(menu, { display: "flex", opacity: 0, y: -20 });
      gsap.to(menu, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      gsap.from(links, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (menu) menu.style.display = "none";
        },
      });
    }
  }, [menuOpen]);

  const handleMenuToggle = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    setStoreMenuOpen(next);
  };

  // ── Styles ──────────────────────────────────────────────────────────────
  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "background-color 0.4s, box-shadow 0.4s, backdrop-filter 0.4s",
    backgroundColor: scrolled ? "var(--ivory)" : "transparent",
    boxShadow: scrolled ? "0 1px 20px rgba(10,22,40,0.06)" : "none",
    backdropFilter: scrolled ? "blur(12px)" : "none",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "1.5rem",
    fontWeight: 400,
    color: scrolled ? "var(--ink)" : "var(--ivory)",
    letterSpacing: "0.05em",
    transition: "color 0.4s",
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-xs)",
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: scrolled ? "var(--charcoal)" : "var(--ivory)",
    transition: "color 0.4s",
    position: "relative",
    padding: "0.25rem 0",
  };

  const ctaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.6rem 1.4rem",
    borderRadius: "2px",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-xs)",
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    border: `1.5px solid ${scrolled ? "var(--gold)" : "var(--ivory)"}`,
    backgroundColor: scrolled ? "var(--gold)" : "transparent",
    color: scrolled ? "var(--ink)" : "var(--ivory)",
    transition: "all 0.4s",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <header style={navStyle} role="banner">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={logoStyle} aria-label="Dentl Clinic — Home">
            Dentl
          </Link>

          {/* Desktop nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            aria-label="Main navigation"
            className="hidden-mobile"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  style={linkStyle}
                  aria-current={isActive ? "page" : undefined}
                  className="nav-link"
                >
                  {label}
                  {/* Animated underline */}
                  <span
                    className="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      backgroundColor: "var(--gold)",
                      transformOrigin: "left",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s cubic-bezier(0.25,0,0.25,1)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Active dot */}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "var(--gold)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            ref={ctaRef}
            href="/contact"
            style={ctaStyle}
            className="hidden-mobile"
            aria-label="Book an appointment"
          >
            Book Appointment
          </Link>

          {/* Hamburger button */}
          <button
            ref={hamRef}
            onClick={handleMenuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="show-mobile"
            style={{
              display: "none",
              padding: "0.5rem",
              color: scrolled ? "var(--ink)" : "var(--ivory)",
              background: "none",
              border: "none",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 99,
          backgroundColor: "var(--ink)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="mobile-nav-item"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ivory)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onClick={() => {
              setMenuOpen(false);
              setStoreMenuOpen(false);
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mobile-nav-item"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            border: "1.5px solid var(--gold)",
            color: "var(--gold)",
            padding: "0.75rem 2rem",
            marginTop: "1rem",
          }}
          onClick={() => {
            setMenuOpen(false);
            setStoreMenuOpen(false);
          }}
        >
          Book Appointment
        </Link>
      </div>

      {/* Nav hover styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        .nav-link:hover .nav-underline {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
}
