import { create } from "zustand";
import { User } from "@/lib/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    if (email === "admin@cloudify.com" && password === "admin123") {
      const user: User = {
        id: "1",
        email: "admin@cloudify.com",
        name: "Admin User",
      };
      
      document.cookie = "auth-token=mock-token; path=/; max-age=86400";+
      
      set({ user, isAuthenticated: true });
    } else {
      throw new Error("Invalid credentials");
    }
  },
  logout: () => {
    document.cookie = "auth-token=; path=/; max-age=0";
    set({ user: null, isAuthenticated: false });
  },
}));