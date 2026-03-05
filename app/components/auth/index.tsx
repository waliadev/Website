"use client";

import { useEffect } from "react";
import Navbar from "@/app/components/shared/components/Navbar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store";

import AuthLayout from "@/app/components/auth/home/AuthLayout";
import AuthLeftSection from "@/app/components/auth/sections/AuthLeftSection";
import LoginForm from "@/app/components/auth/home/LoginForm";
import SocialLoginSection from "@/app/components/auth/sections//SocialLoginSection";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { otpSent } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (otpSent) router.push("/verify-otp");
  }, [otpSent, router]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <AuthLayout
        left={<AuthLeftSection />}
        right={
          <div className="loginCard">
            <LoginForm />
            <SocialLoginSection />
          </div>
        }
      />
    </>
  );
}