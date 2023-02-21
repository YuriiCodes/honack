import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import Iteration from "./Iteration.entity";
import User from "./User.entity";

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
