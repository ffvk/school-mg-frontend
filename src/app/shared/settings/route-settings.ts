import { environment } from '../../../environments/environment';

export class RouteSettings {
  public static readonly BASE_URL = environment.BACKEND_BASE_URL;

  public static readonly ENDPOINTS = {
    USERS: {
      GET: '/users',
      CREATE: '/users',
      UPDATE: '/users',
      DELETE: '/users',
      CREATE_SUBSCRIBERS: '/users/subscribers',
      CREATE_SESSION_EMAIL: '/users/session/email',
      RESEND_VERIFICATION_EMAIL: '/users/email/verify',
      UPDATE_ROLE: '/users/role',
      UPDATE_EMAIL: '/users/email',
      UPLOAD_PROFILE_PIC: '/users/profile-pic',
    },

    TOKENS: {
      GET: '/tokens',
      CREATE: '/tokens',
      UPDATE: '/tokens',
      DELETE: '/tokens',
    },

    PRODUCTS: {
      GET: '/products',
      CREATE: '/products',
      UPDATE: '/products',
      DELETE: '/products',
    },

    ORDERS: {
      GET: '/orders',
      CREATE: '/orders',
      UPDATE: '/orders',
      DELETE: '/orders',
    },

    SUBJECTS: {
      GET: '/subjects',
      CREATE: '/subjects',
      UPDATE: '/subjects',
      DELETE: '/subjects',
    },

    SCLASSES: {
      GET: '/sclasses',
      CREATE: '/sclasses',
      UPDATE: '/sclasses',
      DELETE: '/sclasses',
    },

    HOMEWORKS: {
      GET: '/homeworks',
      CREATE: '/homeworks',
      UPDATE: '/homeworks',
      DELETE: '/homeworks',
      UPLOAD_FILE: '/homeworks/file',
    },
  };
}
