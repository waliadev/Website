import { AppDispatch } from "@/store";
import { sendAgentInteraction } from "@/store/slices/features/interactions/interactionSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getToken } from "@/utils/token";

type ClickType = "call" | "whatsapp" | "bookmark" | "map";

export const handleProtectedInteraction = (
  dispatch: AppDispatch,
  router: AppRouterInstance,
  agentId: number,
  type: ClickType,
  callback?: () => void
) => {
  const token = getToken();


   if (!token) {
    router.push("/sign-in");
    return;
  }


  // ✅ Token exists → hit API
  dispatch(
    sendAgentInteraction({
      agentId,
      click_type: type,
      clicked_from: "browser",
    })
  );

  // Execute actual action
  if (callback) callback();
};