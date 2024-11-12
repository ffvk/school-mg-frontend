export class GetSclassesDTO {
  sclassId?: string = '';

  sclassIds?: string = '';

  className?: string = '';

  tutorId?: string = '';

  studentId?: string = '';

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
