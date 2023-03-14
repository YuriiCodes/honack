import { BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import User from "./User.entity";
import Iteration from "./Iteration.entity";
import UsersProjects from "./UsersProjects";

@Table
export default class Project extends Model {
  @Column({ unique: true })
  name: string;

  @Column
  description: string;

  @Column({defaultValue: null})
  joinCode: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @HasOne(() => User, "ownerId")
  owner: User;

  @HasMany(() => Iteration)
  iterations: Iteration[];

  @BelongsToMany(() => User, () => UsersProjects, "projectId", "userId")
  users: User[];
}
