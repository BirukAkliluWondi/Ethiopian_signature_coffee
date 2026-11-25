import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ethiopiansignature.com"
  ),
  title: {
    default: "ETHIOPIAN SIGNATURE COFFEE | Beyond Coffee, Building Coffee Businesses",
    template: "%s | Ethiopian Signature Coffee",
  },
  description:
    "Discover the Excellence of Ethiopian Coffee. Turnkey specialty café setup, barista certification, hospitality business consultancy, luxury event catering, and direct-trade highland origins in Addis Ababa.",
  keywords: [
    "Ethiopian Signature Coffee",
    "Addis Ababa coffee consultancy",
    "turnkey coffee shop setup Ethiopia",
    "barista academy Addis Ababa",
    "specialty coffee catering Ethiopia",
    "Yirgacheffe Sidama Guji Harrar direct trade",
  ],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ethiopian Signature Coffee",
    title: "ETHIOPIAN SIGNATURE COFFEE | Beyond Coffee, Building Coffee Businesses",
    description:
      "Turnkey specialty café setup, barista academy certification, menu engineering, luxury catering, and direct-trade Ethiopian origins from Addis Ababa.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Ethiopian Signature Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ETHIOPIAN SIGNATURE COFFEE | Beyond Coffee, Building Coffee Businesses",
    description:
      "Turnkey café execution, barista certification, commercial consultancy, and direct-trade Ethiopian coffee.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  viewportFit: "cover",
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ethiopian Signature Coffee",
  alternateName: "ETHIOPIAN SIGNATURE COFFEE PLC",
  description:
    "Turnkey café execution, specialty barista certification, business consultancy, luxury event catering, and direct-trade highland coffee allocations.",
  telephone: "+251925451711",
  email: "advisory@ethiopiansignature.com",
  logo: "/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atlas District, Bole Sub-City",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  openingHours: "Mo-Sa 08:30-18:30",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${ebGaramond.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-white text-text-main font-sans antialiased flex flex-col min-h-screen selection:bg-brand-green selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
