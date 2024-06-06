import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalErrorHandler} from '@error-handler/global-error-handler';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from '@error-handler/http-error.interceptor';
import {GlobalModalModule} from '@app/global-modal/global-modal.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GlobalModalModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorHandlerModule { }
