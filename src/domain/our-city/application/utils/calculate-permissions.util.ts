import { PermissionsMap } from '../shared/constants/permissions-map';

export const calculatePermissions = (
  role: string | null,
  staffId: string | null,
): string[] => {
  if (!staffId) {
    return ['read'];
  }

  return PermissionsMap[role || ''] || ['read'];
};
