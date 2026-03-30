import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Setup Inter untuk Body Text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Setup Plus Jakarta Sans untuk Heading
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "SMK ANALIS KESEHATAN PUSKESAD - Sekolah Menengah Kejuruan Kesehatan",
  description:
    "Portal Terpadu SMK ANALIS KESEHATAN PUSKESAD. Menampilkan profil, e-Library, dan simulasi lab medik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased text-slate-900 bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
