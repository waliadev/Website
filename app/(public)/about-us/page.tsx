"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import AboutHero from "@/app/components/about/AboutHero";
import AboutContent from "@/app/components/about/AboutContent";
import AboutLoader from "@/app/components/about/AboutLoader";

import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function AboutPage() {

  const dispatch = useDispatch<AppDispatch>();

  const { aboutUs, loading } = useSelector(
    (state: RootState) => state.config
  );

  const aboutData = useMemo(() => {
    if (!aboutUs) return null;
    return Array.isArray(aboutUs) ? aboutUs[0] : aboutUs;
  }, [aboutUs]);

  const extractText = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      return parsed?.blocks?.map((b: any) => b.text).join("\n\n");
    } catch {
      return raw;
    }
  };

  useEffect(() => {
    if (!aboutUs) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, aboutUs]);

  return (
    <>
      <Navbar />

      {/* <AboutHero /> */}

      {loading ? (
        <AboutLoader />
      ) : (
        <AboutContent
          content={extractText(aboutData?.content || "")}
        />
      )}

      <Footer />
    </>
  );
}