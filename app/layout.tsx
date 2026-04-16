import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// sirf layout.tsx me
import "./globals.css";
import ReduxProvider from "./providers";
import GoogleAnalytics from "@/app/analytics/GoogleAnalytics"
import ToastContainer  from "@/app/components/common/ToastContainer"
import FCMProvider from "@/app/FCMProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brokerdash.in"), // 👈 apna domain lagana

  title: "Broker Dash | Smart Brokerage Management Platform",
  description:
    "Broker Dash is a modern, secure, and intelligent brokerage management platform designed to help brokers streamline operations, manage clients efficiently, and grow their business with real-time insights.",

  keywords: [
    "Broker Dashboard",
    "Broker Management",
    "Real Estate CRM",
    "Broker Software",
    "Lead Management",
  ],

  authors: [{ name: "Broker Dash Team" }],

  // ✅ Open Graph
  openGraph: {
    title: "Broker Dash | Smart Brokerage Management Platform",
    description:
      "Manage clients, track leads, and grow your brokerage business with Broker Dash — a modern and secure broker management platform.",
    url: "https://brokerdash.in",
    siteName: "Broker Dash",
    images: [
      {
        url: "/brokerdash.png", // public folder
        width: 1200,
        height: 630,
        alt: "Broker Dash Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Broker Dash | Smart Brokerage Management Platform",
    description:
      "A powerful broker management dashboard to streamline operations, manage clients, and boost business growth.",
    images: ["/brokerdash.png"],
  },

  // ✅ Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Google Analytics */}
        <GoogleAnalytics />
        <ReduxProvider>
          {/* <FCMProvider /> */}
          {children}
          <ToastContainer />

        </ReduxProvider>
      </body>
    </html>
  );
}
