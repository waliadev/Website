import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import styles from "./AgentDetail.module.css";
import BannerCarousel from "@/app/components/BannerCarousel";
import AgentProfileCard from "@/app/components/AgentProfileCard";
import ReviewsSection from "@/app/components/ReviewsSection";
import StickyContactSidebar from "@/app/components/StickyContactSidebar";

/* ================= TYPES ================= */

interface PageProps {
  params: {
    slug: string;
  };
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

/* ================= STATIC DATA (TEMP) ================= */

const bannerImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600",
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
  rating: 5.0,
  total_reviews: 24,
  verified: true,
  status: true,
  description:
    "Trusted real estate consultant specializing in residential and commercial properties.",
  image_urls: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  ],
};

/* ================= PAGE ================= */

export default function AgentDetailPage({ params }: PageProps) {
  const slug = params.slug;

  /* 🔥 Extract ID & Name */
  const parts = slug.split("-");
  const agentId = parts.pop(); // last = id
  const agentName = parts.join(" ");

  console.log("Slug:", slug);
  console.log("Agent ID:", agentId);
  console.log("Agent Name:", agentName);

  /* 🔥 API CALL (future) */
  // const agent = await getAgentById(agentId);

  const agent = dummyAgent; // temporary

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        {/* Banner */}
        <BannerCarousel images={bannerImages} agent={agent} />

        <div className={styles.wrapper}>
          {/* LEFT CONTENT */}
          <div className={styles.left}>
            <AgentProfileCard agent={agent} />
            <ReviewsSection />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className={styles.right}>
            <StickyContactSidebar agent={agent} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}