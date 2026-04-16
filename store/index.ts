import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/features/auth/authSlice";
import configReducer from "@/store/slices/features/config/configSlice";
import locationReducer from "@/store/slices/features/location/locationSlice";
import bannerReducer  from "@/store/slices/features/banner/bannerSlice"
import agentListingReducer from "@/store/slices/features/agents/agentListingSlice";
import interactionReducer from "@/store/slices/features/interactions/interactionSlice"
import bookmarkReducer from "@/store/slices/features/bookmark/bookmarkSlice"
import profileReducer from "@/store/slices/features/profile/profileSlice";
import reviewReducer from "@/store/slices/features/review/reviewSlice";
import { deviceTokenReducer } from "@/store//slices/features/deviceToken/deviceTokenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    location: locationReducer,
    banner: bannerReducer,
    agentListing: agentListingReducer,
    interaction: interactionReducer,
    bookmark: bookmarkReducer,
    profile: profileReducer,
    review: reviewReducer,
    deviceToken: deviceTokenReducer,

  },
});

// ✅ VERY IMPORTANT TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;