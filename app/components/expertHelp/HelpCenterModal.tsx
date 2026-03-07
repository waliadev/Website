import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";
import { X } from "lucide-react";

export default function HelpCenterModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) {

  if (!openModal) return null;

  return (
    <div className={styles.modalOverlay}>

      <div className={styles.modal}>

        <div className={styles.modalHeader}>

          <h2>Help Center</h2>

          <button
            className={styles.closeBtn}
            onClick={() => setOpenModal(false)}
          >
            <X size={20} />
          </button>

        </div>

        <p className={styles.modalSub}>
          Find answers to common questions and get support quickly.
        </p>

        <div className={styles.faqList}>

          <div className={styles.faqItem}>
            <h4>How do I find property agents?</h4>
            <p>
              Use the location search to discover verified property agents.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h4>How can I contact an agent?</h4>
            <p>
              Open the agent profile and choose call, chat, or email.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h4>Can I leave reviews?</h4>
            <p>
              Yes. After interacting you can rate and leave feedback.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h4>Is BrokerDash free to use?</h4>
            <p>
              Yes. Users can browse agents and connect without charges.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}