import { Subject } from './subject';

export class Subjects {
  currentCount: number = 0;
  totalCount: number = 0;
  subjects: Subject[] = [];

  constructor(subjects?: { [key: string]: any }) {
    if (subjects) {
      if (
        !isNaN((subjects['currentCount'] = parseInt(subjects['currentCount'])))
      ) {
        this.currentCount = subjects['currentCount'];
      }

      if (!isNaN((subjects['totalCount'] = parseInt(subjects['totalCount'])))) {
        this.totalCount = subjects['totalCount'];
      }

      if (subjects['subjects']?.length) {
        for (let i = 0; i < subjects['subjects'].length; i++) {
          this.subjects.push(new Subject(subjects['subjects'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.subjects.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.subjects.length;
        }
      }
    }
  }

  getById(subjectId: string): Subject | null {
    for (let subject of this.subjects) {
      if (subject.subjectId === subjectId) {
        return subject;
      }
    }

    return null;
  }

  add(subject: Subject) {
    this.subjects.push(subject);
    this.currentCount++;
    this.totalCount++;
  }
}
