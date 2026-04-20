import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { getToken } from "@/utils/token";

interface Agent {
  agent_id: number;
  name: string;
  agency_name: string;
  rating: string;
  address: string;
  image_urls: string[];
}

interface BookmarkState {
  loading: boolean;
  error: string | null;
  bookmarks: number[];
  bookmarksData: Agent[];
}

const initialState: BookmarkState = {
  loading: false,
  error: null,
  bookmarks: [],
  bookmarksData: [],
};

/* ================= FETCH ================= */

export const fetchBookmarks = createAsyncThunk<
  Agent[],
  number | undefined,
  { rejectValue: string }
>("bookmark/fetchBookmarks", async (agent_id, { rejectWithValue }) => {
  try {
    const response = await api.get("/auth/users/bookmark");

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Fetch failed"
    );
  }
});

/* ================= TOGGLE ================= */

export const toggleBookmark = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("bookmark/toggleBookmark", async (agent_id, { rejectWithValue }) => {
  try {
    const token = getToken();

    await api.post(
      "/auth/users/bookmark",
      { agent_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return agent_id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Bookmark failed"
    );
  }
});

/* ================= SLICE ================= */

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        console.log("fetched bookmarks:",action.payload)
        state.bookmarksData = action.payload;
        state.bookmarks = action.payload.map(
          (item) => item.agent_id
        );
      })

      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const id = action.payload;

        state.bookmarks = state.bookmarks.filter(
          (item) => item !== id
        );

        state.bookmarksData = state.bookmarksData.filter(
          (item) => item.agent_id !== id
        );
      });
  },
});

export default bookmarkSlice.reducer;