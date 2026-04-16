"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/app/(protected)/agent/[slug]/AgentDetail.module.css";

import type { AppDispatch, RootState } from "@/store";
import { fetchActiveBanners } from "@/store/slices/features/banner/bannerSlice";

export default function BannerCarousel() {
  const dispatch = useDispatch<AppDispatch>();

  const { banners } = useSelector((state: RootState) => state.banner);
  const { selectedCityId } = useSelector(
    (state: RootState) => state.location
  );

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ✅ Fetch banners (dynamic city)
  useEffect(() => {
    dispatch(fetchActiveBanners({ city_id: selectedCityId || 4 }));
  }, [selectedCityId, dispatch]);

  // ✅ Filter banners
  const filteredBanners = useMemo(() => {
    if (!Array.isArray(banners)) return [];

    return banners.filter(
      (item: any) =>
        item?.position === "Top Banner" &&
        Number(item?.is_active) === 1
    );
  }, [banners]);

  // ✅ Reset current index when data changes
  useEffect(() => {
    setCurrent(0);
  }, [filteredBanners.length]);

  // ✅ 🔥 MAIN FIX: hide section completely
  if (!filteredBanners.length) {
    return null;
  }

  const currentBanner = filteredBanners[current];

  return (
    <div className={styles.hero}>
      {/* Banner Image */}
      <img
        src={currentBanner?.image_url}
        alt="banner"
        className={styles.heroImg}
      />

      {/* Title */}
      {currentBanner?.title && (
        <h1 style={{ position: "absolute", zIndex: 2 }}>
          {currentBanner.title}
        </h1>
      )}

      <div className={styles.overlay} />

      {/* Navigation Buttons */}
      {filteredBanners.length > 1 && (
        <>
          <button
            className={`${styles.navBtn} ${styles.leftBtn}`}
            onClick={() =>
              setCurrent((prev) =>
                prev === 0
                  ? filteredBanners.length - 1
                  : prev - 1
              )
            }
          >
            <ChevronLeft size={22} />
          </button>

          <button
            className={`${styles.navBtn} ${styles.rightBtn}`}
            onClick={() =>
              setCurrent(
                (prev) => (prev + 1) % filteredBanners.length
              )
            }
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}