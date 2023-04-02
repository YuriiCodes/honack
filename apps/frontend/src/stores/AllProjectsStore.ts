import { ProjectType, ProjectUsersType } from "@honack/util-shared-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface AllProjectsState {
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
  getProjectById: (id: number) => ProjectType | undefined;
  removeProjects: () => void;
  addProject: (project: ProjectType) => void;
  removeProject: (project: ProjectType) => void;
  updateProject: (project: ProjectType) => void;


  // an array of objects that contain the project id
  // and an array of users that are assigned to that project
  projectUsers: ProjectUsersType[];

  getProjectUsersByProjectId: (projectId: number) => ProjectUsersType | undefined;
  addProjectUsers: (projectUsers: ProjectUsersType) => void;
  updateProjectUsers: (projectUsers: ProjectUsersType) => void;

  currentProjectId: number | null;
  setCurrentProjectId: (id: number) => void;
}

export const useAllProjectsStore = create<AllProjectsState>()(
  devtools((set, get) => ({
    projects: [],
    projectUsers: [] as ProjectUsersType[],
    setProjects: (projects: ProjectType[]) => set({ projects }),
    removeProjects: () => set({ projects: [] }),
    addProject: (project: ProjectType) => set((state) => ({ projects: [...state.projects, project] })),
    removeProject: (project: ProjectType) => set((state) => ({ projects: state.projects.filter((p) => p.id !== project.id) })),
    updateProject: (project: ProjectType) => set((state) => ({
      projects: state.projects.map((p) => p.id === project.id ? project : p)
    })),
    getProjectById(id:number) {
      return get().projects.find((p) => p.id === id);
    },
    addProjectUsers: (projectUsers: ProjectUsersType) => set((state) => ({
      projectUsers: [...state.projectUsers, projectUsers]
    })),
    updateProjectUsers: (projectUsers: ProjectUsersType) => set((state) => ({
      projectUsers: state.projectUsers.map((pu) => pu.projectId === projectUsers.projectId ? projectUsers : pu)
    })),
    getProjectUsersByProjectId(projectId: number) {
      return get().projectUsers.find((pu) => pu.projectId === projectId);
    },

    currentProjectId: null,
    setCurrentProjectId: (id: number) => set({ currentProjectId: id }),
  }))
);
