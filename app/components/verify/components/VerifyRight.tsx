"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { verifyOtp, resendOtp } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store";
import OtpInput from "@/app/components/verify/components/OtpInput";
import { showToast } from "@/utils/toast";


interface VerifyRightProps {
  phone: string;
  expiryTime?: number | null;
}

export default function VerifyRight({ phone, expiryTime }: VerifyRightProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  /* ================= TOAST HELPER ================= */

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= VERIFY OTP ================= */
  const handleVerify = async () => {
    // ⚠️ OTP length check
    if (otp.length < 6) {
      showToast("Please enter 6 digit OTP ⚠️", "info");
      return;
    }

    // ❌ Expired check
    if (isExpired) {
      showToast("OTP expired. Please resend OTP ⏳", "error");
      return;
    }

    try {
      const result = await dispatch(
        verifyOtp({ phone, otp })
      ).unwrap();

      // ✅ SUCCESS
      showToast("OTP verified successfully ✅", "success");

      showToast("OTP verified successfully ✅", "success");

      if (result?.token) {
        Cookies.set("token", result.token, { expires: 7 });
      }

      if (result?.data) {
        Cookies.set("user", JSON.stringify(result.data), { expires: 7 });
      }

      // redirect after toast
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error) {
      // ❌ ERROR
      showToast("Invalid OTP ❌", "error");
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    try {
      await dispatch(resendOtp({ phone })).unwrap();

      showToast("OTP sent again ✅", "success");
      setIsExpired(false);

    } catch {
      showToast("Failed to resend OTP ❌", "error");
    }
  };

  if (!phone) return null;

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
          <span
            className="resend-link"
            onClick={!isExpired ? undefined : handleResendOtp}
            style={{
              cursor: isExpired ? "pointer" : "not-allowed",
              opacity: isExpired ? 1 : 0.5,
            }}
          >
            Resend OTP
          </span>
        </p>

      </div>
    </div>
  );
}