import {BelongsToMany, Column, HasOne, Model, Table} from "sequelize-typescript";
import Project from "./Project.entity";
import Salary from "./Salary.entity";
import UsersProjects from "./UsersProjects";


@Table
export default class User extends Model {
  @Column({unique: true})
  username: string;

  @Column({ unique: true, validate: { isEmail: true } })
  email: string;

  @HasOne(() => Salary)
  salary: Salary;

  @Column
  password: string;


  @BelongsToMany(() => Project, () => UsersProjects, 'userId', 'projectId')
  projects: Project[];
}
