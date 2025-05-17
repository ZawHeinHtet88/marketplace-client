import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/index.t";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: () => void;
  updateUserFields: (fields: Partial<User>) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      selectedCondo: null,
      login: ({ user, token }) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("userData");
      },

      updateUserFields: (fields: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...fields } : null,
        }));
      },
    }),
    {
      name: "userData",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
