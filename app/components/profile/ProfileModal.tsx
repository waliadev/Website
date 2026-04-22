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

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const cleanEmail = profile?.email?.replace(/"/g, "").trim();
  const isProfileComplete = !!(profile?.name && cleanEmail);

  /* =========================
     ✅ VALIDATION
  ========================== */
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isStep1Valid =
    form.name.trim() !== "" && isEmailValid;

  /* =========================
     REVERSE GEOCODING
  ========================== */
  const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      return {
        address: data.display_name || "",
        city:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "",
        state: data.address?.state || "",
        pincode: data.address?.postcode || "",
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /* =========================
     GET CURRENT LOCATION
  ========================== */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const addressData = await getAddressFromLatLng(lat, lng);

        setLocation({
          lat,
          lng,
          address: addressData?.address || "Current Location",
          city: addressData?.city || "",
          state: addressData?.state || "",
          pincode: addressData?.pincode || "",
        });
      },
      () => alert("Location permission denied")
    );
  };

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
        } else {
          break;
        }
      }

      return result.replace(/\\+/g, "").replace(/"/g, "").trim();
    } catch {
      return value.replace(/\\+/g, "").replace(/"/g, "").trim();
    }
  };

  /* =========================
     AUTO FILL
  ========================== */
  useEffect(() => {
    if (profile) {
      setForm({
        name: cleanValue(profile.name),
        phone: cleanValue(profile.phone),
        email: cleanValue(profile.email),
      });

      if (profile.location) {
        try {
          let parsedLocation = profile.location;

          if (typeof parsedLocation === "string") {
            parsedLocation = JSON.parse(parsedLocation);

            if (typeof parsedLocation === "string") {
              parsedLocation = JSON.parse(parsedLocation);
            }
          }

          setLocation({
            lat: parsedLocation?.lat || 0,
            lng: parsedLocation?.lng || 0,
            address: parsedLocation?.address || "",
            city: parsedLocation?.city || "",
            state: parsedLocation?.state || "",
            pincode: parsedLocation?.pincode || "",
          });
        } catch (error) {
          console.log("Location parse error:", error);
        }
      }
    }
  }, [profile]);

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
      formData.append("location", JSON.stringify(location));

      await dispatch(updateProfile(formData)).unwrap();
      dispatch(getProfile());

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
            {isProfileComplete
              ? "Edit Profile"
              : "Create Your Account"}
          </h3>

          {isProfileComplete && (
            <button onClick={onClose} className={styles.closeBtn}>
              ✕
            </button>
          )}
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <span
            className={step === 1 ? styles.active : ""}
            onClick={() => setStep(1)}
          >
            Profile
          </span>

          <span
            className={step === 2 ? styles.active : ""}
            onClick={() => setStep(2)}
          >
            Location
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
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

            {/* ERROR MESSAGE */}
            {!isStep1Valid && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Please enter valid Name and Email
              </p>
            )}

            <button
              className={styles.saveBtn}
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              style={{
                opacity: !isStep1Valid ? 0.5 : 1,
                cursor: !isStep1Valid ? "not-allowed" : "pointer",
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <button
              className={styles.locationBtn}
              onClick={getCurrentLocation}
            >
              📍 Use Current Location
            </button>

            <div className={styles.map}>
              <iframe
                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
              />
            </div>

            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? "Saving..."
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