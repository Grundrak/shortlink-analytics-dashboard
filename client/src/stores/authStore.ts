import { create } from 'zustand';
import { User } from '../types';
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>( 
  // persist(
  //   (set) => ({
  //     user: null,
  //     token: null,
  //     isLoading: false,
  //     error: null,

  //     login: async (email: string, password: string) => { 


  //     },





  //   })
  // )
)