// src/store/banner/banner.types.ts

export interface Banner {
  id: number;
  image_url: string;
  title:string
  redirect_url?: string;
  city_id: number;
  status: "active" | "inactive";
}

export interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

export interface FetchBannerPayload {
  city_id: number;
}

export interface FetchBannerResponse {
  data: Banner[];
}