import { PermissionsTokenType } from 'src/core/@types/permissions-map-type';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (
  ...permissions: [PermissionsTokenType, ...PermissionsTokenType[]]
) => SetMetadata(PERMISSIONS_KEY, permissions);
