import styles from "@/app/components/home/styles/HeroBanner.module.css";

export default function BannerDots({
  total,
  currentSlide,
  setCurrentSlide,
}: any) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${
            i === currentSlide ? styles.activeDot : ""
          }`}
          onClick={() => setCurrentSlide(i)}
        />
      ))}
    </div>
  );
}