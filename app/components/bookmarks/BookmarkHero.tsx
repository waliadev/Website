"use client";

import Image from "next/image";
import styles from "./BookmarkHero.module.css";

export default function BookmarkHero() {
  return (
    <section className={styles.hero}>
      {/* LEFT */}
      <div className={styles.left}>
        <h1 className={styles.title}>
          Your Saved <span>Bookmarks</span>
        </h1>

        <p className={styles.desc}>
          Quickly access the brokers and properties you’ve saved.
          Manage your favorites in one convenient place.
        </p>

        <div className={styles.badges}>
          <span>⭐ Verified Agents</span>
          <span>❤️ Your Favorites</span>
          <span>⚡ Quick Access</span>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className={styles.right}>
        <Image
          src="/Bookmarks-rafiki.png"
          alt="bookmarks"
          width={520}
          height={420}
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}