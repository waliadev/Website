"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch } from "@/store";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // 🔹 Firebase popup login
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔹 Firebase ID Token
      const idToken = await user.getIdToken();

      console.log("Firebase User:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });

      // 🔹 Backend API call via Redux
      await dispatch(loginWithGoogle({ idToken }));

    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="googleBtn"
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        width={20}
      />

      {loading ? "Signing in..." : "Login with Google"}
    </button>
  );
}