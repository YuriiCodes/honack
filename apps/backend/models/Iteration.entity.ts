import {BelongsTo, Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import Project from "./Project.entity";
import Task from "./Task.entity";

@Table
export default class Iteration extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;


  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Task)
  tasks: Task[];

}
