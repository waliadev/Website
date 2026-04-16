import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";

export default function ExpertHelpHeader() {
  return (
<div className={styles.header}>
  <h2 className={styles.title}>
    How can we help you?
  </h2>

  <p className={styles.subtitle}>
    Connect with our property experts for guidance,
    support, and quick assistance.
  </p>
</div>
  );
}