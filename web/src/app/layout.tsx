import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bangladesh-youth-nuclear-congress.netlify.app"),
  title: "BYNC — Bangladesh Youth Nuclear Congress",
  description:
    "Bangladesh's first youth-led nuclear organisation and official National Partner of IYNC. Home of Innovation for Nuclear (I4N) Bangladesh 2026.",
  openGraph: {
    title: "Bangladesh Youth Nuclear Congress (BYNC)",
    description:
      "Bangladesh's first youth-led nuclear organisation · Official National Partner of IYNC (49th member nation).",
    images: ["/assets/bync-banner.jpg"],
    type: "website",
  },
  icons: { icon: "/assets/bync-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-silver antialiased">
        <div className="grain" aria-hidden />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
