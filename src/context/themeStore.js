import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      currentTheme: "dark",
      changeTheme: () =>
        set((state) => {
          document.body.setAttribute(
            "data-theme",
            state.currentTheme === "dark" ? "dark" : "light"
          );
          return {
            ...state,
            currentTheme: state.currentTheme === "dark" ? "light" : "dark",
          };
        }),
    }),
    { name: "theme-state" }
  )
);
