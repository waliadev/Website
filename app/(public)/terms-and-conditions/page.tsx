"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import TermsHero from "@/app/components/terms/TermsHero";
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

  useEffect(() => {
    if (!terms) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, terms]);

  return (
    <>
      <Navbar />

      <TermsHero title={termsData?.title} />

      {loading ? (
        <TermsLoader />
      ) : (
        <TermsContent content={termsData?.content || ""} />
      )}

      <Footer />
    </>
  );
}