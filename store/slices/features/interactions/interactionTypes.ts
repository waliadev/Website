/* ================= REQUEST TYPE ================= */

export interface InteractionRequest {
  agentId: number;
  click_type: "call" | "whatsapp" | "map" | "bookmark";
  clicked_from: "browser" | "app";
}

/* ================= RESPONSE TYPE ================= */

export interface InteractionResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

export interface InteractionState {
  loading: boolean;
  error: string | null;
  success: boolean;
}