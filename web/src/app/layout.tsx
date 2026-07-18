import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Backdrop from "@/components/Backdrop";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Update this to the final custom domain once it's connected.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byncbd.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BYNC — Bangladesh Youth Nuclear Congress",
  description:
    "Bangladesh's first young-generation-led nuclear organisation and official Young Generation Network (YGN) of IYNC. Home of Innovation for Nuclear (I4N) Bangladesh 2026.",
  openGraph: {
    title: "Bangladesh Youth Nuclear Congress (BYNC)",
    description:
      "Bangladesh's first young-generation-led nuclear organisation · Official Young Generation Network (YGN) of IYNC (49th member nation).",
    images: ["/assets/bync-banner.jpg"],
    type: "website",
  },
  icons: { icon: "/assets/bync-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg text-silver antialiased">
        <Backdrop />
        <div className="grain" aria-hidden />
        <ScrollProgress />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
