import {Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import User from "./User.entity";
import Iteration from "./Iteration.entity";

@Table
export default class Team extends Model {
  @Column({unique: true})
  name: string;

  @Column
  @ForeignKey(() => User)
  ownerId: number;

  @HasMany(() => Iteration)
  iterations: Iteration[];

}
