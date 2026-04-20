"use client";

import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";

export default function BookmarkEmpty() {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.emptyBox}>
        <div className={styles.emptyIcon}>🔖</div>

        <h2>No bookmarks yet</h2>

        <p>
          You haven’t saved any agents yet.
          <br />
          Start exploring and bookmark your favorites.
        </p>
      </div>
    </div>
  );
}