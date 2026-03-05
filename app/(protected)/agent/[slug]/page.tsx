"use client";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import styles from "./AgentDetail.module.css";
import BannerCarousel from "@/app/components/BannerCarousel";
import AgentProfileCard from "@/app/components/AgentProfileCard";
import ReviewsSection from "@/app/components/ReviewsSection";
import StickyContactSidebar from "@/app/components/StickyContactSidebar";

/* ===== STATIC DATA ===== */

const bannerImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80",
];

const agent = {
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
    "Trusted real estate consultant specializing in residential and commercial properties across Noida and Delhi NCR.",

  // ⭐ MULTIPLE IMAGES
  image_urls: [
    "https://www.adanirealty.com/-/media/project/realty/blogs/types-of-residential-properties.ashx",
    "https://www.adanirealty.com/-/media/project/realty/commercial/gurugram/miracle-mile/carousel-images/outdoor/miracle-mile2.ashx",
    "https://www.adanirealty.com/-/media/project/realty/commercial/mumbai/inspire-bkc/outdoor/elevation.ashx",
  ],
};


interface PageProps {
  params: {
    id: string;
  };
}

export default function AgentDetailPage({}) {
  return (
    <>
    <Navbar/>
    <div className={styles.page}>
      <BannerCarousel images={bannerImages} agent={agent} />

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <AgentProfileCard agent={agent} />
          <ReviewsSection />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}