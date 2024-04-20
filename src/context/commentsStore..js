import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create(
  persist(
    (set) => ({
      commentsList: [],
      saveComments: (data) => set(() => ({ commentsList: data })),
      resetComments: () => set(() => ({ commentsList: [] })),
    }),
    { name: "court-details-comments" }
  )
);
