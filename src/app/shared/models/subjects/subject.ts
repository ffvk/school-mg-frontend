import { CreateSubjectDTO } from '../../dtos/subjects/create-subject-dto/create-subject-dto';
import { UpdateSubjectDTO } from '../../dtos/subjects/update-subject-dto/update-subject-dto';

export class Subject {
  subjectId: string = '';

  subjectName: string = '';

  tutorId: string = '';

  sclassId: string = '';

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(subject?: { [key: string]: any }) {
    if (subject) {
      this.subjectId = subject['subjectId'] || subject['_id'] || '';

      this.subjectName = subject['subjectName'] || '';

      this.tutorId = subject['tutorId'] || '';

      this.sclassId = subject['sclassId'] || '';

      this.timestamp = subject['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateSubjectDTO {
    return {
      subjectName: this.subjectName,
      tutorId: this.tutorId,
      sclassId: this.sclassId,
    };
  }

  toUpdateDTO(): UpdateSubjectDTO {
    return {
      subjectId: this.subjectId,
      subjectName: this.subjectName,
    };
  }
}
