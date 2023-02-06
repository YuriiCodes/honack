import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import Team from "./Team.entity";
import Salary from "./Salary.entity";
import TaskDescription from "./TaskDescription.entity";

@Table
export default class User extends Model {
  @Column({unique: true})
  name: string;

  @Column({ unique: true, validate: { isEmail: true } })
  email: string;

  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @HasOne(() => Salary)
  salary: Salary;

  @BelongsTo(() => TaskDescription, 'creatorId')
  taskCreator: TaskDescription[];

  @BelongsTo(() => TaskDescription, 'executorId')
  taskExecutor: TaskDescription;

}
