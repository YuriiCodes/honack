import { ProjectType } from "@honack/util-shared-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface AllProjectsState {
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
  removeProjects: () => void;
  addProject: (project: ProjectType) => void;
  removeProject: (project: ProjectType) => void;
  updateProject: (project: ProjectType) => void;
}

export const useAllProjectsStore = create<AllProjectsState>()(
  devtools((set) => ({
    projects: [],
    setProjects: (projects: ProjectType[]) => set({ projects }),
    removeProjects: () => set({ projects: [] }),
    addProject: (project: ProjectType) => set((state) => ({ projects: [...state.projects, project] })),
    removeProject: (project: ProjectType) => set((state) => ({ projects: state.projects.filter((p) => p.id !== project.id) })),
    updateProject: (project: ProjectType) => set((state) => ({
      projects: state.projects.map((p) => p.id === project.id ? project : p)
    }))
  }))
);
