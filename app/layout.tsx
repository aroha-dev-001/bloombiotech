import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { EnquiryPulse } from "@/components/EnquiryPulse";
import { MotionRoot } from "@/components/MotionRoot";
import { site } from "@/lib/site";

const news = Newsreader({
  variable: "--font-news",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: {
    default: `${site.name} - ${site.tagline}`,
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${news.variable} ${plex.variable} ${plexMono.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-paper text-ink antialiased"
        suppressHydrationWarning
      >
        <MotionRoot>
          <Header />
          <main className="flex-1 pb-24 sm:pb-8">{children}</main>
          <Footer />
          <ChatWidget />
          <EnquiryPulse />
        </MotionRoot>
      </body>
    </html>
  );
}
