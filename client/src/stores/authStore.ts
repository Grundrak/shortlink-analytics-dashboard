import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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

// Create a safe storage wrapper to handle storage access errors
const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

// Safely access localStorage
const safeSetToken = (token: string): void => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.warn('Failed to store token in localStorage:', error);
  }
};

const safeRemoveToken = (): void => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.warn('Failed to remove token from localStorage:', error);
  }
};

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
          
          // For testing only - add a debug message
          console.log("Login attempt with:", { email, password });
          
          try {
            // Try the actual API call
            const response = await authApi.login({ email, password });
            
            // Safely store token for API calls
            safeSetToken(response.token);
  
            set({
              user: response.user,
              token: response.token,
              isLoading: false,
              error: null,
            });
          } catch (apiError) {
            console.error("API Error during login:", apiError);
            
            // Regular error handling
            throw apiError;
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.register({ name, email, password });

          // Safely store token for API calls
          safeSetToken(response.token);

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
        // Safely remove token from localStorage
        safeRemoveToken();

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
      storage: createJSONStorage(() => safeStorage),
    }
  )
);