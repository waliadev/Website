import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";

export default function BookmarkHeader() {

  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>My Bookmarks</h1>
    </div>
  );

}