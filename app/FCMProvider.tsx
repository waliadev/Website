"use client";

import { useEffect } from "react";
import { generateAdminToken } from "@/lib/firebase-messaging";
import { saveDeviceToken } from "@/store/slices/features/deviceToken/deviceTokenSlice";
import { useAppDispatch } from "@/store/hooks";

// ✅ Device Type Detect
const getDeviceType = (): "android" | "ios" | "web" => {
  if (typeof window === "undefined") return "web";

  const ua = navigator.userAgent.toLowerCase();

  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";

  return "web";
};

export default function FCMProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initFCM = async () => {
      try {
        if (typeof window === "undefined") return;

        // ✅ Notification permission
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.warn("Notification permission denied");
          return;
        }

        // ✅ Delay (important for service worker readiness)
        setTimeout(async () => {
          const token = await generateAdminToken();

          if (!token) return;

          console.log("✅ FCM Token:", token);

          // ✅ Prevent duplicate API calls
          const storedToken = localStorage.getItem("fcm_token");

          if (storedToken === token) {
            console.log("⚠️ Token already saved, skipping API call");
            return;
          }
          // ✅ Save token in backend via Redux
          dispatch(
            saveDeviceToken({
              device_token: token,
              device_type: getDeviceType(),
            })
          );

          // ✅ Save locally
          localStorage.setItem("fcm_token", token);
        }, 1500);
      } catch (error) {
        console.error("❌ FCM Error:", error);
      }
    };

    initFCM();
  }, [dispatch]);

  return null;
}