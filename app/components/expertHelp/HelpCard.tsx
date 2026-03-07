import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";

export default function HelpCard({
  icon,
  title,
  desc,
  action,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className={styles.card}>

      <div className={styles.iconWrap}>{icon}</div>

      <h3 style={{color:"#444"}}>{title}</h3>

      <p style={{color:"#1f2937"}}>{desc}</p>

      <button
        className={styles.actionBtn}
        onClick={onClick}
      >
        {action}
      </button>

    </div>
  );
}