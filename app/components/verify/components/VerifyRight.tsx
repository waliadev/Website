"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store";
import OtpInput from "@/app/components/verify/components/OtpInput";

interface Props {
  phone: string;
  expiryTime: number | null;
}

export default function VerifyRight({ phone, expiryTime }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!expiryTime) return;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
      if (remaining === 0) setIsExpired(true);
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

  const handleVerify = async () => {
    if (otp.length !== 6) return alert("Enter valid 6-digit OTP");
    if (isExpired) return alert("OTP expired. Please resend.");

    try {
      const result = await dispatch(
        verifyOtp({ phone, otp })
      ).unwrap();

      Cookies.set("token", result.token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(result.data), {
        expires: 7,
        path: "/",
      });

      Cookies.remove("verify_phone", { path: "/" });
      Cookies.remove("otp_expiry", { path: "/" });

      router.replace("/");
    } catch {}
  };

  return (
    <div className="verify-right">
      <div className="verify-card">
        <h2>Verify OTP</h2>

        {error && <p className="verify-error">{error}</p>}

        <OtpInput otp={otp} setOtp={setOtp} isExpired={isExpired} />

        <p className={`verify-timer ${isExpired ? "expired" : ""}`}>
          {isExpired
            ? "OTP expired"
            : `Expires in ${formatTime(timeLeft)}`}
        </p>

        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="verify-resend">
          Didn’t receive code? <span>Resend OTP</span>
        </p>
      </div>
    </div>
  );
}