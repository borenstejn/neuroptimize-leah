import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 antialiased">
        {children}
      </body>
    </html>
  );
}
