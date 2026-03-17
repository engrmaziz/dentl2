import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dentl Clinic",
};

export default function PrivacyPage() {
  return (
    <main className="container section-padding">
      <h1 className="font-display" style={{ fontSize: "var(--text-xl)", marginBottom: "2rem" }}>
        Privacy Policy
      </h1>
      <div style={{ maxWidth: "800px", lineHeight: "var(--leading-loose)", color: "var(--charcoal)" }}>
        <p style={{ marginBottom: "1.5rem" }}>
          <strong>Last Updated: January 1, 2025</strong>
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          1. Information We Collect
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We collect information you provide directly to us, such as when you schedule an appointment,
          fill out a contact form, or communicate with our staff. This may include your name, email address,
          phone number, date of birth, insurance information, and medical/dental history.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          2. How We Use Your Information
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We use the information we collect to provide, maintain, and improve our services, process
          appointments and transactions, send you technical notices and support messages, respond to your
          comments and questions, and comply with legal obligations including HIPAA requirements.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          3. HIPAA Compliance
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          As a dental healthcare provider, we are subject to the Health Insurance Portability and
          Accountability Act (HIPAA). We maintain appropriate administrative, physical, and technical
          safeguards to protect the privacy and security of your protected health information (PHI).
          We will not use or disclose your PHI except as permitted or required by HIPAA.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          4. Information Sharing
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We do not sell, trade, or rent your personal information to third parties. We may share your
          information with trusted service providers who assist us in operating our website, conducting
          our business, or servicing you, provided those parties agree to keep this information confidential.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          5. Data Security
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We implement industry-standard security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction. All data transmissions are
          encrypted using SSL/TLS technology.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          6. Cookies
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Our website uses cookies to enhance your browsing experience. You can instruct your browser
          to refuse all cookies or to indicate when a cookie is being sent. However, some features of
          our website may not function properly without cookies.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          7. Your Rights
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          You have the right to access, update, or delete your personal information. You may also
          request a copy of your records, request corrections, or file a complaint regarding our
          privacy practices by contacting us at privacy@dentlclinic.com.
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", marginBottom: "1rem" }}>
          8. Contact Us
        </h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:<br />
          <strong>Dentl Clinic</strong><br />
          123 Harley Street, London W1G 9QR<br />
          Email: privacy@dentlclinic.com<br />
          Phone: +44 20 7123 4567
        </p>
      </div>
    </main>
  );
}
