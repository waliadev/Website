import Image from "next/image";
import styles from "@/app/components/Home.module.css";

export default function HeroRight() {
  return (
    <div className={styles.heroRight}>
      <Image
        src="/hero-house.png"
        alt="house"
        width={520}
        height={420}
        priority
      />
    </div>
  );
}