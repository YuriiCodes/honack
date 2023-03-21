import { TaskType } from "@honack/util-shared-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TaskState {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  removeTasks: () => void;
  addTask: (task: TaskType) => void;
  removeTask: (task: TaskType) => void;
  updateTask: (task: TaskType) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools((set, get) => ({
    tasks: [],
    setTasks: (tasks: TaskType[]) => set({ tasks }),
    removeTasks: () => set({ tasks: [] }),
    addTask: (task: TaskType) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (task: TaskType) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== task.id) })),
    updateTask: (task: TaskType) => set((state) => ({
      tasks: state.tasks.map((t) => t.id === task.id ? task : t)
    }))
  }))
);
