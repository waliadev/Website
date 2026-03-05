import { ChangeEvent } from "react";

interface Props {
  otp: string;
  setOtp: (value: string) => void;
  isExpired: boolean;
}

export default function OtpInput({ otp, setOtp, isExpired }: Props) {
  return (
    <input
      className={`verify-otp-input ${!isExpired ? "blink-input" : ""}`}
      placeholder="Enter 6-digit OTP"
      value={otp}
      maxLength={6}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setOtp(e.target.value.replace(/\D/g, ""))
      }
    />
  );
}