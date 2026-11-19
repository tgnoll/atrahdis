import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer, TombolWA } from "@/components/layout/Footer";
import { Header, TopBar } from "@/components/layout/Header";
import { JsonLd, schemaUsaha } from "@/components/seo/JsonLd";
import { Pelacak } from "@/components/seo/Pelacak";
import { site, siteLive } from "@/content/site";
import "./globals.css";

// Plus Jakarta Sans di-host sendiri (lisensi OFL) supaya build tidak bergantung pada Google Fonts.
const jakarta = localFont({
  variable: "--font-jakarta",
  src: [
    { path: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jasa Pengurusan SBU dan SKK Konstruksi | Atrahdis",
    template: "%s | Atrahdis",
  },
  description:
    "Jasa pembuatan SBU konstruksi K, M, B, perpanjangan SBU, dan SKK tenaga ahli. Berkas diaudit sebelum diajukan ke LPJK. Konsultasi gratis.",
  // Selama preview: jangan diindeks Google (hindari duplikat dengan atrahdis.id).
  robots: siteLive ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: "/images/logo-atrahdis.png" },
  openGraph: {
    siteName: site.brand,
    locale: "id_ID",
    type: "website",
    images: ["/images/hero-konsultasi.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={schemaUsaha} />
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TombolWA />
        <Pelacak />
      </body>
    </html>
  );
}
