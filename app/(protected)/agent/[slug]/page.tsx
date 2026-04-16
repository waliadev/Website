import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import styles from "./AgentDetail.module.css";
import BannerCarousel from "@/app/components/BannerCarousel";
// import AgentProfileCard from "@/app/components/AgentProfileCard";
import ReviewsSection from "@/app/components/ReviewsSection";
import StickyContactSidebar from "@/app/components/StickyContactSidebar";
import { fetchAgentDetail } from "@/store/slices/features/agents/agentListingSlice";
import AgentDetailClient from "@/app/components/AgentProfileCard/AgentDetailClient";

/* ================= TYPES ================= */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type Agent = {
  id: number;
  name: string;
  agency_name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  office_address: string;
  city: string;
  rating: number;
  total_reviews: number;
  verified: boolean;
  status: boolean;
  description: string;
  image_urls: string[];
};

/* ================= DUMMY DATA ================= */

const bannerImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600",
];

const dummyAgent: Agent = {
  id: 1,
  name: "Virat Properties",
  agency_name: "Virat Properties Pvt Ltd",
  phone: "+91 9876543210",
  whatsapp_number: "+91 9876543210",
  email: "virat@property.com",
  office_address: "Sector 62, Noida",
  city: "Noida",
  rating: 5,
  total_reviews: 24,
  verified: true,
  status: true,
  description: "Trusted real estate consultant.",
  image_urls: [],
};

/* ================= PAGE ================= */

export default async function AgentDetailPage({ params }: PageProps) {
  // ✅ await params (IMPORTANT FIX)
  const { slug } = await params;

  console.log("Received slug:", slug);

  // ❌ safety check
  if (!slug) {
    return <div style={{ padding: "40px" }}>Invalid Agent</div>;
  }

  // ✅ safe parsing
  const parts = slug.split("-");
  const agentId = parts.pop();
  const agentName = parts.join(" ");

  console.log("Agent ID:", agentId);
  console.log("Agent Name:", agentName);

  const agent = dummyAgent;

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <BannerCarousel/>

        <div className={styles.wrapper}>
          <div className={styles.left}>
            <AgentDetailClient agentId={Number(agentId)} />
            <ReviewsSection agentId={Number(agentId)} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}