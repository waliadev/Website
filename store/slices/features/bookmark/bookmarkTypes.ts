export interface BookmarkRequest {
  agent_id: number;
}

export interface BookmarkResponse {
  success: boolean;
  message: string;
}

export interface BookmarkAgent {
  agent_id: number;
}

export interface BookmarkState {
  loading: boolean;
  error: string | null;
  bookmarks: number[]; // store only agent IDs
}