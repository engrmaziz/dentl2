import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentl2",
  description: "Next.js 14 application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
