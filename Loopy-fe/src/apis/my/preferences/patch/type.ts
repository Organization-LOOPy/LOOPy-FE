export interface PatchPreferencesRequest {
  preferredKeywords: string[];
}

export interface PatchPreferencesResponse {
  message: string;
  storeFilters: Record<string, boolean>;
  takeOutFilters: Record<string, boolean>;
  menuFilters: Record<string, boolean>;
}
