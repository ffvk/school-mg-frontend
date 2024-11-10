export class GetSubjectsDTO {
  subjectId?: string = '';

  subjectIds?: string = '';

  subjectName?: string = '';

  tutorId?: string = '';

  userId?: string = '';

  sclassId?: string = '';

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
