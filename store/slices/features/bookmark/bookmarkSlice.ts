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

/* ===== FETCH ===== */

export const fetchBookmarks = createAsyncThunk<
  Agent[],
  void,
  { rejectValue: string }
>("bookmark/fetchBookmarks", async (_, { rejectWithValue }) => {
  try {
    const token = getToken();

    const response = await api.get("/auth/users/bookmark", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Fetch failed"
    );
  }
});

/* ===== TOGGLE ===== */

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
      error.response?.data?.message || "Toggle failed"
    );
  }
});

/* ===== SLICE ===== */

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action", action.payload)
        state.bookmarksData = action.payload.map((item: any) => ({
          ...item,
          agent_id: item.agent.id, // 👈 yahan convert kar diya
        }));
        console.log("hdf", action.payload)
        state.bookmarks = action.payload.map(
          (item) => item.agent_id
        );
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const id = action.payload;

        const exists = state.bookmarks.includes(id);

        if (exists) {
          // ensure present
          if (!state.bookmarksData.some(item => item.agent_id === id)) {
            state.bookmarksData.push({
              agent_id: id,
              name: "",
              agency_name: "",
              rating: "",
              address: "",
              image_urls: [],
            });
          }
        } else {
          // ensure removed
          state.bookmarksData = state.bookmarksData.filter(
            (item) => item.agent_id !== id
          );
        }
      })

      /* TOGGLE (OPTIMISTIC) */
      .addCase(toggleBookmark.pending, (state, action) => {
        const id = action.meta.arg;

        if (state.bookmarks.includes(id)) {
          state.bookmarks = state.bookmarks.filter(
            (item) => item !== id
          );
        } else {
          state.bookmarks.push(id);
        }
      })

      .addCase(toggleBookmark.rejected, (state, action) => {
        const id = action.meta.arg;

        // rollback
        if (state.bookmarks.includes(id)) {
          state.bookmarks = state.bookmarks.filter(
            (item) => item !== id
          );
        } else {
          state.bookmarks.push(id);
        }

        state.error = action.payload || "Toggle failed";
      });
  },
});

export default bookmarkSlice.reducer;