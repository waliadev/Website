"use client";

import { useEffect, useState } from "react";
import styles from "./ProfileModal.module.css";
import { useAppSelector } from "@/store/hooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: Props) {
  const { profile } = useAppSelector((state) => state.profile);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [location, setLocation] = useState({
    lat: 28.6139,
    lng: 77.2090,
  });

  // ✅ Auto fill profile
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  // ✅ Get Current Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        alert("Unable to fetch location");
      }
    );
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* HEADER */}
        <div className={styles.header}>
          <h3>Edit Profile</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* AVATAR */}
        <div className={styles.avatar}>
          {form.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* FORM */}
        <div className={styles.form}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* LOCATION BUTTON */}
        <button
          className={styles.locationBtn}
          onClick={getCurrentLocation}
        >
          📍 Use Current Location
        </button>

        {/* MAP */}
        <div className={styles.map}>
          <iframe
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
          />
        </div>

        {/* SAVE */}
        <button className={styles.saveBtn}>
          Save Changes
        </button>

      </div>
    </div>
  );
}