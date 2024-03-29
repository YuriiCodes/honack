import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import Iteration from "./Iteration.entity";
import User from "./User.entity";
import { TaskStatus } from "@honack/util-shared-types";
import { DataTypes } from 'sequelize';

@Table
export default class Task extends Model {
  @ForeignKey(() => Iteration)
  @Column
  iterationId: number;

  @BelongsTo(() => Iteration)
  iteration: Iteration;

  @Column
  points: number;

  @Column
  title: string;

  @Column
  description: string;

  // Add  the status column & map it  to the TaskStatus enum
  @Column({type: DataTypes.ENUM(...Object.values(TaskStatus)), defaultValue: TaskStatus.TODO})
  status: TaskStatus;


  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @HasOne(() => User, 'creatorId')
  creator: User;

  @ForeignKey(() => User)
  @Column({defaultValue: null})
  executorId: number;

  @HasOne(() => User, 'executorId')
  executor: User;
}
