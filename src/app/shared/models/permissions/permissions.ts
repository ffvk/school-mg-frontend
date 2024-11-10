import { Permission } from './permission';

export class Permissions {
  currentCount: number = 0;
  totalCount: number = 0;
  permissions: Permission[] = [];

  constructor(permissions?: { [key: string]: any }) {
    if (permissions) {
      if (
        !isNaN(
          (permissions['currentCount'] = parseInt(permissions['currentCount']))
        )
      ) {
        this.currentCount = permissions['currentCount'];
      }

      if (
        !isNaN(
          (permissions['totalCount'] = parseInt(permissions['totalCount']))
        )
      ) {
        this.totalCount = permissions['totalCount'];
      }

      if (permissions['permissions']?.length) {
        for (let i = 0; i < permissions['permissions'].length; i++) {
          this.permissions.push(new Permission(permissions['permissions'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.permissions.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.permissions.length;
        }
      }
    }
  }

  getById(permissionId: string): Permission | null {
    for (let permission of this.permissions) {
      if (permission.permissionId === permissionId) {
        return permission;
      }
    }

    return null;
  }

  add(permission: Permission) {
    this.permissions.push(permission);
    this.currentCount++;
    this.totalCount++;
  }
}
