// "use client";

// import { useEffect } from "react";
// import Navbar from "@/app/components/shared/components/Navbar";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearAuthError } from "@/store/slices/features/auth/authSlice";
// import type { AppDispatch, RootState } from "@/store";
// import GoogleLoginButton from "@/app/components/GoogleLoginButton";

// export default function LoginPage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const { loading, error, otpSent } = useSelector(
//     (state: RootState) => state.auth
//   );

//   // ================= REDIRECT WHEN OTP SENT =================
//   useEffect(() => {
//     if (otpSent) {
//       router.push("/verify-otp");
//     }
//   }, [otpSent, router]);

//   // ================= CLEAR ERROR ON UNMOUNT =================
//   useEffect(() => {
//     return () => {
//       dispatch(clearAuthError());
//     };
//   }, [dispatch]);

//   // ================= VALIDATION =================
//   const validationSchema = Yup.object({
//     phone: Yup.string()
//       .required("Mobile number is required")
//       .matches(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"),
//   });

//   // ================= FORMIK =================
//   const formik = useFormik({
//     initialValues: {
//       phone: "",
//     },
//     validationSchema,
//     validateOnChange: true,
//     onSubmit: async (values) => {
//       // ✅ save phone in cookie
//       Cookies.set("verify_phone", values.phone, {
//         expires: 1 / 24,
//         path: "/",
//       });

//       // ✅ otp expiry (3 min)
//       Cookies.set("otp_expiry", (Date.now() + 180000).toString(), {
//         path: "/",
//       });

//       // ✅ Redux login call
//       dispatch(loginUser({ phone: values.phone }));
//     },
//   });

//   return (
//     <>
//       <Navbar />

//       <div className="loginWrapper">
//         {/* LEFT */}
//         <div className="leftSide">
//           <div className="overlay">
//             <div className="leftContent">
//               <h1>
//                 Connect with Trusted Property Dealers
//                 <br />
//                 Near You
//               </h1>
//               <p>
//                 Discover verified brokers and find your perfect property
//                 faster.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="rightSide">
//           <div className="loginCard">
//             <form onSubmit={formik.handleSubmit}>
//               <label>Phone Number</label>

//               <div
//                 className={`phoneInput ${
//                   formik.touched.phone && formik.errors.phone
//                     ? "inputError"
//                     : ""
//                 }`}
//               >
//                 <span className="country">+91</span>

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Enter mobile number"
//                   maxLength={10}
//                   value={formik.values.phone}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//               </div>

//               {/* validation error */}
//               {formik.touched.phone && formik.errors.phone && (
//                 <p className="errorText">{formik.errors.phone}</p>
//               )}

//               {/* API error */}
//               {error && <p className="errorText">{error}</p>}

//               <button
//                 type="submit"
//                 className="otpBtn"
//                 disabled={loading}
//               >
//                 {loading ? "Sending OTP..." : "Login"}
//               </button>
//             </form>

//             <div className="divider">
//               <span>OR</span>
//             </div>

//             <GoogleLoginButton/>

//             <p className="termsText">
//               By continuing you agree to our <span>Terms</span> &{" "}
//               <span>Privacy Policy</span>
//             </p>
//           </div>
//         </div>
//       </div>

   
//     </>
//   );
// }

import type { Metadata } from "next";
import LoginPage from "@/app/components/auth/";



export const metadata: Metadata = {
  title: "Login | BrokerDash - Real Estate Brokers Platform",

  description:
    "Login to BrokerDash to connect with verified property dealers, brokers, and real estate agents. Manage listings, track leads, and grow your real estate business.",

  keywords: [
    "BrokerDash login",
    "real estate broker login",
    "property dealer login",
    "real estate agent dashboard",
    "broker account login",
  ],

  alternates: {
    canonical: "https://brokerdash.in/login",
  },

  openGraph: {
    title: "Login | BrokerDash",
    description:
      "Access your BrokerDash account to manage property listings and connect with clients.",
    url: "https://brokerdash.in/login",
    siteName: "BrokerDash",
    type: "website",
    images: [
      {
        url: "https://brokerdash.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrokerDash - Real Estate Brokers Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Login | BrokerDash",
    description:
      "Sign in to your BrokerDash account to manage property listings and connect with buyers.",
    images: ["https://brokerdash.in/og-image.jpg"],
  },

  robots: {
    index: false,  // 🔥 Login page ko index nahi karna chahiye
    follow: false,
    nocache: true,
  },
};

export default function Page() {
  return <LoginPage />;
}