// "use client";

// import Navbar from "@/app/components/shared/components/Navbar";
// import Cookies from "js-cookie";
// import { useEffect, useState, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyOtp, clearAuthError } from "@/store/slices/features/auth/authSlice";
// import type { AppDispatch, RootState } from "@/store";

// export default function VerifyPage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [expiryTime, setExpiryTime] = useState<number | null>(null);
//   const [timeLeft, setTimeLeft] = useState(180);
//   const [isExpired, setIsExpired] = useState(false);

//   useEffect(() => {
//     const storedPhone = Cookies.get("verify_phone");
//     let expiry = Cookies.get("otp_expiry");

//     if (!storedPhone) {
//       router.replace("/sign-in");
//       return;
//     }

//     if (!expiry) {
//       const newExpiry = Date.now() + 180000;
//       Cookies.set("otp_expiry", newExpiry.toString(), { path: "/" });
//       expiry = newExpiry.toString();
//     }

//     setPhone(storedPhone);
//     setExpiryTime(Number(expiry));
//   }, [router]);

//   useEffect(() => {
//     if (!expiryTime) return;

//     const tick = () => {
//       const remaining = Math.max(
//         0,
//         Math.floor((expiryTime - Date.now()) / 1000)
//       );
//       setTimeLeft(remaining);
//       if (remaining === 0) setIsExpired(true);
//     };

//     tick();
//     const interval = setInterval(tick, 1000);
//     return () => clearInterval(interval);
//   }, [expiryTime]);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   const handleVerify = async () => {
//     if (otp.length !== 6) return alert("Enter valid 6-digit OTP");
//     if (isExpired) return alert("OTP expired. Please resend.");

//     try {
//       const result = await dispatch(
//         verifyOtp({ phone, otp })
//       ).unwrap();

//       Cookies.set("token", result.token, { expires: 7, path: "/" });
//       Cookies.set("user", JSON.stringify(result.data), {
//         expires: 7,
//         path: "/",
//       });

//       Cookies.remove("verify_phone", { path: "/" });
//       Cookies.remove("otp_expiry", { path: "/" });

//       router.replace("/");
//     } catch {}
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="verify-wrapper">
//         <div className="verify-left">
//           <div className="verify-overlay">
//             <div className="verify-left-content">
//               <h1>Secure OTP Verification</h1>
//               <p>We sent a verification code to +91{phone}</p>
//             </div>
//           </div>
//         </div>

//         <div className="verify-right">
//           <div className="verify-card">
//             <h2 >Verify OTP</h2>

//             {error && <p className="verify-error">{error}</p>}

//             <input
//                 className={`verify-otp-input ${!isExpired ? "blink-input" : ""}`}
//               placeholder="Enter 6-digit OTP"
//               value={otp}
//               maxLength={6}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setOtp(e.target.value)
//               }
//             />

//             <p className={`verify-timer ${isExpired ? "expired" : ""}`}>
//               {isExpired
//                 ? "OTP expired"
//                 : `Expires in ${formatTime(timeLeft)}`}
//             </p>

//             <button
//               className="verify-btn"
//               onClick={handleVerify}
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>

//             <p className="verify-resend">
//               Didn’t receive code? <span>Resend OTP</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';
import VerifyPage from "@/app/components/verify/VerifyPage";

export default function Page() {
  return <VerifyPage />;
}