import type { Metadata } from "next";
import HeroCanvasLoader from "@/components/three/HeroCanvasLoader";

export const metadata: Metadata = {
  title: "Dentl Clinic | Precision Meets Warmth",
  description: "A luxury dental clinic where precision meets warmth. Expert cosmetic, restorative, and general dentistry in London.",
};

export default function HomePage() {
  return (
    <main>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: "var(--ink)", overflow: "hidden" }}>
        <HeroCanvasLoader />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "80px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>
            London&apos;s Premier Dental Studio
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-hero)", fontWeight: 400, color: "var(--ivory)", lineHeight: "var(--leading-tight)", maxWidth: "800px", marginBottom: "2rem" }}>
            Precision<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>meets warmth.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", color: "rgba(247,243,238,0.7)", lineHeight: "var(--leading-loose)", maxWidth: "480px", marginBottom: "3rem" }}>
            Exceptional dental care crafted with the artistry of a design studio and the rigour of a private clinic.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "0.9rem 2rem", backgroundColor: "var(--gold)", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "2px" }}>
              Book Appointment
            </a>
            <a href="/services" style={{ display: "inline-flex", alignItems: "center", padding: "0.9rem 2rem", border: "1.5px solid rgba(247,243,238,0.3)", color: "var(--ivory)", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "2px" }}>
              Explore Services
            </a>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "var(--mist)", padding: "4rem 0", borderBottom: "1px solid var(--ash)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[{ value: "18+", label: "Years Experience" }, { value: "4,200+", label: "Happy Patients" }, { value: "14", label: "Dental Services" }, { value: "6", label: "Expert Doctors" }].map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--gold)", fontWeight: 400, marginBottom: "0.25rem" }}>{value}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--charcoal)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
