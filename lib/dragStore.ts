import { create } from "zustand";

type Actions = {
  whichDraggedTask: string | null;
  onDragTask: (id: string) => void;
};

export const useDragTaskStore = create<Actions>((set, get) => ({
  whichDraggedTask: null,
  onDragTask: (id: string) => set({ whichDraggedTask: id })
}));
