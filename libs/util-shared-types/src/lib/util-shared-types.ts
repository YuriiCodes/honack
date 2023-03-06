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

export type ProjectType = AddedByOrm & {
  id: number;
  name: string;
  description: string;
  ownerId: number;
}
