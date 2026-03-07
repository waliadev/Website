import styles from "./styles/Privacy.module.css";

export default function PrivacyHero({
  title,
}: {
  title?: string;
}) {
  return (
    <section className={styles.hero}>

      <div className={styles.overlay} />

      <div className={styles.heroContent}>
        <h1>{title || "Privacy Policy"}</h1>

        <p>
          Your privacy is important to us. Learn how we
          collect and protect your information.
        </p>
      </div>

    </section>
  );
}