export const calculatePermissions = (
  role: string | null,
  staffId: string | null,
): string[] => {
  if (!staffId) {
    return ['read'];
  }

  const permissionsMap: Record<string, string[]> = {
    ADMIN: ['read', 'write', 'delete', 'restricted_read'],
    MERCHANT: ['read', 'write', 'restricted_read'],
    MEMBER: ['read', 'write'],
  };

  return permissionsMap[role || ''] || ['read'];
};
