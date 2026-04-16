import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api"; // ✅ axios instance

/* ================== TYPES ================== */
export interface Review {
  id: number;
  agent_id?: number;
  comment: string;
  rating: number;
  image?: string;
  created_at?: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

/* ================== INITIAL STATE ================== */
const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

/* ================== GET REVIEWS ================== */
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (agent_id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `auth/users/reviews?agent_id=${agent_id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching reviews"
      );
    }
  }
);

/* ================== ADD REVIEW ================== */
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (
    data: {
      agent_id: number;
      comment: string;
      rating: number;
      image?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("agent_id", String(data.agent_id));
      formData.append("comment", data.comment);
      formData.append("rating", String(data.rating));

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await api.post("auth/users/reviews", formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error adding review"
      );
    }
  }
);

/* ================== UPDATE REVIEW ================== */
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async (
    {
      id,
      data,
    }: {
      id: number;
      data: { comment: string; rating: number };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/reviews/${id}`,
        data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error updating review"
      );
    }
  }
);

/* ================== SLICE ================== */
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== GET REVIEWS ===== */
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.data || action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===== ADD REVIEW ===== */
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;

        const newReview = action.payload?.data || action.payload;

        state.reviews.unshift(newReview);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===== UPDATE REVIEW ===== */
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload?.data || action.payload;

        const index = state.reviews.findIndex(
          (r) => r.id === updated.id
        );

        if (index !== -1) {
          state.reviews[index] = updated;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;