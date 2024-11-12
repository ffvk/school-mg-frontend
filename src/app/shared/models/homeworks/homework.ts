import { CreateHomeworkDTO } from '../../dtos/homeworks/create-homework-dto/create-homework-dto';
import { UpdateHomeworkDTO } from '../../dtos/homeworks/update-homework-dto/update-homework-dto';

export class Homework {
  homeworkId: string = '';

  title: string = '';

  description?: string = '';

  subjectId: string = '';

  tutorId: string = '';

  sclassId: string = '';

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(homework?: { [key: string]: any }) {
    if (homework) {
      this.homeworkId = homework['homeworkId'] || homework['_id'] || '';

      this.title = homework['title'] || '';

      this.description = homework['description'] || '';

      this.tutorId = homework['tutorId'] || '';

      this.sclassId = homework['sclassId'] || '';

      this.timestamp = homework['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateHomeworkDTO {
    return {
      title: this.title,
      subjectId: this.subjectId,
      tutorId: this.tutorId,
      sclassId: this.sclassId,
    };
  }

  toUpdateDTO(): UpdateHomeworkDTO {
    return {
      homeworkId: this.homeworkId,
      title: this.title,
    };
  }
}
