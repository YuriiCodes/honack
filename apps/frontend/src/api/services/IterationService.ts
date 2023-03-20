import $api from "../http";

export default class IterationService {
  static async createIteration(projectId:number, name:string, description:string) {
    return await $api.post(`/iteration`, {
      name,
      description,
      projectId
    });
  }
}
