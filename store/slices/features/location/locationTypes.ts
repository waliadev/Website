// src/store/slices/features/location/locationTypes.ts

export interface City {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
  cityId: number;
}

export interface Locality {
  id: number;
  name: string;
  cityId: number;
  areaId?: number;
}

export interface LocationState {
  selectedCityId: number | null;   // ✅ add this
  selectedCityName: string;        // ✅ add this

  cities: City[];
  areas: Area[];
  localities: Locality[];
  searchedLocalities: Locality[];
  searchLoading: boolean;
  loading: boolean;
  error: string | null;
}

export interface CityAreaPayload {
  id: number;
}

export interface LocalityPayload {
  cityId: number;
  areaId?: number;
}

export interface SearchLocalityPayload {
  name: string;
}