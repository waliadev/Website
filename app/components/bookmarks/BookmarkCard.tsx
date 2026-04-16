"use client";

import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";
import { motion } from "framer-motion";

export default function BookmarkCard({ index, agent }: any) {
  console.log(agent)

  // ✅ handlers
  const handleCall = () => {
    if (agent.phone) {
      window.location.href = `tel:${agent.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (agent.whatsapp_number) {
      window.open(
        `https://wa.me/${agent.whatsapp_number}`,
        "_blank"
      );
    }
  };

  const handleLocation = () => {
    if (agent.latitude && agent.longitude) {
      window.open(
        `https://www.google.com/maps?q=${agent.latitude},${agent.longitude}`,
        "_blank"
      );
    }
  };

  return (
    <motion.div whileHover={{ y: -8 }} className={styles.card}>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={agent.images?.[0] || "/house.jpg"}
          alt="agent"
          className={styles.image}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>

        {/* TITLE + RATING */}
        <div className={styles.headerRow}>
          <h3>{agent.name || "Agent Name"}</h3>

          <span className={styles.rating}>
            ⭐ {agent.rating || "4.5"}
          </span>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>

          {/* CALL */}
          <span onClick={handleCall} title="Call">
            📞
          </span>

          {/* WHATSAPP */}
          <span onClick={handleWhatsApp} title="WhatsApp">
            💬
          </span>



          {/* BOOKMARK */}
          <span title="Saved">
            ❤️
          </span>

          {/* SHARE */}
          <span
            onClick={() =>
              navigator.share?.({
                title: agent.name,
                url: window.location.href,
              })
            }
            title="Share"
          >
            🔗
          </span>
        </div>

        {/* ADDRESS */}
        <div className={styles.address}>
          📍 {agent.city || "Location not available"}
        </div>

      </div>
    </motion.div>
  );
}