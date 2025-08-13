import { create } from "zustand";
import Storage from "../utils/storage";

interface AuthState {
  accessToken?: string;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Storage.getAccessToken(),

  setAccessToken: (token) => {
    Storage.setAccessToken(token);
    set({ accessToken: token });
  },

  clearAuth: () => {
    Storage.clearStorage();
    set({ accessToken: undefined });
  },
}));
