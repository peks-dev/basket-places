import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      currentTheme: "dark",
      changeTheme: () =>
        set((state) => ({
          ...state,
          currentTheme: state.currentTheme === "dark" ? "light" : "dark",
        })),
    }),
    { name: "theme-state" }
  )
);
