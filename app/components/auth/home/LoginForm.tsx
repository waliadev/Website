import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/slices/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"),
  });

  const formik = useFormik({
    initialValues: { phone: "" },
    validationSchema,
    onSubmit: (values) => {
      Cookies.set("verify_phone", values.phone, {
        expires: 1 / 24,
        path: "/",
      });

      Cookies.set("otp_expiry", (Date.now() + 180000).toString(), {
        path: "/",
      });

      dispatch(loginUser({ phone: values.phone }));
    
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Phone Number</label>

      <div
        className={`phoneInput ${
          formik.touched.phone && formik.errors.phone
            ? "inputError"
            : ""
        }`}
      >
        <div className="country">
          <img
            src="https://flagcdn.com/in.svg"
            alt="India"
            className="flag"
          />
          <span>+91</span>
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Enter mobile number"
          maxLength={10}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.touched.phone && formik.errors.phone && (
        <p className="errorText">{formik.errors.phone}</p>
      )}

      {error && <p className="errorText">{error}</p>}

      <button type="submit" className="otpBtn" disabled={loading}>
        {loading ? "Sending OTP..." : "Login"}
      </button>
    </form>
  );
}