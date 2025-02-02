import { StaffStatus } from 'src/domain/our-city/enterprise/entities/enums/staff-status';
import { UsersRole } from 'src/domain/our-city/enterprise/entities/enums/users-role';

export type AccessTokenPayload<T extends string> = {
  sub: string;
  publicId: string;
  purpose: T;
  permissions: string[];
  staffId?: string | null;
  role?: UsersRole | null;
  status?: StaffStatus | null;
};
