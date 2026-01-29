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
      <body>{children}</body>
    </html>
  );
}
