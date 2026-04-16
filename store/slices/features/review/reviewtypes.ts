export interface Review {
  id: number;
  comment: string;
  rating: number;
  user_id?: number;
  agent_id?: number;
  created_at?: string;
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}