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
