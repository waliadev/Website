import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { getToken } from "@/utils/token";

/* ================= TYPES ================= */

export interface ExpertHelpPayload {
  you_want_to: string;
  property_type : string;
  residential_type: string;

  // ✅ FIX: number type (IDs हैं)
  city: number | null;
  area: number | null;
  location_id: number | null;

  your_requirements: string;
}

interface ExpertHelpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ExpertHelpState = {
  loading: false,
  error: null,
  success: false,
};

/* ================= ADD EXPERT HELP ================= */

export const addExpertHelp = createAsyncThunk<
  any,
  ExpertHelpPayload,
  { rejectValue: string }
>("expertHelp/addExpertHelp", async (data, { rejectWithValue }) => {
  try {
    const token = getToken();

    const response = await api.post(
      "/auth/users/add/expert_help",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Expert Help failed"
    );
  }
});

/* ================= SLICE ================= */

const expertHelpSlice = createSlice({
  name: "expertHelp",
  initialState,
  reducers: {
    resetExpertHelp: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpertHelp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(addExpertHelp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(addExpertHelp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetExpertHelp } = expertHelpSlice.actions;

export default expertHelpSlice.reducer;