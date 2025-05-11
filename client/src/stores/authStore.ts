import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";
import { authApi } from "../api/authApi";
import { ApiError } from "../utils/apiError";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.login({ email, password });

          // Store token for API calls
          localStorage.setItem("token", response.token);

          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof ApiError ? error.message : "An error occurred",
          });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.register({ name, email, password });

          // Store token for API calls
          localStorage.setItem("token", response.token);

          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof ApiError ? error.message : "An error occurred",
          });
          throw error;
        }
      },

      logout: () => {
        // Remove token from localStorage
        localStorage.removeItem("token");

        set({
          user: null,
          token: null,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
