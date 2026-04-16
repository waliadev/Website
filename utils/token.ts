// src/utils/token.ts
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token") || "";
};


/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!Cookies.get("token");
};