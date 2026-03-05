import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  InteractionRequest,
  InteractionResponse,
  InteractionState,
} from "./interactionTypes";
import type { RootState } from "@/store";

/* ================= INITIAL STATE ================= */

const initialState: InteractionState = {
  loading: false,
  error: null,
  success: false,
};

/* ================= THUNK ================= */

export const sendAgentInteraction = createAsyncThunk<
  InteractionResponse,
  InteractionRequest,
  { state: RootState; rejectValue: string }
>(
  "interaction/sendAgentInteraction",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      // ✅ Native URLSearchParams (no qs)
      const data = new URLSearchParams();
      data.append("agentId", String(payload.agentId));
      data.append("click_type", payload.click_type);
      data.append("clicked_from", payload.clicked_from);

      const response = await api.post(
        "/auth/users/interactions/click",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Interaction failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    resetInteractionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAgentInteraction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAgentInteraction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendAgentInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetInteractionState } = interactionSlice.actions;
export default interactionSlice.reducer;