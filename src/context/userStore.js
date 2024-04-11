import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, logout } from "../services/supabase/auth.service";
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
import UserModel from "@/models/user.model";

const userData = { session: null, profile: new UserModel() };

export const useUserStore = create(
  persist(
    (set) => ({
      ...userData,
      login: async (email, password) => {
        try {
          const data = await login(email, password);
          if (data.session) {
            const profileData = await fetchDataOnTable(
              "profiles",
              "id",
              data.user.id
            );
            set((state) => ({
              session: data.session,
              profile: profileData[0],
            }));
          }
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        logout();
        set(userData);
      },
      updateUserLocation: (coordinates) =>
        set((state) => ({
          ...state,
          profile: { ...state.profile, location: coordinates },
        })),
      refreshProfile: (data) => set((state) => ({ ...state, profile: data })),
      resetUserGlobalState: () => set(userData),
    }),
    { name: "session-data" }
  )
);
