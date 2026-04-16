"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

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

  const extractJSON = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
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

      {loading ? (
        <AboutLoader />
      ) : (
        <AboutContent
          content={extractJSON(aboutData?.content || "")}
        />
      )}

      <Footer />
    </>
  );
}