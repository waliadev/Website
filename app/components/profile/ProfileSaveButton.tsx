"use client";

import styles from "./Profile.module.css";

interface Props {
  onSave: () => void;
  loading?: boolean;
}

export default function ProfileSaveButton({ onSave, loading }: Props) {

  return (
    <div className={styles.saveSection}>

      <button
        className={styles.saveBtn}
        onClick={onSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>

    </div>
  );

}