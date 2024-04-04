import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  alerts: [],
};

export const useToastStore = create(
  persist(
    (set) => ({
      ...initialState,
      createToast: (text, type) => {
        const id = Date.now();
        const timeoutId = setTimeout(() => {
          set((state) => ({
            ...state,
            alerts: state.alerts.filter((t) => t.id !== id),
          }));
        }, 4000); // Cambiado a 4000 para que el toast se elimine después de 4 segundos
        set((state) => ({
          ...state,
          alerts: [...state.alerts, { text, type, id, timeoutId }],
        }));
      },
      resetToast: () => set(initialState),
    }),
    { name: "toast-state" }
  )
);
