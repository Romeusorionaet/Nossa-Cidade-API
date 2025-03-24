export const PermissionsMap = {
  ADMIN: ['create', 'update', 'read', 'write', 'delete', 'restricted_read'],
  MERCHANT: ['read', 'write', 'restricted_read'],
} as const;
