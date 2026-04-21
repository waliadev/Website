"use client";

import { useEffect, useState } from "react";
import styles from "./ProfileModal.module.css";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { getProfile, updateProfile } from "@/store/slices/features/profile/profileSlice";
import { showToast } from "@/utils/toast";

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
    lat: 0,
    lng: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Clean email + check profile
  const cleanEmail = profile?.email?.replace(/"/g, "").trim();
  const isProfileComplete = !!(profile?.name && cleanEmail);

  // ✅ Auto fill profile
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        email: cleanEmail || "",
      });
    }
  }, [profile]);

  // ✅ ESC close control
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isProfileComplete) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isProfileComplete, onClose]);

  // ✅ SAVE
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
      dispatch(getProfile())

      showToast(
        isProfileComplete
          ? "Profile updated successfully"
          : "Signup successful",
        "success"
      );

      onClose();
    } catch (err) {
      showToast("Update failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Unable to fetch location")
    );
  };

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={() => {
        if (isProfileComplete) onClose();
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h3>
            {isProfileComplete
              ? "Edit Profile"
              : "Create Your Account"}
          </h3>

          {/* ✅ Close only if complete */}
          {isProfileComplete && (
            <button onClick={onClose} className={styles.closeBtn}>
              ✕
            </button>
          )}
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "15px",
            fontWeight: "600",
          }}
        >
          <span
            onClick={() => setStep(1)}
            style={{
              color: step === 1 ? "#ff5a00" : "gray",
              borderBottom:
                step === 1 ? "2px solid #ff5a00" : "none",
            }}
          >
            Profile
          </span>

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
              borderBottom:
                step === 2 ? "2px solid #ff5a00" : "none",
            }}
          >
            Location
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className={styles.avatar}>
              {form.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
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
              onClick={() => {
                if (!form.name || !form.email) {
                  alert("Please fill required fields");
                  return;
                }
                setStep(2);
              }}
              style={{
                background: "#ff5a00",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                marginTop: "10px",
                fontWeight: "600",
              }}
            >
              Next ➡️
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <button
              onClick={getCurrentLocation}
              style={{
                background: "#ff5a00",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                fontWeight: "600",
              }}
            >
              📍 Use Current Location
            </button>

            <iframe
              width="100%"
              height="200"
              style={{
                border: 0,
                borderRadius: "10px",
                marginTop: "10px",
              }}
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
            />

            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                background: "#ff5a00",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                marginTop: "10px",
                fontWeight: "600",
              }}
            >
              {loading
                ? "Submitting..."
                : isProfileComplete
                ? "Update Profile"
                : "Sign Up"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}