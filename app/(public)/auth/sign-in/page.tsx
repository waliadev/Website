

import type { Metadata } from "next";
import LoginPage from "@/app/components/auth/";



export const metadata: Metadata = {
  title: "Login | BrokerDash - Real Estate Brokers Platform",

  description:
    "Login to BrokerDash to connect with verified property dealers, brokers, and real estate agents. Manage listings, track leads, and grow your real estate business.",

  keywords: [
    "BrokerDash login",
    "real estate broker login",
    "property dealer login",
    "real estate agent dashboard",
    "broker account login",
  ],

  alternates: {
    canonical: "https://brokerdash.in/login",
  },

  openGraph: {
    title: "Login | BrokerDash",
    description:
      "Access your BrokerDash account to manage property listings and connect with clients.",
    url: "https://brokerdash.in/login",
    siteName: "BrokerDash",
    type: "website",
    images: [
      {
        url: "https://brokerdash.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash - Real Estate Brokers Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Login | BrokerDash",
    description:
      "Sign in to your BrokerDash account to manage property listings and connect with buyers.",
    images: ["https://brokerdash.in/og-image.jpg"],
  },

  robots: {
    index: false,  // 🔥 Login page ko index nahi karna chahiye
    follow: false,
    nocache: true,
  },
};

export default function Page() {
  return <LoginPage />;
}