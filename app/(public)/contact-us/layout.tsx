import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Support | BrokerDash",
  description:
    "Contact BrokerDash support team for assistance with property agents, listings, and services.",
  keywords: [
    "BrokerDash contact",
    "property agent support",
    "real estate help",
    "BrokerDash customer care",
    "Delhi NCR property support"
  ],

  openGraph: {
    title: "Contact Support | BrokerDash",
    description:
      "Reach out to BrokerDash for property support and assistance.",
    url: "https://brokerdash.com/contact",
    siteName: "BrokerDash",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash Contact",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}