import type { Metadata } from "next";
import Hero from "@/app/components/home/components/Hero";
import HeroBanner from "@/app/components/home/components/HeroBanner";
import AgentCards from "@/app/components/home/components/AgentCards";

export const metadata: Metadata = {
  title: "BrokerDash | Trusted Real Estate Brokers & Property Dealers",

  description:
    "BrokerDash helps you connect with verified real estate brokers, property dealers, and agents who help buy, sell, and rent homes quickly and securely.",

  keywords: [
    "real estate brokers",
    "property dealers",
    "real estate agents",
    "home selling agents",
    "property consultants",
    "buy house",
    "sell house",
    "rent property",
    "BrokerDash",
  ],

  openGraph: {
    title: "BrokerDash | Verified Property Brokers Near You",
    description:
      "Find trusted real estate brokers, dealers and agents to buy, sell or rent your property easily with BrokerDash.",
    url: "https://brokerdash.in",
    siteName: "BrokerDash",
    type: "website",
    images: [
      {
        url: "https://brokerdash.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash - Real Estate Brokers & Dealers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BrokerDash | Trusted Property Dealers & Agents",
    description:
      "Connect with verified real estate brokers and agents who help you sell or buy property faster.",
    images: ["https://brokerdash.in/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://brokerdash.in",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroBanner />
      <AgentCards />
    </>
  );
}