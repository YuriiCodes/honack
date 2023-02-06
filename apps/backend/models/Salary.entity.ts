import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./User.entity";

@Table
export default class Salary extends Model{

  @ForeignKey(() => User)
  @Column
  userId: number;
  @BelongsTo(() => User, {as: 'user'})

  @Column
  amount: number;
}
