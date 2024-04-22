import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create(
  persist(
    (set) => ({
      commentsList: [],
      fetchCommentsStatus: false,
      saveComments: (data) =>
        set((state) => ({ ...state, commentsList: data })),
      resetComments: () =>
        set(() => ({ commentsList: [], fetchCommentsStatus: false })),
      changeFetchCommentsStatus: () =>
        set((state) => ({
          ...state,
          fetchCommentsStatus: !state.fetchCommentsStatus,
        })),
    }),
    { name: "court-details-comments" }
  )
);
