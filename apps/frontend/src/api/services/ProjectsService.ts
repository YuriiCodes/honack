import $api from "../http";
import { DomainUserWithoutPassword, DomainUserWithSalary, ProjectType } from "@honack/util-shared-types";

export default class ProjectsService {
  static async createProject(name:string, description:string) {
    return await $api.post<ProjectType>('/project', {
      name,
      description
    });
  }

  static async joinProject(joinCode:string) {
    return await $api.post('/project/join', {
      joinCode
    });
  }

  static async getProjectById(id:string) {
    return await $api.get<ProjectType>(`/project/${id}`);
  }

  static async getProjects() {
    return await $api.get<ProjectType[]>('/project');
  }

  static async getProjectMembers(id: string) {
    return await $api.get<DomainUserWithoutPassword[]>(`/project/${id}/members`);
  }

  static async getProjectMembersWithSalaries(id: string, numOfDays = 30) {
    return await $api.get<DomainUserWithSalary[]>(`/project/${id}/members/salary/days/${numOfDays}`);
  }
}
