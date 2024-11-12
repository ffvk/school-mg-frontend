import { CreateSclassDTO } from '../../dtos/sclasses/create-sclass-dto/create-sclass-dto';
import { UpdateSclassDTO } from '../../dtos/sclasses/update-sclass-dto/update-sclass-dto';

export class Sclass {
  sclassId: string = '';

  name: string = '';

  tutorId: string = '';

  subjectId: string = '';

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(sclass?: { [key: string]: any }) {
    if (sclass) {
      this.sclassId = sclass['sclassId'] || sclass['_id'] || '';

      this.name = sclass['name'] || '';

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
      name: this.name,
      tutorId: this.tutorId,
      subjectId: this.subjectId,
    };
  }

  toUpdateDTO(): UpdateSclassDTO {
    return {
      sclassId: this.sclassId,
      name: this.name,
    };
  }
}
