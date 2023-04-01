import { IterationType, ProjectType } from "@honack/util-shared-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IterationState {
  iterations: IterationType[] | null;
  currentIterationId: number | null;
  setIterations: (iterations: IterationType[]) => void;
  setCurrentIterationId: (id: number) => void;
}

export const useIterationStore = create<IterationState>()(
  devtools((set) => ({
    iterations: null,
    currentIterationId: null,
    setIterations: (iterations: IterationType[]) => set({ iterations }),
    setCurrentIterationId: (id: number) => set({ currentIterationId: id }),
  }))
)
