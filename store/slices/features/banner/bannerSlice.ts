// src/store/banner/banner.slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  BannerState,
  FetchBannerPayload,
  FetchBannerResponse,
} from "@/store/slices/features/banner/bannertypes";

/* ================= INITIAL STATE ================= */

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

/* ================= FETCH ACTIVE BANNERS ================= */

export const fetchActiveBanners = createAsyncThunk<
  FetchBannerResponse,
  FetchBannerPayload,
  { rejectValue: string }
>(
  "banner/fetchActiveBanners",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `auth/users/banners/active?city_id=${payload.city_id}`
      );
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch banners"
      );
    }
  }
);

/* ================= SLICE ================= */

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearBannerError: (state) => {
      state.error = null;
    },
    resetBanners: (state) => {
      state.banners = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })

      .addCase(fetchActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch banners";
      });
  },
});

export const { clearBannerError, resetBanners } =
  bannerSlice.actions;

export default bannerSlice.reducer;