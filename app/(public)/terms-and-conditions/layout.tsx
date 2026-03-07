import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions | BrokerDash",
  description:
    "Read the terms and conditions for using BrokerDash services and platform.",
  keywords: [
    "BrokerDash terms",
    "BrokerDash conditions",
    "real estate platform rules",
    "property platform terms",
    "BrokerDash legal"
  ],

  openGraph: {
    title: "Terms & Conditions | BrokerDash",
    description:
      "Understand the terms and conditions for using BrokerDash services.",
    url: "https://brokerdash.com/terms-and-conditions",
    siteName: "BrokerDash",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash Terms and Conditions",
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

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}