import $api from "../http";

export default class ProjectsService {
  static async createProject(name:string, description:string) {
    return await $api.post('/project', {
      name,
      description
    });
  }

  static async joinProject(joinCode:string) {
    return await $api.post('/project/join', {
      joinCode
    });
  }
}
