import {BelongsTo, Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import Team from "./Team.entity";
import Task from "./Task.entity";

@Table
export default class Iteration extends Model {
  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;

  @Column
  number: number;

  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Task)
  tasks: Task[];

}
