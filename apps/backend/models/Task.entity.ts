import {BelongsTo, Column, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import Iteration from "./Iteration.entity";
import TaskDescription from "./TaskDescription.entity";

@Table
export default class Task extends Model {
  @ForeignKey(() => Iteration)
  @Column
  iterationId: number;

  @BelongsTo(() => Iteration)
  iteration: Iteration;

  @HasOne(() => TaskDescription)
  taskDescription: TaskDescription;
}
