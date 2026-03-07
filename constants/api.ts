export const API_BASE_URL = "https://api.brokerdash.in/v1/";
export const PUBLIC_BASE_URL = "https://api.brokerdash.in/public/";



export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/sign-in",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
  },

  AGENTS: {
    LIST: "/agents",
    DETAILS: "/agents",
    REVIEWS: "/reviews",
  },

  BOOKMARKS: {
    LIST: "/bookmarks",
    ADD: "/bookmarks/add",
    REMOVE: "/bookmarks/remove",
  },

  PROFILE: {
    GET: "/profile",
    UPDATE: "/profile/update",
  },
};