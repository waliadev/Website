"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import ContactHero from "@/app/components/contact/ContactHero";
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

  useEffect(() => {
    if (!contactUs) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, contactUs]);

  return (
    <>
      <Navbar />

      <ContactHero
        title={contactData?.title}
      />

      {loading ? (
        <ContactLoader />
      ) : (
        <ContactContent
          content={contactData?.content || ""}
        />
      )}

      <Footer />
    </>
  );
}