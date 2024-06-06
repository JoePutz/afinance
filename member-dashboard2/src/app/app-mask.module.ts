import {NgModule} from '@angular/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  allowNegativeNumbers: false,
  validation: false,
  specialCharacters: ['-', '(', ')', '/', '.', ':', ' ', '+', ',', '@', '"', '\'', '•']
};

@NgModule({
  declarations: [],
  imports: [
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    NgxMaskModule
  ]
})
export class AppMaskModule { }
