import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule} from 'ngx-currency';

const config: CurrencyMaskConfig = {
  allowNegative: false,
  allowZero: false,
  decimal: '.',
  nullable: false,
  precision: 2,
  prefix: '$',
  suffix: '',
  thousands: ',',
  align: 'center',
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxCurrencyModule.forRoot(config)
  ],
  exports: [
    NgxCurrencyModule
  ]
})
export class AppCurrencyMaskModule { }
