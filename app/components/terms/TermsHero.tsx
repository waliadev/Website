import styles from "./styles/Terms.module.css";

export default function TermsHero({
  title,
}: {
  title?: string;
}) {
  return (
    <section className={styles.hero}>

      <div className={styles.overlay} />

      <div className={styles.heroContent}>
        <h1>{title || "Terms & Conditions"}</h1>

        <p>
          Please read these terms carefully before using BrokerDash services.
        </p>
      </div>

    </section>
  );
}