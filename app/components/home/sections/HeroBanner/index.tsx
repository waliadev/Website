"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import styles from "@/app/components/home/styles/HeroBanner.module.css";

import BannerSlider from "@/app/components/home/sections/HeroBanner/BannerSlider";
import BannerOverlay from "@/app/components/home/sections/HeroBanner/BannerOverlay";
import BannerContent from "@/app/components/home/sections/HeroBanner/BannerContent";
import BannerDots from "@/app/components/home/sections/HeroBanner/BannerDots";

export default function HeroBanner() {
  const { banners } = useSelector(
    (state: RootState) => state.banner
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners?.length) return;

    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(slider);
  }, [banners]);

  if (!banners?.length) return null;

  const activeSlide = banners[currentSlide];

  return (
    <section className={styles.heroSection}>
      <BannerSlider
        banners={banners}
        currentSlide={currentSlide}
      />

      <BannerOverlay />

      <BannerContent
        title={activeSlide.title}
      />

      <BannerDots
        total={banners.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </section>
  );
}