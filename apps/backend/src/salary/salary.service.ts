import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectModel } from "@nestjs/sequelize";
import Salary from "../../models/Salary.entity";

@Injectable()
export class SalaryService {
  constructor(@InjectModel(Salary)
              private salaryModel: typeof Salary) {


  }

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      return await this.salaryModel.create({
        ...createSalaryDto
      });
    } catch (e) {
      throw new NotFoundException("User not found")
    }
  }

  async findAll() {
    return await this.salaryModel.findAll();
  }

  async findOne(id: number) {
    return await this.salaryModel.findByPk(id);
  }

  async update(id: number, updateSalaryDto: UpdateSalaryDto) {
    const salary = await this.salaryModel.findByPk(id);
    if (!salary) {
      throw new NotFoundException('Salary not found');
    }
    return await salary.update({
      ...updateSalaryDto
    });
  }

  async remove(id: number) {
    const salary = await this.salaryModel.findByPk(id);
    if (!salary) {
      throw new NotFoundException('Salary not found');
    }
    await salary.destroy();
    return salary;
  }
}
