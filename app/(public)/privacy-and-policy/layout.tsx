import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | BrokerDash",
  description:
    "Read BrokerDash privacy policy to understand how we collect, use, and protect your information.",
  keywords: [
    "BrokerDash privacy policy",
    "data protection",
    "real estate platform privacy",
    "user data security",
    "BrokerDash privacy"
  ],

  openGraph: {
    title: "Privacy Policy | BrokerDash",
    description:
      "Understand how BrokerDash protects your personal information.",
    url: "https://brokerdash.com/privacy-policy",
    siteName: "BrokerDash",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash Privacy Policy",
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}