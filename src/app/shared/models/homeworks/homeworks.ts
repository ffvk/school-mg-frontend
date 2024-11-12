import { Homework } from './homework';

export class Homeworks {
  currentCount: number = 0;
  totalCount: number = 0;
  homeworks: Homework[] = [];

  constructor(homeworks?: { [key: string]: any }) {
    if (homeworks) {
      if (
        !isNaN(
          (homeworks['currentCount'] = parseInt(homeworks['currentCount']))
        )
      ) {
        this.currentCount = homeworks['currentCount'];
      }

      if (
        !isNaN((homeworks['totalCount'] = parseInt(homeworks['totalCount'])))
      ) {
        this.totalCount = homeworks['totalCount'];
      }

      if (homeworks['homeworks']?.length) {
        for (let i = 0; i < homeworks['homeworks'].length; i++) {
          this.homeworks.push(new Homework(homeworks['homeworks'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.homeworks.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.homeworks.length;
        }
      }
    }
  }

  getById(homeworkId: string): Homework | null {
    for (let homework of this.homeworks) {
      if (homework.homeworkId === homeworkId) {
        return homework;
      }
    }

    return null;
  }

  add(homework: Homework) {
    this.homeworks.push(homework);
    this.currentCount++;
    this.totalCount++;
  }
}
