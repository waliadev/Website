// src/store/auth/auth.types.ts

export interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

export interface LoginPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

/* ✅ Optional: API Response Types (Recommended) */

export interface VerifyOtpResponse {
  token: string;
  data: {
    name: string;
  };
}