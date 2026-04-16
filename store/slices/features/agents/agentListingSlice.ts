import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

import {
  AgentState,
  AgentsApiResponse,
  AgentDetailApiResponse,
} from "./agentTypes";

/* ================= INITIAL STATE ================= */

const initialState: AgentState = {
  agents: [],
  agentDetail: null,

  loading: false,
  agentDetailLoading: false,

  error: null,
};

/* ================= THUNKS ================= */

// ✅ Agents by Location
export const fetchAgentsByLocation = createAsyncThunk<
  AgentsApiResponse,
  { locationId: number },
  { rejectValue: string }
>(
  "agents/fetchByLocation",
  async ({ locationId }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `auth/users/by-location?locationId=${locationId}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch agents"
      );
    }
  }
);

// ✅ Agent Detail
export const fetchAgentDetail = createAsyncThunk<
  AgentDetailApiResponse,
  { agentId: number },
  { rejectValue: string }
>(
  "agents/fetchAgentDetail",
  async ({ agentId }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `auth/users/agent-detail/${agentId}`
      );
      console.log(res.data,"agent detail response")
      return res.data.agentdetail;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch agent detail"
      );
    }
  }
);

/* ================= SLICE ================= */

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    clearAgentDetail: (state) => {
      state.agentDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔵 Agent List
      .addCase(fetchAgentsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.data.data;
      })
      .addCase(fetchAgentsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // 🟢 Agent Detail
      .addCase(fetchAgentDetail.pending, (state) => {
        state.agentDetailLoading = true;
        state.error = null;
      })
      .addCase(fetchAgentDetail.fulfilled, (state, action) => {
        state.agentDetailLoading = false;
        state.agentDetail = action.payload.data;
      })
      .addCase(fetchAgentDetail.rejected, (state, action) => {
        state.agentDetailLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORT ================= */

export const { clearAgentDetail } = agentSlice.actions;
export default agentSlice.reducer;