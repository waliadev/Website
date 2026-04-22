import { getToken } from "@/utils/token";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleProtectedAction = (
  router: AppRouterInstance,
  callback: () => void
) => {
  const token = getToken();

  if (!token) {
    router.push("/auth/sign-in");
    return;
  }

  callback();
};