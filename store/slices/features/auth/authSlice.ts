// src/store/auth/auth.slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  AuthState,
  LoginPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/store/slices/features/auth/authTypes";

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  token: null,
  loading: false,
  error: null,
  otpSent: false,
};

/* ================= LOGIN ================= */

export const loginUser = createAsyncThunk<
  any,                // return type (you can improve later)
  LoginPayload,       // payload type
  { rejectValue: string }
>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/users/login", payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================= VERIFY OTP ================= */

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,  // ✅ return type
  VerifyOtpPayload,   // payload type
  { rejectValue: string }
>(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/users/verify-otp", payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

/* ================= RESEND OTP ================= */

export const resendOtp = createAsyncThunk<
  any,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/users/resent-otp", payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);


/* ================= GOOGLE LOGIN ================= */

export const loginWithGoogle = createAsyncThunk<
  any,
  { idToken: string },
  { rejectValue: string }
>(
  "auth/loginWithGoogle",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/user/auth/google/mobile", payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
      state.token = null;
      state.otpSent = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      /* ===== VERIFY OTP ===== */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.userName = action.payload.data.name;
        state.otpSent = false;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      /* ===== RESEND OTP ===== */
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Resend OTP failed";
      })
      /* ===== GOOGLE LOGIN ===== */

      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        state.token = action.payload.tokens.access.token;
        state.userName = action.payload.user.name;

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "token",
            action.payload.tokens.access.token
          );
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google login failed";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;