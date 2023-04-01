import $api from "../http";

export default class TaskService {
  static async createTask(
    title: string,
    description: string,
    points: number,
    creatorId: number,
    executorId: number,
    iterationId: number
  ) {
    return await $api.post(`/task`, {
      title,
      description,
      points,
      creatorId,
      executorId,
      iterationId
    });
  }
}
