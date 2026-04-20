"use client";

import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";
import { motion } from "framer-motion";
import { toggleBookmark, fetchBookmarks } from "@/store/slices/features/bookmark/bookmarkSlice";
import { sendAgentInteraction } from "@/store/slices/features/interactions/interactionSlice";

import { useAppDispatch } from "@/store/hooks";

export default function BookmarkCard({ agent, office }: any) {
  const dispatch = useAppDispatch();

  // 📞 Call
  const handleCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (agent.phone) {
      window.location.href = `tel:${agent.phone}`;
      dispatch(
        sendAgentInteraction({
          agentId: agent.id,
          click_type: "call",
          clicked_from: "browser",
        })
      );
    }

  };

  // 💬 WhatsApp
  const handleWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (agent.whatsapp_number) {
      window.open(`https://wa.me/${agent.whatsapp_number}`, "_blank");
      dispatch(
        sendAgentInteraction({
          agentId: agent.id,
          click_type: "whatsapp",
          clicked_from: "browser",
        })
      );
    }

  };

  // 📍 Location
  const handleLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (agent.latitude && agent.longitude) {
      window.open(
        `https://www.google.com/maps?q=${agent.latitude},${agent.longitude}`,
        "_blank"
      );
      dispatch(
        sendAgentInteraction({
          agentId: agent.id,
          click_type: "map",
          clicked_from: "browser",
        })
      );
    }


  };

  return (
    <motion.div whileHover={{ y: -6 }} className={styles.card}>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={agent.images?.[0] || "/house.jpg"}
          alt="agent"
          className={styles.image}
        />

        {/* ❤️ Bookmark */}
        <button className={styles.bookmark}
          onClick={() => {
            dispatch(toggleBookmark(agent.id));
            dispatch(fetchBookmarks(agent.id));
          }}>
          ❤️
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>

        <h3 className={styles.name}>{agent.name || "Agent Name"}</h3>
        <p className={styles.agency}>{agent.agency_name || "Agency Name"}</p>

        <div className={styles.rating}>
          ⭐ {agent.rating || "4.5"}
        </div>

        <div className={styles.address}>
          📍 {office?.city || office?.address || "Location not available"}
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.actions}>
          <button onClick={(e) => handleCall(e)}>📞</button>
          <button onClick={(e) => handleWhatsApp(e)}>💬</button>
          <button onClick={(e) => handleLocation(e)}>📍</button>
        </div>
      </div>
    </motion.div>
  );
}