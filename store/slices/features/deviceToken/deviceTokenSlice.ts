// src/store/slices/features/deviceToken/deviceTokenSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  DeviceTokenState,
  SaveDeviceTokenPayload,
  SaveDeviceTokenResponse,
} from "./deviceTokentypes";

// ✅ Async Thunk
export const saveDeviceToken = createAsyncThunk<
  SaveDeviceTokenResponse,
  SaveDeviceTokenPayload,
  { rejectValue: string }
>(
  "deviceToken/saveDeviceToken",
  async ({ device_token, device_type }, { rejectWithValue }) => {
    try {

        console.log("Saving Device token:", device_token);
      const response = await api.post(
        "/auth/users/save-device-token",
        {
          device_token,
          device_type,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ✅ Initial State
const initialState: DeviceTokenState = {
  loading: false,
  success: false,
  error: null,
};

// ✅ Slice
const deviceTokenSlice = createSlice({
  name: "deviceToken",
  initialState,
  reducers: {
    resetDeviceTokenState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDeviceToken.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(saveDeviceToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveDeviceToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to save device token";
      });
  },
});

// ✅ Exports
export const { resetDeviceTokenState } = deviceTokenSlice.actions;
export const deviceTokenReducer = deviceTokenSlice.reducer;