import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HideOnAntigo } from "@/components/HideOnAntigo";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thaspect.vercel.app"),
  title: {
    default: "ThAspect — Moda Também É Perspectiva | Streetwear Oficial",
    template: "%s | ThAspect",
  },
  description:
    "Streetwear autoral brasileiro construído a partir de perspectiva, ângulos, movimento e expressão individual. Find Another Side of You.",
  keywords: ["ThAspect", "streetwear", "moda brasileira", "perspectiva", "oversized", "urban fashion", "drop 01"],
  authors: [{ name: "Matheus Sousa (Taiwansz)" }],
  creator: "ThAspect",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "ThAspect — Moda Também É Perspectiva",
    description: "Streetwear construída a partir de perspectiva, ângulos e movimento.",
    url: "https://thaspect.vercel.app",
    siteName: "ThAspect",
    images: [{ url: "/products/hero-lifestyle.jpg", width: 1440, height: 900, alt: "Campanha ThAspect" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThAspect — Moda Também É Perspectiva",
    description: "Find Another Side of You.",
    images: ["/products/hero-lifestyle.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1F1F1F] antialiased">
        <CartProvider>
          <ScrollReveal />
          <HideOnAntigo>
            <Header />
            <CartDrawer />
          </HideOnAntigo>
          <main className="flex-1">{children}</main>
          <HideOnAntigo>
            <Footer />
          </HideOnAntigo>
        </CartProvider>
      </body>
    </html>
  );
}
