"use client";

import { useEffect, useState } from "react";
import styles from "./ProfileModal.module.css";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  getProfile,
  updateProfile,
} from "@/store/slices/features/profile/profileSlice";
import { showToast } from "@/utils/toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useAppSelector((state) => state.profile);

  const [isInitialized, setIsInitialized] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     VALIDATION
  ========================== */
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isFormValid = form.name.trim() !== "" && isEmailValid;

  /* =========================
     CLEAN VALUE
  ========================== */
  const cleanValue = (value: any): string => {
    if (!value) return "";
    try {
      let result = value;
      while (typeof result === "string") {
        const parsed = JSON.parse(result);
        if (typeof parsed === "string") {
          result = parsed;
        } else break;
      }
      return result.replace(/\\+/g, "").replace(/"/g, "").trim();
    } catch {
      return value.replace(/\\+/g, "").replace(/"/g, "").trim();
    }
  };

  /* =========================
     LOCAL STORAGE SAVE
  ========================== */
  useEffect(() => {
    localStorage.setItem("profileForm", JSON.stringify(form));
  }, [form]);

  /* =========================
     RESTORE ON OPEN
  ========================== */
  useEffect(() => {
    if (!open) return;

    const savedForm = localStorage.getItem("profileForm");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, [open]);

  /* =========================
     INIT FROM PROFILE (ONLY ONCE)
  ========================== */
  useEffect(() => {
    if (profile && !isInitialized) {
      setForm({
        name: cleanValue(profile.name),
        phone: cleanValue(profile.phone),
        email: cleanValue(profile.email),
      });
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  /* =========================
     SAVE
  ========================== */
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      await dispatch(updateProfile(formData)).unwrap();
      dispatch(getProfile());

      localStorage.removeItem("profileForm");

      showToast("Profile updated successfully", "success");
      onClose();
    } catch {
      showToast("Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>
            {form.name
              ? `Welcome, ${form.name}`
              : "Create Your Account"}
          </h3>

          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Full Name *</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email *</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {!isFormValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Please enter valid Name and Email
            </p>
          )}

          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!isFormValid || loading}
            style={{
              opacity: !isFormValid ? 0.5 : 1,
              cursor: !isFormValid ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}