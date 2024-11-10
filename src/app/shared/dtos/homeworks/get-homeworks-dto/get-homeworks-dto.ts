export class GetHomeworksDTO {
  title?: string = '';

  tutorId?: string = '';

  sclassId?: string = '';

  subjectId?: string = '';

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
