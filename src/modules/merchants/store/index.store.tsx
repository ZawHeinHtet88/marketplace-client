import { create } from "zustand";

interface NewFeedSideBarState {
  isNewFeedOpen: boolean;
  setIsNewFeedOpen: () => void;
}

export const useNewFeedSidebarStore = create<NewFeedSideBarState>()((set) => ({
  isNewFeedOpen: true,
  setIsNewFeedOpen: () =>
    set((state) => ({ isNewFeedOpen: !state.isNewFeedOpen })),
}));
