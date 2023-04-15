import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UpdateTasksStoreState {
  shouldRefetchTasks: boolean;
  toggleShouldRefetchTasks: () => void;

}
export const useUpdateTasksStore = create<UpdateTasksStoreState>()(
  devtools((set) => ({
    shouldRefetchTasks: false,
    toggleShouldRefetchTasks: () => set((state) => ({ shouldRefetchTasks: !state.shouldRefetchTasks })),
  }))
)
