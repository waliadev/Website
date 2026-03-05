"use client";

import styles from "@/app/(protected)/agent/[slug]/AgentDetail.module.css";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function StickyContactSidebar({ agent }: any) {
  return (
    <aside className={styles.right}>
      <div className={styles.stickyCard}>
        <h4>Contact Agent</h4>

        <button className={styles.primaryBtn}>
          <Phone size={18} /> Call Now
        </button>

        <button className={styles.whatsappBtn}>
          <MessageCircle size={18} /> WhatsApp
        </button>
          <button className={styles.whatsappBtn}>
          <MapPin size={18} />google map
        </button>
      </div>
    </aside>
  );
}