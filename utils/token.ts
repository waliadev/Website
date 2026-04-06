// src/utils/token.ts

import Cookies from "js-cookie";

/**
 * Get auth token from cookies
 * Returns empty string if token not found
 */
export const getToken = (): string => {
  const token = Cookies.get("token");
   console.log(token,"token in getToken")

  return token ? token : "";
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!Cookies.get("token");
};