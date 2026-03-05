"use client";

import Image from "next/image";
import styles from "./ProfileHero.module.css";

export default function ProfileHero() {
  return (
    <section className={styles.hero}>
       <div className={styles.left}>
  <div className={styles.badge}>Account Settings</div>

  <h1 className={styles.heading}>
    Manage Your <span>Profile</span>
  </h1>

  <p className={styles.subtext}>
    View and update your personal information, contact details,
    and account preferences. Keep your profile up to date for a
    better experience.
  </p>

  <div className={styles.actions}>
    <button className={styles.primaryBtn}>
      Update Profile
    </button>

    <button className={styles.secondaryBtn}>
      Change Password
    </button>
  </div>
</div>
      <div className={styles.right}>
        <Image
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop"
          alt="profile"
          width={520}
          height={420}
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}