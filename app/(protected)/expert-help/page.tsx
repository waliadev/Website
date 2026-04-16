"use client";

import { useState } from "react";
import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";

import ExpertHero from "@/app/components/expertHelp/ExpertHero";
import ExpertHelpHeader from "@/app/components/expertHelp/ExpertHelpHeader";
import HelpCard from "@/app/components/expertHelp/HelpCard";
import HelpCenterModal from "@/app/components/expertHelp/HelpCenterModal";

import { Phone, MessageCircle, Mail, LifeBuoy } from "lucide-react";

export default function ExpertHelpPage() {

  const [openModal, setOpenModal] = useState(false);

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleEmail = () => {
    const subject = "Need Help";
    const body = "Hello BrokerDash Team,";

    const mailtoLink = `mailto:support@brokerdash.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.assign(mailtoLink);
  };

  const handleWhatsapp = () => {
    window.open("https://wa.me/919876543210", "_blank");
  };

  return (
    <>
      <Navbar />

      <ExpertHero />

      <main className={styles.container}>

        <ExpertHelpHeader />

        <div className={styles.grid}>

          <HelpCard
            icon={<Phone size={22} />}
            title="Call an Expert"
            desc="Speak directly with our property specialist."
            action="Call Now"
            onClick={handleCall}
          />

          <HelpCard
            icon={<MessageCircle size={22} />}
            title="Live Chat"
            desc="Chat instantly with our support team."
            action="Start Chat"
            onClick={handleWhatsapp}
          />

          <HelpCard
            icon={<LifeBuoy size={22} />}
            title="Expert Help Center"
            desc="Access FAQs, guides, and resources for quick assistance."
            action="Get Help"
            onClick={() => setOpenModal(true)}
          />

        </div>

      </main>

      <Footer />

      <HelpCenterModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}