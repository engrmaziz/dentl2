import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dentl Clinic",
};

export default function TermsPage() {
  return (
    <main className="container section-padding">
      <h1 className="font-display" style={{ fontSize: "var(--text-xl)", marginBottom: "2rem" }}>
        Terms of Service
      </h1>
      <div style={{ maxWidth: "800px", lineHeight: "var(--leading-loose)", color: "var(--charcoal)" }}>
        <p style={{ marginBottom: "1.5rem" }}>
          <strong>Last Updated: January 1, 2025</strong>
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          1. Acceptance of Terms
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          By accessing and using the Dentl Clinic website, you accept and agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use our website.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          2. Medical Disclaimer
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          The information provided on this website is for general informational purposes only and does
          not constitute professional medical or dental advice. Always consult with a qualified dental
          professional before making decisions about your oral health. Do not disregard professional
          dental advice because of information you have read on this website.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          3. Appointment Booking
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Online appointment requests are subject to confirmation by our scheduling team. An appointment
          is not confirmed until you receive written confirmation from our office. We reserve the right
          to refuse service to anyone. Cancellations must be made at least 24 hours in advance to avoid
          a cancellation fee.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          4. Intellectual Property
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          All content on this website, including text, graphics, logos, images, and software, is the
          property of Dentl Clinic and is protected by applicable intellectual property laws. You may
          not reproduce, distribute, or create derivative works without our express written permission.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          5. Limitation of Liability
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Dentl Clinic shall not be liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of this website or our services. Our total liability
          shall not exceed the amount paid for the specific service giving rise to the claim.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          6. Governing Law
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          These Terms of Service are governed by the laws of England and Wales. Any disputes arising
          from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          7. Changes to Terms
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We reserve the right to modify these terms at any time. Changes will be effective immediately
          upon posting to the website. Your continued use of the website after changes are posted
          constitutes your acceptance of the modified terms.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          8. Contact
        </h2>
        <p>
          For questions about these Terms, please contact us at legal@dentlclinic.com
        </p>
      </div>
    </main>
  );
}
