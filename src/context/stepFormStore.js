import { create } from "zustand";
import { persist } from "zustand/middleware";
import CourtModel from "@/models/court.model";

const blankStepFormData = new CourtModel();

const initialState = {
  isFormStarted: false,
  currentStep: 0,
  formData: blankStepFormData,
};

export const useStepFormStore = create(
  persist(
    (set) => ({
      ...initialState,
      startRegister: () => {
        set((state) => ({ ...state, isFormStarted: !state.isFormStarted }));
      },
      nextStep: (e) => {
        e.preventDefault(); // evitar recargar pagina
        set((state) => {
          if (state.currentStep < 5) {
            return { ...state, currentStep: state.currentStep + 1 };
          }
        });
      },
      prevStep: (e) => {
        e.preventDefault(); // evitar recargar pagina
        set((state) => {
          if (state.currentStep > 0) {
            return { ...state, currentStep: state.currentStep - 1 };
          }
        });
      },
      resetSteps: () => set((state) => ({ ...state, currentStep: 0 })),
      resetStepForm: () => {
        set(initialState);
      },
      updateCoordinates: (newCoordinates) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            location: {
              ...state.formData.location,
              coordinates: newCoordinates,
            },
          },
        })),
      updateCountry: (newCountry) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            location: { ...state.formData.location, country: newCountry },
          },
        })),
      updateState: (newState) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            location: { ...state.formData.location, state: newState },
          },
        })),
      updateCity: (newCity) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            location: { ...state.formData.location, city: newCity },
          },
        })),
      updateImages: (newImages) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            images: newImages,
          },
        })),
      updateName: (newName) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, name: newName },
        })),
      updateDescription: (newDescription) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, description: newDescription },
        })),
      updateGameLevel: (newGameLevel) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, game_level: newGameLevel },
        })),
      updatePlaceType: (newPlaceType) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, place_type: newPlaceType },
        })),
      updateRoof: (newRoof) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, roof: newRoof },
        })),
      updateFloorType: (newFloorType) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, floor_type: newFloorType },
        })),
      updateSchedule: (newSchedule) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            schedules: [...state.formData.schedules, newSchedule],
          },
        })),
      removeSchedule: () =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            schedules: [...state.formData.schedules.slice(0, -1)],
          },
        })),
      updateWifi: (newWifi) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            services: { ...state.formData.services, wifi: newWifi },
          },
        })),
      updateShop: (newShop) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            services: { ...state.formData.services, shop: newShop },
          },
        })),
      updateTransport: (newTransport) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            services: {
              ...state.formData.services,
              transport: newTransport,
            },
          },
        })),
      updateBathroom: (newBathroom) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            services: {
              ...state.formData.services,
              bathroom: newBathroom,
            },
          },
        })),
      updateId: (courtId) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, id: courtId },
        })),
      updateOwner: (newOwner) =>
        set((state) => ({
          ...state,
          formData: { ...state.formData, owner: newOwner },
        })),
    }),
    { name: "step-form" }
  )
);
