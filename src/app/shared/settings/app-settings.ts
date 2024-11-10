export class AppSettings {
  public static readonly ITEMS_PER_PAGE = 10;

  public static readonly MIME_TYPES: string[] = [
    'image/jpg',
    'image/jpeg',
    'image/svg',
    'application/svg',
    'image/svg+xml',
    'application/coreldraw',
    'application/x-cdr',
    'application/x-coreldraw',
    'image/cdr',
    'image/x-cdr',
    'zz-application/zz-winassoc-cdr',
    'application/cdr',
    'application/pdf',
    'application/zip',
    'application/epub+zip',
    'image/gif',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/rtf',
    'application/vnd.rar',
    'image/svg+xml',
    'font/ttf',
    'font/woff',
    'font/woff2',
    'application/x-7z-compressed',
    'application/octet-stream',
    'image/svg+xml;charset=utf-8',
    'image/svg+xml;utf-8',
    'image/webp',
  ];
}

export enum PermissionRestrictionEnum {
  userId = 'userId',
  '' = '',
}

export enum UserGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}
