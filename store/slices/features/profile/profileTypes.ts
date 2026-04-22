// ✅ Location Type
export interface LocationType {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// ✅ API से आने वाला raw profile (backend format)
export interface ProfileApi {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  location?: string; // 🔥 backend always string भेजता है
}

// ✅ Frontend usable profile (parsed)
export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  location?: LocationType; // ✅ always object in UI
}

// ✅ Update payload (API को भेजने वाला)
export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  image?: File | string; // 🔥 image upload case
  location?: string;
}

// ✅ Redux State
export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}