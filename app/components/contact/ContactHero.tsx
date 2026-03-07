import styles from "./styles/Contact.module.css";

export default function ContactHero({
  title,
}: {
  title?: string;
}) {
  return (
    <section className={styles.hero}>

      <div className={styles.overlay} />

      <div className={styles.heroContent}>
        <h1>{title || "Contact Support"}</h1>

        <p>
          Our team is here to assist you. Reach out anytime.
        </p>
      </div>

    </section>
  );
}