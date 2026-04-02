import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  LocationState,
  City,
  Area,
  Locality,
  CityAreaPayload,
  LocalityPayload,
  SearchLocalityPayload,
} from "./locationTypes";

/* ================= INITIAL STATE ================= */

const initialState: LocationState = {
  cities: [],
  areas: [],
  localities: [],
  searchedLocalities: [],
  searchLoading: false,
  loading: false,
  error: null,
};

/* ================= HELPER ================= */

const extractArray = <T>(response: any): T[] => {
  if (!response) return [];

  if (response.formattedData) return response.formattedData;
  if (response.data) return response.data;
  if (Array.isArray(response)) return response;

  return [];
};

/* ================= FETCH CITIES ================= */

export const fetchCities = createAsyncThunk<
  City[],
  void,
  { rejectValue: string }
>("location/fetchCities", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("auth/cities", {
      params: { t: Date.now() },
    });

    return extractArray<City>(res.data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch cities"
    );
  }
});

/* ================= FETCH AREAS ================= */

export const fetchAreas = createAsyncThunk<
  Area[],
  CityAreaPayload,
  { rejectValue: string }
>("location/fetchAreas", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.get(`auth/areas?cityId=${payload.id}`);
    return extractArray<Area>(res.data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch areas"
    );
  }
});

/* ================= FETCH LOCALITIES ================= */

export const fetchLocalities = createAsyncThunk<
  Locality[],
  LocalityPayload,
  { rejectValue: string }
>("location/fetchLocalities", async (payload, { rejectWithValue }) => {
  try {
    let url = `auth/localities?cityId=${payload.cityId}`;

    if (payload.areaId) {
      url = `auth/localities?areaId=${payload.areaId}&cityId=${payload.cityId}`;
    }

    const res = await api.get(url);
    return extractArray<Locality>(res.data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        "Failed to fetch localities"
    );
  }
});

/* ================= SEARCH LOCALITIES ================= */

export const searchLocalities = createAsyncThunk<
  Locality[],
  SearchLocalityPayload,
  { rejectValue: string }
>(
  "location/searchLocalities",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `auth/search/localities?name=${payload.name}`
      );
      return extractArray<Locality>(res.data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to search localities"
      );
    }
  }
);

/* ================= SLICE ================= */

const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    clearLocationError: (state) => {
      state.error = null;
    },

    /* 🔥 RESET AREAS + LOCALITIES */
    resetAreas: (state) => {
      state.areas = [];
      state.localities = [];
    },

    /* 🔥 RESET ONLY LOCALITIES */
    resetLocalities: (state) => {
      state.localities = [];
    },

    /* 🔥 MAIN FIX (IMPORTANT) */
    resetAllLocationData: (state) => {
      state.areas = [];
      state.localities = [];
      state.searchedLocalities = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== CITIES ===== */
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      /* ===== AREAS ===== */
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      /* ===== LOCALITIES ===== */
      .addCase(fetchLocalities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocalities.fulfilled, (state, action) => {
        state.loading = false;
        state.localities = action.payload;
      })
      .addCase(fetchLocalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      /* ===== SEARCH ===== */
      .addCase(searchLocalities.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchLocalities.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchedLocalities = action.payload;
      })
      .addCase(searchLocalities.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload || null;
      });
  },
});

/* ================= EXPORT ================= */

export const {
  clearLocationError,
  resetAreas,
  resetLocalities,
  resetAllLocationData, // 🔥 IMPORTANT
} = locationSlice.actions;

export default locationSlice.reducer;