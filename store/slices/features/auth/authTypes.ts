// src/store/auth/auth.types.ts

/* ================= AUTH STATE ================= */

export interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;

  // ✅ FIX: use singular (consistent everywhere)
  token: string | null;

  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

/* ================= PAYLOADS ================= */

export interface LoginPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

/* ================= API RESPONSE TYPES ================= */

export interface VerifyOtpResponse {
  // ✅ FIX: match state naming
  token: string;

  data: {
    name: string;
  };
}