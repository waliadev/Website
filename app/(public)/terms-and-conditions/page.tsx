"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import TermsContent from "@/app/components/terms/TermsContent";
import TermsLoader from "@/app/components/terms/TermsLoader";

import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function TermsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { terms, loading } = useSelector(
    (state: RootState) => state.config
  );

  const termsData = useMemo(() => {
    if (!terms) return null;
    return Array.isArray(terms) ? terms[0] : terms;
  }, [terms]);

  // ✅ JSON parse (IMPORTANT)
  const extractJSON = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!terms) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, terms]);

  return (
    <>
      <Navbar />

      {loading ? (
        <TermsLoader />
      ) : (
        <TermsContent
          content={extractJSON(termsData?.content || "")}
        />
      )}

      <Footer />
    </>
  );
}