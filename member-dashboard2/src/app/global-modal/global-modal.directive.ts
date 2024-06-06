import {Directive, TemplateRef} from '@angular/core';
import {GlobalModalState} from '@app/global-modal/global-modal.state';

@Directive({
  selector: 'ng-template[appGlobalModal]'
})
export class GlobalModalDirective {

  constructor(modalTemplate: TemplateRef<any>, state: GlobalModalState) {
    state.template = modalTemplate;
  }

}
