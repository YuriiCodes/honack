
//join table for many-to-many relationship between users and projects
import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import Project from "./Project.entity";
import User from "./User.entity";


@Table
export default class UsersProjects extends Model {
  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column
  @ForeignKey(() => Project)
  projectId: number;
}
