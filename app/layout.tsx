import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ponpes Nurul Ilmi - Pondok Pesantren Modern",
  description: "Pondok Pesantren Nurul Ilmi, mendidik generasi berakhlak mulia dengan pendidikan Islam dan ilmu pengetahuan modern",
  keywords: "pondok pesantren, nurul ilmi, pendidikan islam, boarding school, sekolah islam",
  authors: [{ name: "Ponpes Nurul Ilmi" }],
  openGraph: {
    title: "Ponpes Nurul Ilmi",
    description: "Pondok Pesantren Modern dengan Pendidikan Berkualitas",
    url: "https://ponpesnurulilmi.com",
    siteName: "Ponpes Nurul Ilmi",
    images: [
      {
        url: "/og-image.jpg", // Tambahkan image ini di public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponpes Nurul Ilmi",
    description: "Pondok Pesantren Modern dengan Pendidikan Berkualitas",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable, nunito.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
