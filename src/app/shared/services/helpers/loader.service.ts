import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private requestsActive = 0;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getLoadingStatus(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  requestStarted(): void {
    if (this.requestsActive === 0) {
      this.isLoading.next(true);
    }
    this.requestsActive++;
  }

  requestEnded(): void {
    this.requestsActive--;
    if (this.requestsActive === 0) {
      this.isLoading.next(false);
    }
  }

  resetLoader(): void {
    this.requestsActive = 0;
    this.isLoading.next(false);
  }
}
