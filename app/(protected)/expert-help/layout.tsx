import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Expert Help | BrokerDash",
  description:
    "Get expert support from BrokerDash. Contact property specialists via call, chat, or email and browse our help center for quick answers.",
  keywords: [
    "BrokerDash support",
    "property agent help",
    "real estate help",
    "property expert assistance",
    "Delhi NCR property agents"
  ],
  openGraph: {
    title: "Expert Help | BrokerDash",
    description:
      "Connect with BrokerDash property experts for quick assistance.",
    url: "https://brokerdash.com/expert-help",
    siteName: "BrokerDash",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash Expert Help",
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

export default function ExpertHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}