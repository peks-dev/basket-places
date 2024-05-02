import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create(
  persist(
    (set) => ({
      commentsList: [],
      commentsFetched: false,
      saveComments: (data) =>
        set({ commentsList: data, commentsFetched: true }),
      resetComments: () => set({ commentsList: [], commentsFetched: false }),
    }),
    { name: "court-details-comments" }
  )
);
