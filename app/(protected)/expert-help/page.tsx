"use client";

import styles from "./ExpertHelp.module.css";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import ExpertHero from "@/app/components/ExpertHero";
import { Phone, MessageCircle, Mail, LifeBuoy } from "lucide-react";

export default function ExpertHelpPage() {
  return (
    <>
      <Navbar />
      <ExpertHero />

      <main className={styles.container}>
        {/* ===== intro ===== */}
        <div className={styles.header}>
          <h2>How can we help you?</h2>
          <p>
            Connect with our property experts for guidance,
            support, and quick assistance.
          </p>
        </div>

        {/* ===== options ===== */}
        <div className={styles.grid}>
          <HelpCard
            icon={<Phone size={22} className={styles.helpIcon} />}
            title="Call an Expert"
            desc="Speak directly with our property specialist."
            action="Call Now"
          />

          <HelpCard
            icon={<MessageCircle size={22} className={styles.helpIcon} />}
            title="Live Chat"
            desc="Chat instantly with our support team."
            action="Start Chat"
          />

          <HelpCard
            icon={<Mail size={22} className={styles.helpIcon} />}
            title="Email Support"
            desc="Send us your query and we'll respond quickly."
            action="Send Email"
          />

          <HelpCard
            icon={<LifeBuoy size={22} className={styles.helpIcon}/>}
            title="Help Center"
            desc="Browse FAQs and helpful resources."
            action="View Articles"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ===== reusable card ===== */
function HelpCard({
  icon,
  title,
  desc,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className={styles.actionBtn}>{action}</button>
    </div>
  );
}