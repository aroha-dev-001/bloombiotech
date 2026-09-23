import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { MotionRoot } from "@/components/MotionRoot";
import { entranceScript } from "@/lib/entrance";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/brand/mark.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/logo.png", width: 907, height: 415 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070a08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plex.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decides the home page entrance before the first paint; see lib/entrance.ts. */}
        <script dangerouslySetInnerHTML={{ __html: entranceScript }} />
      </head>
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <noscript>
          {/* Reveals are JS-driven; without it, show everything immediately. */}
          <style>{`[data-rv]{opacity:1!important;transform:none!important}[data-rv="mask"]::after{display:none!important}`}</style>
        </noscript>
        <MotionRoot>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </MotionRoot>
      </body>
    </html>
  );
}
