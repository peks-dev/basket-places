import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserCourtsRegisteredStore = create(
  persist(
    (set) => ({
      userCourtsList: [],
      courtsFetched: false,
      saveUserCourtsRegistered: (courts) =>
        set({ courtsFetched: true, userCourtsList: courts }),
      resetUserCourtsList: () =>
        set({ courtsFetched: false, userCourtsList: [] }),
    }),
    { name: "user-courts-registered" }
  )
);
