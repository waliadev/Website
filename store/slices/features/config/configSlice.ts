import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  ConfigState,
  FetchConfigResponse,
  ContentItem,
} from "@/store/slices/features/config/configtypes";

/* ================= INITIAL STATE ================= */

const initialState: ConfigState = {
  loading: false,
  error: null,
  contactUs: null,
  privacyPolicy: null,
  terms: null,
  aboutUs: null,
};

/* ================= HELPER FUNCTION ================= */

// 🔥 This safely extracts data from any backend structure
const extractData = (response: any): ContentItem | null => {
  if (!response) return null;

  // case: { data: { ... } }
  if (response.data) {
    // case: { data: { data: {...} } }
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  }

  // case: direct object
  return response;
};

/* ================= ASYNC THUNK ================= */

export const fetchAppConfiguration = createAsyncThunk<
  FetchConfigResponse,
  void,
  { rejectValue: string }
>(
  "config/fetchAppConfiguration",
  async (_, { rejectWithValue }) => {
    try {
      const [contactRes, privacyRes, termsRes, aboutRes] =
        await Promise.all([
          api.get("auth/contact-us"),
          api.get("auth/privacy-policy"),
          api.get("auth/terms"),
          api.get("auth/about-us"),
        ]);

      return {
        contactUs: extractData(contactRes.data),
        privacyPolicy: extractData(privacyRes.data),
        terms: extractData(termsRes.data),
        aboutUs: extractData(aboutRes.data),
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load configuration"
      );
    }
  }
);

/* ================= SLICE ================= */

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    clearConfigError: (state) => {
      state.error = null;
    },
    resetConfig: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAppConfiguration.fulfilled, (state, action) => {
        state.loading = false;

        state.contactUs = action.payload.contactUs;
        state.privacyPolicy = action.payload.privacyPolicy;
        state.terms = action.payload.terms;
        state.aboutUs = action.payload.aboutUs;
      })

      .addCase(fetchAppConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load configuration";
      });
  },
});

export const { clearConfigError, resetConfig } =
  configSlice.actions;

export default configSlice.reducer;