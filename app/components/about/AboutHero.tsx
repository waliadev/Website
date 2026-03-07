import styles from "@/app/components/about/styles/AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1>About BrokerDash</h1>

        <p>
          Building trust between property seekers
          and verified real estate professionals.
        </p>
      </div>
    </section>
  );
}