import { PermissionsMap } from 'src/domain/our-city/application/shared/constants/permissions-map';

export type PermissionsTokenType =
  (typeof PermissionsMap)[keyof typeof PermissionsMap][number];
