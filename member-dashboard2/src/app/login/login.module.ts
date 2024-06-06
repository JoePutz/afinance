import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {AppIconsModule} from '../app-icons.module';
import {BrowserModule} from '@angular/platform-browser';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {PasswordResetFormComponent} from './forgot-password/password-reset-form/password-reset-form.component';
import {CoreModule} from '@core/core.module';
import {AppMaskModule} from '@app/app-mask.module';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    PasswordResetFormComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppIconsModule,
        CoreModule,
        AppMaskModule,
        FormsModule
    ]
})
export class LoginModule { }
