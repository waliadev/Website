import styles from "@/app/components/home/styles/HeroBanner.module.css";

export default function BannerContent({ title }: any) {
  return (
    <div className={styles.heroCenter}>
      <h1 className={styles.heroTitle}>{title}</h1>

      <p className={styles.heroSub}>
        Discover verified brokers near you
      </p>
    </div>
  );
}