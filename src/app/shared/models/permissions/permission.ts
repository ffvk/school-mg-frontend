import { PermissionRestrictionEnum } from '../../settings/app-settings';

export class Permission {
  permissionId: string = '';

  userId: string = '';

  resourceId: string = '';

  resourceName: string = '';

  resourceAction: string = '';

  restriction?: keyof typeof PermissionRestrictionEnum;

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(permission?: { [key: string]: any }) {
    if (permission) {
      this.permissionId = permission['permissionId'] || permission['_id'] || '';

      this.userId = permission['userId'] || '';

      this.resourceId = permission['resourceId'] || '';

      this.resourceName = permission['resourceName'] || '';

      this.resourceAction = permission['resourceAction'] || '';

      this.restriction = permission['restriction'] || 'userId';

      this.timestamp = permission['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }
}
