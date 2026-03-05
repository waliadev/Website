"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User Data:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });

      // 🔥 yaha tum backend API call bhi kar sakte ho

    } catch (error) {
      console.error("Login Error:", error);
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
      />
      {loading ? "Signing in..." : "Login with Google"}
    </button>
  );
}