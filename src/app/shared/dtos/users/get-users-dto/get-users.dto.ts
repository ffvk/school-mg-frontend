import { AppSettings } from 'src/app/shared/settings/app-settings';

export class GetUsersDTO {
  userId?: string;

  userIds?: string;

  name?: string;

  emailValue?: string;

  emailVerified?: boolean;

  role?: string;

  minDateOfBirth?: number;

  maxDateOfBirth?: number;

  limit: number = AppSettings.ITEMS_PER_PAGE;

  page: number = 1;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
