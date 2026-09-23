import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
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
  title: "ThAspect — Moda Também É Perspectiva | Streetwear Oficial",
  description:
    "Identidade visual e e-commerce oficial da ThAspect. Streetwear construída a partir de perspectiva, ângulos, movimento e expressão individual. Find Another Side of You.",
  keywords: [
    "ThAspect",
    "streetwear",
    "moda brasileira",
    "perspectiva",
    "oversized",
    "urban fashion",
    "drop 01",
  ],
  authors: [{ name: "Matheus Sousa (Taiwansz)" }],
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
    images: [
      {
        url: "/brand/templates/website-hero-1440.svg",
        width: 1440,
        height: 900,
        alt: "ThAspect Hero",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1F1F1F] antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
