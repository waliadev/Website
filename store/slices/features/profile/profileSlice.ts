import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { getToken } from "@/utils/token"; // ✅ FIX ADDED
import type { ProfileState, Profile } from "./profileTypes";

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
>("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/users/profile");
    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile"
    );
  }
});

/* ================= UPDATE PROFILE ================= */

export const updateProfile = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("profile/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const token = getToken(); // ✅ now works

    const response = await api.put(
      "/auth/users/update/profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Update failed"
    );
  }
});

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