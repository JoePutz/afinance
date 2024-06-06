import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalModalService} from '@app/global-modal/global-modal.service';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

const ignoreRequestApiEndpoints: string[] = [
  '/users/password-reset-otp'
];

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  api = environment.application.api;

  constructor(
    private modal: GlobalModalService
  ) {}

  handleError(error: HttpErrorResponse): Observable<never> {

    if (error.status === 0) {
      this.modal.show({
        title: 'We got nothing...',
        message: 'We didn\'t receive a response. You may have lost your connection.'
      });
    } else {
      console.error(`Something went wrong. ${error.error}`);
    }

    return throwError(error.error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!ignoreRequestApiEndpoints.includes(this.getEndpoint(request.url))) {
      return next.handle(request).pipe(catchError(err => this.handleError(err)));
    }
    return next.handle(request);
  }

  getEndpoint(url: string): string {
    return url.replace(this.api, '');
  }
}
