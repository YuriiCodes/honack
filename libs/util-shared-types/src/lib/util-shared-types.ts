export function utilSharedTypes(): string {
  return 'util-shared-types';
}

interface AddedByOrm {
  createdAt: Date;
  updatedAt: Date;
}
export interface DomainUser {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export type DomainUserWithoutPassword = Omit<DomainUser, 'password'>;

export type DomainUserWithSalary = DomainUserWithoutPassword & {
  salary: number;
  points: number;
  expectedSalary: number;
}

export interface TokenPayload {
  id: number;
  sub: number;
  iat: number;
  exp: number;
  email: string;
}

export type DecodedToken = {
  payload: {
    sub: string;
    id: number;
  };
  iat: number;
  exp: number;
};

export type UserFromToken = {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export type IterationType = AddedByOrm & {
  id: number;
  projectId: number;
  name: string;
  description: string;
}
export type ProjectType = AddedByOrm & {
  id: number;
  name: string;
  description: string;
  joinCode: string;
  ownerId: number;
  iterations?: IterationType[];
}

export type AuthApiResponse = {
  access_token: string;
}

export type GetMeApiResponse = {
  email: string;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export type TaskType =  {
  id: number;
  iterationId: number;
  title: string;
  description: string;
  creatorId: number;
  executorId: number;
  points: number;
  status: TaskStatus;
}

export type ProjectUsersType = {
  projectId: number;
  users: DomainUserWithoutPassword[];
}
