import type { StaffStatus } from 'src/domain/our-city/enterprise/entities/enums/staff-status';
import type { UsersRole } from 'src/domain/our-city/enterprise/entities/enums/users-role';

export type AccessTokenPayload = {
  sub: string;
  publicId: string;
  purpose: string;
  email: string;
  permissions: string[];
  staffId?: string | null;
  role?: UsersRole | null;
  status?: StaffStatus | null;
};
