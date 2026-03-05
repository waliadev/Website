// src/store/slices/features/config/configtypes.ts

export interface ContentItem {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConfigState {
  loading: boolean;
  error: string | null;
  contactUs: ContentItem | null;
  privacyPolicy: ContentItem | null;
  terms: ContentItem | null;
  aboutUs: ContentItem | null;
}

export interface FetchConfigResponse {
  contactUs: ContentItem | null;
  privacyPolicy: ContentItem | null;
  terms: ContentItem | null;
  aboutUs: ContentItem | null;
}