import { create } from "zustand";
import { persist } from "zustand/middleware";
import CourtModel from "@/models/court.model.js";

const courtData = new CourtModel();

export const useCourtDetailsStore = create(
  persist(
    (set) => ({
      courtData: courtData,
      saveCourtData: (newCourtData) =>
        set((state) => ({
          courtData: newCourtData,
        })),
      emptyGlobalCourtData: () => set((state) => ({ courtData: courtData })),
    }),
    { name: "court-details-data" }
  )
);
