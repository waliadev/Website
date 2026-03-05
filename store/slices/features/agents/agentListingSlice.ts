import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { AgentState, AgentsApiResponse } from "@/store/slices/features/agents/agentTypes";

const initialState: AgentState = {
  agents: [],
  loading: false,
  error: null,
};

export const fetchAgentsByLocation = createAsyncThunk<
  AgentsApiResponse,
  { locationId: number },
  { rejectValue: string }
>(
  "agents/fetchByLocation",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `auth/users/by-location?locationId=${payload.locationId}`
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch agents"
      );
    }
  }
);

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentsByLocation.fulfilled, (state, action) => {
        
        state.loading = false;
        state.agents = action.payload.data.data; // ✅ correct mapping
      })
      .addCase(fetchAgentsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default agentSlice.reducer;