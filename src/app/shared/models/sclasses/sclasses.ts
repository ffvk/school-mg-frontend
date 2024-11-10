import { Sclass } from './sclass';

export class Sclasses {
  currentCount: number = 0;
  totalCount: number = 0;
  sclasses: Sclass[] = [];

  constructor(sclasses?: { [key: string]: any }) {
    if (sclasses) {
      if (
        !isNaN((sclasses['currentCount'] = parseInt(sclasses['currentCount'])))
      ) {
        this.currentCount = sclasses['currentCount'];
      }

      if (!isNaN((sclasses['totalCount'] = parseInt(sclasses['totalCount'])))) {
        this.totalCount = sclasses['totalCount'];
      }

      if (sclasses['sclasses']?.length) {
        for (let i = 0; i < sclasses['sclasses'].length; i++) {
          this.sclasses.push(new Sclass(sclasses['sclasses'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.sclasses.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.sclasses.length;
        }
      }
    }
  }

  getById(sclassId: string): Sclass | null {
    for (let sclass of this.sclasses) {
      if (sclass.sclassId === sclassId) {
        return sclass;
      }
    }

    return null;
  }

  add(sclass: Sclass) {
    this.sclasses.push(sclass);
    this.currentCount++;
    this.totalCount++;
  }
}
