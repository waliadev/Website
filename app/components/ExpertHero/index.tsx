"use client";

import Image from "next/image";
import styles from "./ExpertHero.module.css";
import { Phone, MessageCircle } from "lucide-react";

export default function ExpertHero() {
  return (
    <section className={styles.hero}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.badge}>24×7 Expert Support</div>

        <h1 className={styles.title}>
          Get <span>Expert Help</span> for Your
          <br /> Property Journey
        </h1>

        <p className={styles.desc}>
          Connect with verified real estate professionals for
          buying, selling, or renting properties. Fast guidance,
          trusted experts, and personalized support — all in one place.
        </p>

        {/* TRUST STATS */}
        <div className={styles.stats}>
          <div>
            <strong>10k+</strong>
            <span>Happy Clients</span>
          </div>
          <div>
            <strong>500+</strong>
            <span>Verified Experts</span>
          </div>
          <div>
            <strong>4.9★</strong>
            <span>Average Rating</span>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>
            <Phone size={18} />
            Talk to Expert
          </button>

          <button className={styles.secondaryBtn}>
            <MessageCircle size={18} />
            Live Chat
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.imageCard}>
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
            alt="expert help"
            width={520}
            height={420}
            priority
            className={styles.image}
          />

          <div className={styles.floatingBadge}>
            ⭐ Trusted by thousands
          </div>
        </div>
      </div>
    </section>
  );
}