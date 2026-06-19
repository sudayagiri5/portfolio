import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://sairaghav.dev";

export const metadata: Metadata = {
  title: "Sairaghav Udayagiri — Senior Full-Stack Software Engineer",
  description:
    "Senior Full-Stack Software Engineer building reliable systems at banking scale, and the AI automation layered on top. Five years across telecom, healthcare, and fintech.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Sairaghav Udayagiri — Senior Full-Stack Software Engineer",
    description:
      "Senior Full-Stack Software Engineer building reliable systems at banking scale, and the AI automation layered on top.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sairaghav Udayagiri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sairaghav Udayagiri — Senior Full-Stack Software Engineer",
    description:
      "Senior Full-Stack Software Engineer building reliable systems at banking scale.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sairaghav Udayagiri",
  jobTitle: "Senior Full-Stack Software Engineer",
  url: siteUrl,
  email: "sairaghavuk@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL" },
  sameAs: [
    "https://github.com/sudayagiri5",
    "https://linkedin.com/in/sairaghav-udayagiri-034366140",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
