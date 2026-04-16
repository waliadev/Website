import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import styles from "./AgentDetail.module.css";
import BannerCarousel from "@/app/components/BannerCarousel";
import ReviewsSection from "@/app/components/ReviewsSection";
import AgentDetailClient from "@/app/components/AgentProfileCard/AgentDetailClient";

/* ================= TYPES ================= */

interface PageProps {
  params: {
    slug: string;
  };
}

/* ================= PAGE ================= */

export default async function AgentDetailPage({ params }: PageProps) {
  const { slug } = params;

  // ❌ safety check
  if (!slug) {
    return <div style={{ padding: "40px" }}>Invalid Agent</div>;
  }

  // ✅ slug parsing
  const parts = slug.split("-");
  const agentId = parts.pop();

  if (!agentId) {
    return <div style={{ padding: "40px" }}>Invalid Agent ID</div>;
  }

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        {/* ✅ FIXED (NO PROPS) */}
        <BannerCarousel />

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