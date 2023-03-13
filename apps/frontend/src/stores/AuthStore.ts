import { UserFromToken } from "@honack/util-shared-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: UserFromToken | null;
  login: (user: UserFromToken) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    login: (user: UserFromToken) => set({ user }),
    logout: () => set({ user: null }),
  }))
)
