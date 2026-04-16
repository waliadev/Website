export type ToastType = "success" | "error" | "info";

export const showToast = (message: string, type: ToastType) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: { message, type },
    })
  );
};