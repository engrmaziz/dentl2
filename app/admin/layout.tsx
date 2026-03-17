import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Dentl Clinic",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--ink)", color: "var(--ivory)" }}>
      <aside style={{ width: "240px", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "2rem 1rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold)", marginBottom: "2rem" }}>
          Dentl Admin
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { label: "Dashboard",    href: "/admin/dashboard" },
            { label: "Appointments", href: "/admin/appointments" },
            { label: "Doctors",      href: "/admin/doctors" },
            { label: "Blog",         href: "/admin/blog" },
            { label: "Gallery",      href: "/admin/gallery" },
            { label: "Contacts",     href: "/admin/contacts" },
            { label: "Settings",     href: "/admin/settings" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                color: "var(--ash)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                transition: "background-color 0.2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
