import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import Task from "./Task.entity";
import User from "./User.entity";

@Table
export default class TaskDescription extends Model {
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;

  @Column
  points: number;

  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @HasOne(() => User, 'creatorId')
  creator: User;

  @ForeignKey(() => User)
  @Column
  executorId: number;

  @HasOne(() => User, 'executorId')
  executor: User;

}
