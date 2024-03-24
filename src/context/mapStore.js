import { create } from "zustand";
import { persist } from "zustand/middleware";

const blankMapPosition = { coordinates: null, zoom: null };

const initialState = {
  mapPagePosition: blankMapPosition,
  mapStepFormPosition: blankMapPosition,
};

export const useMapStore = create(
  persist(
    (set) => ({
      ...initialState,
      updateMapPageCenter: (newCoordiantes) =>
        set((state) => ({
          ...state,
          mapPagePosition: {
            ...state.mapPagePosition,
            coordinates: newCoordiantes,
          },
        })),
      updateMapPageZoom: (newZoom) =>
        set((state) => ({
          ...state,
          mapPagePosition: {
            ...state.mapPagePosition,
            zoom: newZoom,
          },
        })),
      resetMapPage: () => {
        set((state) => ({ ...state, mapPagePosition: blankMapPosition }));
      },
      updateMapStepFormCenter: (newCoordiantes) =>
        set((state) => ({
          ...state,
          mapStepFormPosition: {
            ...state.mapStepFormPosition,
            coordinates: newCoordiantes,
          },
        })),
      updateMapStepFormZoom: (newZoom) =>
        set((state) => ({
          ...state,
          mapStepFormPosition: {
            ...state.mapStepFormPosition,
            zoom: newZoom,
          },
        })),
      resetMapStepForm: () => {
        set((state) => ({ ...state, mapStepFormPosition: blankMapPosition }));
      },
    }),
    { name: "map-state" }
  )
);
