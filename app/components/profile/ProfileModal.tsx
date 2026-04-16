"use client";

import { useEffect, useState } from "react";
import styles from "./ProfileModal.module.css";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { updateProfile } from "@/store/slices/features/profile/profileSlice";
import { showToast } from "@/utils/toast"

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useAppSelector((state) => state.profile);

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

  // ✅ SAVE FUNCTION
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      formData.append(
        "location",
        JSON.stringify({
          address: "Current Location",
          city: "Auto",
          state: "Auto",
          pincode: "000000",
          lat: location.lat,
          lng: location.lng,
        })
      );

      if (image) {
        formData.append("image", image);
      }

      await dispatch(updateProfile(formData)).unwrap();

      showToast("Profile Uodate Successful","success")
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Update failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

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

        {/* 🔥 CLICKABLE TABS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "15px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {/* PROFILE TAB */}
          <span
            onClick={() => setStep(1)}
            style={{
              color: step === 1 ? "#ff5a00" : "gray",
              borderBottom: step === 1 ? "2px solid #ff5a00" : "none",
              paddingBottom: "4px",
            }}
          >
            Profile
          </span>

          {/* LOCATION TAB */}
          <span
            onClick={() => {
              if (!form.name || !form.email) {
                alert("Please fill profile first");
                return;
              }
              setStep(2);
            }}
            style={{
              color: step === 2 ? "#ff5a00" : "gray",
              borderBottom: step === 2 ? "2px solid #ff5a00" : "none",
              paddingBottom: "4px",
            }}
          >
            Location
          </span>
        </div>

        {/* STEP 1: PROFILE */}
        {step === 1 && (
          <>
            <div className={styles.avatar}>
              {form.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />

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

            <button
              style={{
                background: "#ff5a00",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                marginTop: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => {
                if (!form.name || !form.email) {
                  alert("Please fill required fields");
                  return;
                }
                setStep(2);
              }}
            >
              Next ➡️
            </button>
          </>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <>
            <button
              style={{
                background: "#ff5a00",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={getCurrentLocation}
            >
              📍 Use Current Location
            </button>

            <div className={styles.map}>
              <iframe
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: "10px", marginTop: "10px" }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
              />
            </div>

            
              

              {/* SAVE */}
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  background: "#ff5a00",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
          </>
        )}

      </div>
    </div>
  );
}