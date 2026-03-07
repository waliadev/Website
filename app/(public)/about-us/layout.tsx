import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us | BrokerDash",
  description:
    "Learn about BrokerDash and how we connect property seekers with verified real estate professionals.",
  keywords: [
    "BrokerDash",
    "real estate platform",
    "property agents",
    "verified property dealers",
    "Delhi NCR property agents"
  ],

  openGraph: {
    title: "About Us | BrokerDash",
    description:
      "Discover BrokerDash and how we help users connect with trusted real estate agents.",
    url: "https://brokerdash.com/about",
    siteName: "BrokerDash",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About BrokerDash",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}