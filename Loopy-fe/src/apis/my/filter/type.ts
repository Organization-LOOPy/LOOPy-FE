export interface PreferencesResponse {
  message: string;
  data: {
    preferredStore: Record<string, boolean>;
    preferredTakeout: Record<string, boolean>;
    preferredMenu: Record<string, boolean>;
  };
}
