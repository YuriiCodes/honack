import $api from "../http";
import { TaskType } from "@honack/util-shared-types";

export default class TaskService {
  static async createTask(
    title: string,
    description: string,
    points: number,
    executorId: number,
    iterationId: number,
    projectId: number
  ) {
    return await $api.post(`/task`, {
      title,
      description,
      points,
      executorId,
      iterationId,
      projectId,
    });
  }

  // project/:projectId/iteration/:id
  static async getTasksByIterationId(iterationId: number) {
    return await $api.get<TaskType[]>(`/task/iteration/${iterationId}`);
  }
}
