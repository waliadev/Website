"use client";

import styles from "./Profile.module.css";
import Image from "next/image";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import ProfileHero from "@/app/components/ProfileHero";

/* ✅ STATIC USER DATA */
const USER = {
  name: "Vikas Kumar",
  email: "vikas@example.com",
  phone: "+91 9876543210",
  city: "Noida",
  role: "Property Seeker",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
};

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <ProfileHero />

         <main className={styles.container}>
  <div className={styles.profileCard}>
    {/* LEFT PANEL */}
    <div className={styles.profileLeft}>
      <div className={styles.avatarBox}>
        <Image
          src={USER.avatar}
          alt={USER.name}
          fill
          className={styles.avatar}
        />

        <button className={styles.avatarEdit}>
          ✏️
        </button>
      </div>

      <h2 className={styles.userName}>{USER.name}</h2>
      <p className={styles.role}>{USER.role}</p>

      <button className={styles.editPrimary}>
        Edit Profile
      </button>
    </div>

    {/* RIGHT PANEL */}
    <div className={styles.profileRight}>
      <div className={styles.headerRow}>
        <h3>Personal Information</h3>
        <span className={styles.statusBadge}>Active</span>
      </div>

      <div className={styles.infoGrid}>
        <Info label="Full Name" value={USER.name} />
        <Info label="Email Address" value={USER.email} />
        <Info label="Phone Number" value={USER.phone} />
        <Info label="City" value={USER.city} />
      </div>
    </div>
  </div>
</main>

      <Footer />
    </>
  );
}

/* ✅ reusable info row */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}