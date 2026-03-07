import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";

export default function ExpertHelpHeader() {
  return (
    <div className={styles.header}>

      <h2 style={{color:"#333"}}>How can we help you?</h2>

      <p>
        Connect with our property experts for guidance,
        support, and quick assistance.
      </p>

    </div>
  );
}