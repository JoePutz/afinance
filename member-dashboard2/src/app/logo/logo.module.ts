import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './logo.component';
import {AnimatedWalletComponent} from '@app/logo/animated-wallet/animated-wallet.component';


@NgModule({
  declarations: [
    LogoComponent,
    AnimatedWalletComponent
  ],
  exports: [
    LogoComponent,
    AnimatedWalletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LogoModule { }
