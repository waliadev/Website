"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

// ✅ IMPORT FROM STORE (VERY IMPORTANT)
import type { Banner } from "@/store/slices/features/banner/bannertypes";

import styles from "@/app/components/home/styles/HeroBanner.module.css";

import BannerSlider from "@/app/components/home/sections/HeroBanner/BannerSlider";
import BannerOverlay from "@/app/components/home/sections/HeroBanner/BannerOverlay";
import BannerContent from "@/app/components/home/sections/HeroBanner/BannerContent";
import BannerDots from "@/app/components/home/sections/HeroBanner/BannerDots";

export default function HeroBanner() {
  // ✅ NO TYPE CASTING
  const banners = useSelector(
    (state: RootState) => state.banner.banners
  );

  console.log("Slider banner:", banners);

  // ✅ FILTER HOME BANNERS
  const homeBanners = useMemo<Banner[]>(() => {
    return (
      banners?.filter(
        (item) =>
          item.position === "Home Page Banner" &&
          item.is_active === 1
      ) || []
    );
  }, [banners]);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // ✅ AUTO SLIDER
  useEffect(() => {
    if (!homeBanners.length) return;

    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeBanners.length);
    }, 3500);

    return () => clearInterval(slider);
  }, [homeBanners]);

  if (!homeBanners.length) return null;

  const activeSlide = homeBanners[currentSlide];

  // ✅ HANDLE CLICK NAVIGATION
  const handleNavigate = () => {
    const url = activeSlide?.link_url;
    if (!url) return;

    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    window.open(formattedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className={styles.heroSection}
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      {/* SLIDER */}
      <BannerSlider
        banners={homeBanners}
        currentSlide={currentSlide}
      />

      {/* OVERLAY */}
      <BannerOverlay />

      {/* CONTENT */}
      <BannerContent title={activeSlide.title} />

      {/* DOTS */}
      <div onClick={(e) => e.stopPropagation()}>
        <BannerDots
          total={homeBanners.length}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
    </section>
  );
}