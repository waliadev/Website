"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Navbar from "@/app/components/shared/components/Navbar";
import VerifyLeft from "@/app/components/verify/components/VerifyLeft";
import VerifyRight from "@/app/components/verify/components/VerifyRight";
import { API_ENDPOINTS } from "@/constants/api";

/**
 * Constants
 */
const OTP_EXPIRY_DURATION = 5 * 60 * 1000; // 3 minutes

export default function VerifyPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState<number | null>(null);

  /**
   * Initialize verification session
   */
  useEffect(() => {
    const initializeVerification = () => {
      const storedPhone = Cookies.get("verify_phone");
      let storedExpiry = Cookies.get("otp_expiry");

      // If phone not found → redirect to login
      if (!storedPhone) {
        router.replace(API_ENDPOINTS.AUTH.LOGIN);
        return;
      }

      // If expiry not present → create new expiry
      if (!storedExpiry) {
        const newExpiry = Date.now() + OTP_EXPIRY_DURATION;

        Cookies.set("otp_expiry", newExpiry.toString(), {
          path: "/",
          sameSite: "strict",
        });

        storedExpiry = newExpiry.toString();
      }

      setPhoneNumber(storedPhone);
      setExpiryTime(Number(storedExpiry));
    };

    initializeVerification();
  }, [router]);

  /**
   * Prevent rendering until verification session ready
   */
  if (!phoneNumber || !expiryTime) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="verify-wrapper">
        <VerifyLeft phone={phoneNumber} />
        <VerifyRight phone={phoneNumber} expiryTime={expiryTime} />
      </div>
    </>
  );
}