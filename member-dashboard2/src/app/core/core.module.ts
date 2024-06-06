import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandlerModule} from '@error-handler/error-handler.module';
import {SingleCharDirective} from '@core/directives/single-char.directive';
import {SingleCharInputComponent} from '@core/components/single-char-input/single-char-input.component';
import {AppMaskModule} from '@app/app-mask.module';
import {FormsModule} from '@angular/forms';
import {FormControlIndicatorComponent} from '@core/components/form-control-indicator/form-control-indicator.component';
import {FormControlValidationIndicatorComponent} from '@core/components/form-control-indicator/form-control-validation-indicator.component';
import {AppIconsModule} from '@app/app-icons.module';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from '@core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    SingleCharDirective,
    SingleCharInputComponent,
    FormControlIndicatorComponent,
    FormControlValidationIndicatorComponent
  ],
  imports: [
    HttpClientModule,
    ErrorHandlerModule,
    AppMaskModule,
    FormsModule,
    AppIconsModule,
    NgbTooltipModule
  ],
    exports: [
        HttpClientModule,
        SingleCharDirective,
        FormControlValidationIndicatorComponent
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
