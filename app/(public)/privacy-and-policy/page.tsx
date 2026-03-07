"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import PrivacyHero from "@/app/components/privacy/PrivacyHero";
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

  useEffect(() => {
    if (!privacyPolicy) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, privacyPolicy]);

  return (
    <>
      <Navbar />

      <PrivacyHero
        title={privacyData?.title}
      />

      {loading ? (
        <PrivacyLoader />
      ) : (
        <PrivacyContent
          content={privacyData?.content || ""}
        />
      )}

      <Footer />
    </>
  );
}