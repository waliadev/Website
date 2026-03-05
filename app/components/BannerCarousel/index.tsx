"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/app/(protected)/agent/[slug]/AgentDetail.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel({ images }: any) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ next slide
  const next = () => {
    setCurrent((p) => (p + 1) % images.length);
  };

  // ✅ prev slide
  const prev = () => {
    setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  // ✅ AUTO PLAY (every 3 sec)
  useEffect(() => {
    startAuto();

    return () => stopAuto();
    // eslint-disable-next-line
  }, [images.length]);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 3000); // ⭐ 3 seconds
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section
      className={styles.hero}
      onMouseEnter={stopAuto}   // 🧠 pause on hover
      onMouseLeave={startAuto}  // ▶ resume
    >
      <Image
        key={current} // ⭐ important for smooth change
        src={images[current]}
        alt="banner"
        fill
        priority
        className={styles.heroImg}
      />

      <div className={styles.overlay} />

      {/* LEFT */}
      <button
        className={`${styles.navBtn} ${styles.leftBtn}`}
        onClick={prev}
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT */}
      <button
        className={`${styles.navBtn} ${styles.rightBtn}`}
        onClick={next}
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}