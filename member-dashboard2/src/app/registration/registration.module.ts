import {NgModule} from '@angular/core';
import {RegistrationComponent} from './registration.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {AppRoutingModule} from '@app/app-routing.module';
import {LogoModule} from '@app/logo/logo.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppIconsModule} from '@app/app-icons.module';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AppMaskModule} from '@app/app-mask.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@core/core.module';
import {GlobalModalModule} from '@app/global-modal/global-modal.module';
import {RegistrationConfirmationComponent} from './registration-confirmation/registration-confirmation.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent,
    RegistrationConfirmationComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      LogoModule,
      AppIconsModule,
      NgbTooltipModule,
      AppMaskModule,
      ReactiveFormsModule,
      CoreModule
  ],
  providers: [
    GlobalModalModule
  ]
})
export class RegistrationModule { }
