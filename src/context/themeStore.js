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
      applyTheme: () =>
        set((state) => {
          document.body.setAttribute("data-theme", state.currentTheme);
          return { ...state };
        }),
    }),
    { name: "theme-state" }
  )
);
