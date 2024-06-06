import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  handleError(error: any) {
    super.handleError(error);
  }
}
