"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // 🔹 Firebase popup login
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔹 Firebase ID Token
      const idToken = await user.getIdToken();

      // 🔹 Backend API call via Redux
      const response = await dispatch(loginWithGoogle({ idToken }));

      // ✅ IMPORTANT: unwrap response
      const data = response.payload;

      console.log("Backend Response:", data);

      // 🔹 Token extract karo (backend structure ke hisaab se adjust karo)
      const token = data?.tokens?.access?.token || data?.accessToken;

      if (token) {
        // ✅ Cookie set karo
        Cookies.set("token", token, {
          expires: 7, // 7 days
        });

        // ✅ Redirect to home page
        router.push("/");
      } else {
        console.error("Token not found in response");
      }

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