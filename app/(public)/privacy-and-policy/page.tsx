"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import PrivacyContent from "@/app/components/privacy/PrivacyContent";
import PrivacyLoader from "@/app/components/privacy/PrivacyLoader";

import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function PrivacyPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { privacyPolicy, loading } = useSelector(
    (state: RootState) => state.config
  );

  const privacyData = useMemo(() => {
    if (!privacyPolicy) return null;
    return Array.isArray(privacyPolicy)
      ? privacyPolicy[0]
      : privacyPolicy;
  }, [privacyPolicy]);

  // ✅ JSON parse (IMPORTANT)
  const extractJSON = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!privacyPolicy) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, privacyPolicy]);

  return (
    <>
      <Navbar />

      {loading ? (
        <PrivacyLoader />
      ) : (
        <PrivacyContent
          content={extractJSON(privacyData?.content || "")}
        />
      )}

      <Footer />
    </>
  );
}