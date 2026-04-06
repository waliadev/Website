"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store";
import OtpInput from "@/app/components/verify/components/OtpInput";

/* ================= TYPES ================= */

interface VerifyRightProps {
  phone: string;
  expiryTime?: number | null;
}

type User = {
  id: number;
  name: string;
  phone: string;
};



/* ================= COMPONENT ================= */

export default function VerifyRight({
  phone,
  expiryTime,
}: VerifyRightProps) {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  /* ================= OTP TIMER ================= */

  useEffect(() => {
    if (!expiryTime) return;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining === 0) {
        setIsExpired(true);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  /* ================= TIME FORMAT ================= */

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= VERIFY OTP ================= */

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    if (isExpired) {
      alert("OTP expired. Please resend OTP.");
      return;
    }

    try {
      const result = await dispatch(
        verifyOtp({ phone, otp })
      ).unwrap();

      console.log(result, "Verify result");

      /* ✅ Save Token */
      if (result?.tokens) {
        Cookies.set("token", result.tokens, {
          expires: 7,
          path: "/",
          sameSite: "Lax",
        });
      }

      /* ✅ Save User */
      if (result?.data) {
        Cookies.set("user", JSON.stringify(result.data), {
          expires: 7,
          path: "/",
          sameSite: "Lax",
        });
      }

      /* ✅ Redirect after success */
      router.push("/"); // change route if needed

    } catch (error) {
      console.log("OTP Verify Failed ❌", error);
      alert("OTP verification failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="verify-right">
      <div className="verify-card">

        <h2 className="verify-title">Verify OTP</h2>

        <p className="verify-sub">
          Enter the code sent to <strong>{phone}</strong>
        </p>

        {error && <p className="verify-error">{error}</p>}

        <OtpInput
          otp={otp}
          setOtp={setOtp}
          isExpired={isExpired}
        />

        <p className={`verify-timer ${isExpired ? "expired" : ""}`}>
          {isExpired
            ? "OTP expired"
            : `Expires in ${formatTime(timeLeft)}`}
        </p>

        <button
          className="verify-btn"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="verify-resend">
          Didn’t receive code?
          <span className="resend-link"> Resend OTP</span>
        </p>

      </div>
    </div>
  );
}