// src/store/deviceToken/deviceToken.types.ts

export interface DeviceTokenState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ✅ Payload (API me jo bhej rahe ho) */
export interface SaveDeviceTokenPayload {
  device_token: string;
  device_type: string;
}

/* ✅ API Response (optional but recommended) */
export interface SaveDeviceTokenResponse {
  success: boolean;
  message: string;
}