import { create } from "zustand";
import Cookies from "js-cookie";
import { User, LoginCredentials, RegisterData } from "@/types";
import { loginUser, registerUser, getUserProfile } from "@/services/auth.api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false, // Start in loading state
  
  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true });
      const tokens = await loginUser(credentials);
      
      // Save tokens in cookies
      Cookies.set("access_token", tokens.access_token, { expires: 1 }); // 1 day
      Cookies.set("refresh_token", tokens.refresh_token, { expires: 7 }); // 7 days

      // Fetch user profile securely using the access token
      const profile = await getUserProfile(tokens.access_token);
      set({ user: profile, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true });
      await registerUser(data);

      // Auto login after parsing registration
      const tokens = await loginUser({ email: data.email, password: data.password });
      
      Cookies.set("access_token", tokens.access_token, { expires: 1 });
      Cookies.set("refresh_token", tokens.refresh_token, { expires: 7 });

      const profile = await getUserProfile(tokens.access_token);
      set({ user: profile, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    set({ user: null, isAuthenticated: false });
  },

  // Calling checkAuth validates the token and sets user state if valid
  checkAuth: async () => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const profile = await getUserProfile(accessToken);
      set({ user: profile, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // If token fails, remove it so they can log back in
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
