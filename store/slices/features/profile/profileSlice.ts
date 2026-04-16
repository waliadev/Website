import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type { ProfileState, Profile, UpdateProfilePayload } from "./profileTypes";

/* ================= INITIAL STATE ================= */

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};


/* ================= GET PROFILE ================= */

export const getProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/users/profile");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);


/* ================= UPDATE PROFILE ================= */

export const updateProfile = createAsyncThunk<
  Profile,
  UpdateProfilePayload,
  { rejectValue: string }
>(
  "profile/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.patch("auth/users/profile", payload);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);


/* ================= SLICE ================= */

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== GET PROFILE ===== */

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })


      /* ===== UPDATE PROFILE ===== */

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      });
  },
});

export const { clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;