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
        <h3 className={styles.name}>{agent.agency_name}</h3>
        <p className={styles.agency}>{agent.name}</p>

        <div className={styles.location}>
          <MapPin size={14} />
          <span>{agent.office_address}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={(e) => handleCall(e)} className={styles.callBtn}>
          <FiPhone size={16} />
          Call
        </button>

        <button
          onClick={(e) => handleWhatsApp(e)}
          className={styles.whatsappBtn}
        >
          <FaWhatsapp size={16} />
          WhatsApp
        </button>

        {token && (
          <button
            onClick={(e) => handleBookmark(e)}
            className={`${styles.saveBtn} ${
              isSaved ? styles.activeSave : ""
            }`}
          >
            {isSaved ? (
              <BsBookmarkFill size={18}  color="#ff9800"/>
            ) : (
              <BsBookmark size={18}  color="#aaa"/>
            )}
          </button>
        )}
      </div>
    </div>
  );
}