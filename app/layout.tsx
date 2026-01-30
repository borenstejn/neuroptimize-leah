import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neuroptimize - Remédiation Cognitive",
  description: "Plateforme de remédiation cognitive conversationnelle",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-neuro-50 text-deep-900 antialiased selection:bg-synapse-500 selection:text-white">
        {/* Ambient Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-synapse-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter opacity-70"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply filter opacity-70"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-300/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply filter opacity-70"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
