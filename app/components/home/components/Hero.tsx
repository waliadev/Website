"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

import {
  fetchCities,
  fetchAreas,
  fetchLocalities,
  searchLocalities,
  resetAllLocationData,
} from "@/store/slices/features/location/locationSlice";

import { fetchAgentsByLocation } from "@/store/slices/features/agents/agentListingSlice";
import { fetchActiveBanners } from "@/store/slices/features/banner/bannerSlice";

import styles from "../../Home.module.css";

import SearchSection from "@/app/components/home/sections/herosection/SearchSection";
import CitySection from "@/app/components/home/sections/herosection/CitySection";
import AreaSection from "@/app/components/home/sections/herosection/AreaSection";
import LocalitySection from "@/app/components/home/sections/herosection/LocalitySection";
import HeroRight from "@/app/components/home/sections/herosection/HeroRight";
import { HOME_HERO } from "@/constants/home";

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();

  const { cities, areas, localities, searchedLocalities } =
    useSelector((state: RootState) => state.location);

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedLocalityId, setSelectedLocalityId] = useState<number | null>(null);

  /* ================= INITIAL FETCH ================= */
  useEffect(() => {
    dispatch(resetAllLocationData());
    dispatch(fetchCities());
    
  }, [dispatch]);

  /* ================= FETCH BANNERS ================= */
  useEffect(() => {
    if (selectedCityId) {
      dispatch(fetchActiveBanners({ city_id: selectedCityId }));
    }
  }, [selectedCityId, dispatch]);

  /* ================= FETCH AGENTS ================= */
  useEffect(() => {
    if (selectedLocalityId) {
      dispatch(fetchAgentsByLocation({ locationId: selectedLocalityId }));
    }
  }, [selectedLocalityId, dispatch]);

  /* ================= CITY CLICK ================= */
  const handleCityClick = (city: any) => {
    setSelectedCityId(city.id);
    setSelectedCityName(city.name);
    setSelectedAreaId(null);
    setSelectedLocalityId(null);

    if (city.has_area === 1) {
      // ✅ fetch areas
      dispatch(resetAllLocationData());
      dispatch(fetchAreas({ id: city.id }));
    } else {
      // ✅ direct locality
      dispatch(resetAllLocationData());
      dispatch(fetchLocalities({ cityId: city.id }));
    }
  };

  /* ================= AREA CLICK ================= */
  const handleAreaClick = (area: any) => {
    if (!selectedCityId) return;

    setSelectedAreaId(area.id);
    setSelectedLocalityId(null);

    dispatch(
      fetchLocalities({
        cityId: selectedCityId,
        areaId: area.id,
      })
    );
  };

  /* ================= CHECK HAS AREA ================= */
  const selectedCity = cities.find((c) => c.id === selectedCityId);
  const hasArea = selectedCity?.has_area === 1;

  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>
          {HOME_HERO.TITLE} <br />
          {HOME_HERO.TITLE_SECOND}
        </h1>

        <p className={styles.heroDesc}>
          {HOME_HERO.DESCRIPTION}
        </p>

        {/* 🔍 SEARCH */}
        <SearchSection
          searchedLocalities={searchedLocalities}
          searchLocalities={searchLocalities}
          dispatch={dispatch}
          setSelectedCityId={setSelectedCityId}
          setSelectedCityName={setSelectedCityName}
          setSelectedAreaId={setSelectedAreaId}
          setSelectedLocalityId={setSelectedLocalityId}
        />

        {/* 🏙 CITY */}
        <CitySection
          cities={cities}
          selectedCityId={selectedCityId}
          handleCityClick={handleCityClick}
        />

        {/* 🏢 AREA (ONLY IF has_area = 1) */}
        {selectedCityId && hasArea && (
          <AreaSection
            areas={areas}
            selectedAreaId={selectedAreaId}
            selectedCityName={selectedCityName}
            handleAreaClick={handleAreaClick}
          />
        )}

        {/* 📍 LOCALITY */}
        {selectedCityId && (
          <LocalitySection
            localities={localities}
            selectedLocalityId={selectedLocalityId}
            setSelectedLocalityId={setSelectedLocalityId}
          />
        )}
      </div>

      {/* RIGHT SIDE */}
      <HeroRight />
    </section>
  );
}