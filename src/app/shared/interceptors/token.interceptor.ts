import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, finalize, map, timeout } from 'rxjs/operators';

import { LoaderService } from '../services/helpers/loader.service';
import { ToasterService } from '../services/helpers/toaster.service';
import { UserLocalService } from '../services/local/user-local.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private readonly userLocalService: UserLocalService,
    private toaster: ToasterService,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.userLocalService.getMyToken();
    let bearer: string | null = 'Bearer ' + (token && token.hash) || '';

    if (request.headers.get('Authorization')) {
      bearer = request.headers.get('Authorization');
    }

    let authRequest = request.clone({
      setHeaders: {
        Authorization: bearer || '',
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.loaderService.requestStarted();

    const isFileUpload = request.body instanceof FormData;

    let handledRequest: Observable<HttpEvent<any>> = next
      .handle(authRequest)
      .pipe(
        map((event: HttpEvent<any>) => event),
        finalize(() => {
          this.loaderService.requestEnded();
        }),
        map((event: HttpEvent<any>) => event),
        catchError((error: HttpErrorResponse) => {
          // Check for timeout error first
          if (error instanceof TimeoutError) {
            this.toaster.error('The request timed out. Please try again.');
            this.loaderService.resetLoader();
            return throwError(() => error);
          }

          if (error.status === 401 || error.status === 403) {
            if (this.userLocalService.getMyToken()) {
              this.userLocalService.removeMe();
              this.router.navigate(['/login'], { replaceUrl: true });
            }
            this.loaderService.resetLoader();
            return throwError(() => error);
          }

          this.toaster.error(
            error && error.error && error.error.status === 'ERROR'
              ? error.error.message.user
              : 'An unknown error occurred'
          );

          return throwError(() => error);
        })
      );

    if (!isFileUpload) {
      handledRequest = handledRequest.pipe(timeout(10000));
    }

    return handledRequest;
  }
}
