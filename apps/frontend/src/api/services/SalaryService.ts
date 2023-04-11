import $api from "../http";

export default class SalaryService {
  static async updateSalary(userId: number, amount: number) {
    return await $api.patch(`/salary/${userId}`, {
      amount
    });
  }
}
