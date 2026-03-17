import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Dentl Clinic | Precision Meets Warmth",
    template: "%s | Dentl Clinic",
  },
  description:
    "A luxury dental clinic where precision meets warmth. Expert cosmetic, restorative, and general dentistry in London.",
  keywords: ["dental clinic", "cosmetic dentistry", "teeth whitening", "dental implants", "London dentist"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Dentl Clinic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased grain-overlay">
        <LenisProvider />
        <CustomCursor />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
