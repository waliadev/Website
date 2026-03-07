export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}