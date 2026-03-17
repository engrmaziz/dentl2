"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/gsap";

const FOOTER_LINKS = {
  pages: [
    { label: "Home",     href: "/"         },
    { label: "Services", href: "/services" },
    { label: "About",    href: "/about"    },
    { label: "Team",     href: "/team"     },
    { label: "Gallery",  href: "/gallery"  },
    { label: "Blog",     href: "/blog"     },
    { label: "Contact",  href: "/contact"  },
  ],
  services: [
    { label: "General Dentistry",   href: "/services/general-dentistry"   },
    { label: "Teeth Whitening",     href: "/services/teeth-whitening"     },
    { label: "Dental Implants",     href: "/services/dental-implants"     },
    { label: "Orthodontics",        href: "/services/orthodontics"        },
    { label: "Veneers",             href: "/services/veneers"             },
    { label: "Invisalign",          href: "/services/invisalign"          },
    { label: "Smile Makeover",      href: "/services/smile-makeover"      },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com/dentlclinic", label: "Instagram" },
  { icon: Twitter,   href: "https://twitter.com/dentlclinic",   label: "Twitter"   },
  { icon: Facebook,  href: "https://facebook.com/dentlclinic",  label: "Facebook"  },
  { icon: Linkedin,  href: "https://linkedin.com/company/dentl", label: "LinkedIn" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = sectionRef.current;
    if (!el) return;

    const tween = gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "var(--ink)",
        color: "var(--ivory)",
        overflow: "hidden",
      }}
      role="contentinfo"
    >
      {/* Decorative "SMILE" text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 14vw, 160px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px var(--gold)",
          opacity: 0.06,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.2em",
          lineHeight: 1,
        }}
      >
        SMILE
      </div>

      {/* Main grid */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 400,
                color: "var(--ivory)",
                marginBottom: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              Dentl
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "rgba(247,243,238,0.6)",
                lineHeight: "var(--leading-loose)",
                maxWidth: "220px",
                marginBottom: "1.5rem",
              }}
            >
              Precision meets warmth. Exceptional dental care crafted with artistry and compassion.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(247,243,238,0.2)",
                    color: "rgba(247,243,238,0.6)",
                    transition: "all 0.3s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "var(--gold)";
                    el.style.borderColor = "var(--gold)";
                    el.style.color = "var(--ink)";
                    el.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "transparent";
                    el.style.borderColor = "rgba(247,243,238,0.2)";
                    el.style.color = "rgba(247,243,238,0.6)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Pages column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Pages
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {FOOTER_LINKS.pages.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "rgba(247,243,238,0.65)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(247,243,238,0.65)"; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Services
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {FOOTER_LINKS.services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "rgba(247,243,238,0.65)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(247,243,238,0.65)"; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <MapPin size={14} style={{ marginTop: "3px", color: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "rgba(247,243,238,0.65)", lineHeight: "var(--leading-normal)" }}>
                  123 Harley Street<br />London, W1G 9QR
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Phone size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <a
                  href="tel:+442071234567"
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "rgba(247,243,238,0.65)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(247,243,238,0.65)"; }}
                >
                  +44 20 7123 4567
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Mail size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <a
                  href="mailto:hello@dentlclinic.com"
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "rgba(247,243,238,0.65)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(247,243,238,0.65)"; }}
                >
                  hello@dentlclinic.com
                </a>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "rgba(247,243,238,0.4)", lineHeight: "var(--leading-loose)" }}>
                  Mon–Fri: 8:00 – 19:00<br />
                  Sat: 9:00 – 16:00<br />
                  Sun: Closed
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with gold divider */}
        <div
          style={{
            borderTop: "1px solid var(--gold)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "rgba(247,243,238,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} Dentl Clinic. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy",   href: "/privacy" },
              { label: "Terms of Service", href: "/terms"   },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: "rgba(247,243,238,0.4)",
                  transition: "color 0.2s",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(247,243,238,0.4)"; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
