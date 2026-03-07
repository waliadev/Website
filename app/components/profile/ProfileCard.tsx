"use client";

import styles from "./Profile.module.css";
import { useState, useEffect } from "react";

import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileMap from "./ProfileMap";

export default function ProfileCard() {

  const [form, setForm] = useState({
    name: "Vikas Kumar",
    email: "vikas@example.com",
    phone: "+91 9876543210",
    address: "",
    latitude: "",
    longitude: "",
  });

  /* LOCATION AUTO */

  useEffect(() => {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );

      const data = await res.json();

      setForm((prev:any)=>({
        ...prev,
        address:data.display_name,
        latitude:lat,
        longitude:lng
      }));

    });

  }, []);

  return (

    <main className={styles.container}>

      <div className={styles.card}>

        <ProfileAvatar name={form.name} />

        <div className={styles.right}>

          <ProfileInfoForm
            form={form}
            setForm={setForm}
          />

          <ProfileMap
            latitude={form.latitude}
            longitude={form.longitude}
          />

        </div>

      </div>

    </main>

  );
}