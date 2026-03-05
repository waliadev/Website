import styles from "@/app/components/home/styles/AgentCards.module.css";
import { MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function AgentContent({
  agent,
  token,
  isSaved,
  handleBookmark,
  handleCall,
  handleWhatsApp,
}: any) {
  return (
    <div className={styles.content}>
      <div className={styles.textBlock}>
        <h3 className={styles.name}>{agent.name}</h3>
        <p className={styles.agency}>{agent.agency_name}</p>

        <div className={styles.location}>
          <MapPin size={14} />
          <span>{agent.address}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={handleCall} className={styles.callBtn}>
          <FiPhone size={16} />
          Call
        </button>

        <button
          onClick={handleWhatsApp}
          className={styles.whatsappBtn}
        >
          <FaWhatsapp size={16} />
          WhatsApp
        </button>

        {token && (
          <button
            onClick={handleBookmark}
            className={`${styles.saveBtn} ${
              isSaved ? styles.activeSave : ""
            }`}
          >
            {isSaved ? (
              <BsBookmarkFill size={18} />
            ) : (
              <BsBookmark size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}