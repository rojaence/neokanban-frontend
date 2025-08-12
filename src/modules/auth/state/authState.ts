import { create } from 'zustand';

interface AuthStateI {
  isAuthenticated: boolean;
  userData: object | null;
  setLogin: (token: string) => void;
  setUserData: (data: UserDataI) => void;
}

interface UserDataI {
  username: string;
}

const useAuthState = create<AuthStateI>()((set) => ({
  isAuthenticated: false,
  userData: null,
  setLogin: (token: string) => {
    if (token) set({ isAuthenticated: true });
  },
  setUserData: (data: UserDataI) => {
    set({ userData: data });
  },
}));

export default useAuthState;
