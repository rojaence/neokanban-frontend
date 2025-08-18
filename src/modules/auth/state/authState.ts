import { create } from 'zustand';
import type { UserProfile } from '../models/UserProfile';

interface AuthStateI {
  isAuthenticated: boolean;
  userData: UserProfile | null;
  setUserData: (data?: UserProfile) => void;
}

const useAuthState = create<AuthStateI>()((set) => ({
  isAuthenticated: false,
  userData: null,
  setUserData: (data?: UserProfile) => {
    set({ userData: data, isAuthenticated: data !== null });
  },
}));

export default useAuthState;
