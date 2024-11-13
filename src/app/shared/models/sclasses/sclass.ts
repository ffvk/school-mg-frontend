import { CreateSclassDTO } from '../../dtos/sclasses/create-sclass-dto/create-sclass-dto';
import { UpdateSclassDTO } from '../../dtos/sclasses/update-sclass-dto/update-sclass-dto';

export class Sclass {
  sclassId: string = '';

  className: string = '';

  tutorId: string = '';

  subjectId: string = '';

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(sclass?: { [key: string]: any }) {
    if (sclass) {
      this.sclassId = sclass['sclassId'] || sclass['_id'] || '';

      this.className = sclass['className'] || '';

      // this.tutorId = sclass['tutorId'] || '';

      this.subjectId = sclass['subjectId'] || '';

      this.timestamp = sclass['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateSclassDTO {
    return {
      className: this.className,
      tutorId: this.tutorId,
    };
  }

  toUpdateDTO(): UpdateSclassDTO {
    return {
      tutorId: this.tutorId,
      className: this.className,
    };
  }
}
