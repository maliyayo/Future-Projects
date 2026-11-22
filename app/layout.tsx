import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { InquiryProvider } from "@/components/inquiry";
import { site } from "@/lib/site";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Infinity Athletic Group | Boutique Sports Representation · Miami", template: "%s | Infinity Athletic Group" },
  description:
    "Infinity Athletic Group (IAG) is a Miami-based boutique sports agency led by Shaheed Samuel: contract negotiation, brand architecture, community legacy and post-career wealth infrastructure.",
  openGraph: { type: "website", siteName: site.name, images: ["/img/line-under-lights.webp"] },
  icons: { icon: "/img/iag-logo.png" },
};

export const viewport: Viewport = { themeColor: "#09090B", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: site.name,
    alternateName: site.short,
    url: site.url,
    email: site.email,
    founder: { "@type": "Person", name: site.founder },
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
  };
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-obsidian">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <InquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </InquiryProvider>
      </body>
    </html>
  );
}
