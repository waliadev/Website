// src/store/banner/banner.types.ts

export interface Banner {
  banner_id: number;
  title: string;
  image_url: string;
  link_url?: string;
  position: string;
  is_active: number;
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