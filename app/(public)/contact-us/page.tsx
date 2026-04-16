"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import ContactContent from "@/app/components/contact/ContactContent";
import ContactLoader from "@/app/components/contact/ContactLoader";

import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function ContactPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { contactUs, loading } = useSelector(
    (state: RootState) => state.config
  );

  const contactData = useMemo(() => {
    if (!contactUs) return null;
    return Array.isArray(contactUs) ? contactUs[0] : contactUs;
  }, [contactUs]);

  // ✅ JSON parse (IMPORTANT)
  const extractJSON = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!contactUs) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, contactUs]);

  return (
    <>
      <Navbar />

      {loading ? (
        <ContactLoader />
      ) : (
        <ContactContent
          content={extractJSON(contactData?.content || "")}
        />
      )}

      <Footer />
    </>
  );
}