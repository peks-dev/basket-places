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
      updateImagesZ: (newImages) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            images: newImages,
          },
        })),
    }),
    { name: "step-form" }
  )
);
