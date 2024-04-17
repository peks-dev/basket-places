import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserCourtsRegisteredStore = create(
  persist(
    (set) => ({
      userCourtsList: [],
      saveUserCourtsRegistered: (courts) => set({ userCourtsList: courts }),
      resetUserCourtsList: () => set({ userCourtsList: [] }),
    }),
    { name: "user-courts-registered" }
  )
);
