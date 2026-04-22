"use client";

import Image from "next/image";
import styles from "@/app/components/expertHelp/styles/ExpertHero.module.css";
import { Phone, MessageCircle } from "lucide-react";
import { EXPERT_HERO } from "@/constants/expertHelp";

export default function ExpertHero({setOpenModal}) {
  return (
    <section className={styles.hero}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.badge}>{EXPERT_HERO.badge}</div>

        <h1 className={styles.title}>
          {EXPERT_HERO.title.first}{" "}
          <span>{EXPERT_HERO.title.highlight}</span>
          <br />
          {EXPERT_HERO.title.second}
        </h1>

        <p className={styles.desc}>{EXPERT_HERO.description}</p>

        {/* STATS */}
        <div className={styles.stats}>
          {EXPERT_HERO.stats.map((stat, index) => (
            <div key={index}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={()=>{setOpenModal(true)}}>
            <Phone size={18} />
            {EXPERT_HERO.buttons.primary}
          </button>

          {/* <button className={styles.secondaryBtn}>
            <MessageCircle size={18} />
            {EXPERT_HERO.buttons.secondary}
          </button> */}
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.imageCard}>
          <Image
            src={EXPERT_HERO.image}
            alt="expert help"
            width={520}
            height={420}
            priority
            className={styles.image}
          />

          <div className={styles.floatingBadge}>
            {EXPERT_HERO.floatingBadge}
          </div>
        </div>
      </div>
    </section>
  );
}