"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import styles from "@/app/components/home/styles/HeroBanner.module.css";

import BannerSlider from "@/app/components/home/sections/HeroBanner/BannerSlider";
import BannerOverlay from "@/app/components/home/sections/HeroBanner/BannerOverlay";
import BannerContent from "@/app/components/home/sections/HeroBanner/BannerContent";
import BannerDots from "@/app/components/home/sections/HeroBanner/BannerDots";

// ✅ Proper Banner Type
export interface Banner {
  banner_id: number;
  title: string;
  image_url: string;
  link_url?: string; // ✅ optional (safe)
  position: string;
  is_active: number;
  priority?: string;
  city_id?: number;
  city_name?: string;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export default function HeroBanner() {
  // ✅ Explicit typing
  const { banners } = useSelector(
    (state: RootState) => state.banner
  ) as { banners: Banner[] };

  console.log(banners,"Slider banner");


  console.log("")

  // ✅ Filter banners
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

  // ✅ Auto slider
  useEffect(() => {
    if (!homeBanners.length) return;

    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeBanners.length);
    }, 3500);

    return () => clearInterval(slider);
  }, [homeBanners]);

  if (!homeBanners.length) return null;

  const activeSlide = homeBanners[currentSlide];

  // ✅ Navigation handler
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
      <BannerSlider
        banners={homeBanners}
        currentSlide={currentSlide}
      />

      <BannerOverlay />

      <BannerContent title={activeSlide.title} />

      {/* ✅ Stop propagation for dots */}
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