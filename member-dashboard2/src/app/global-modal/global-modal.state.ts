import {Injectable, TemplateRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GlobalModalOptions} from '@app/global-modal/global-modal-options';

@Injectable()
export class GlobalModalState {

  options?: GlobalModalOptions;
  modal?: NgbModalRef;
  template?: TemplateRef<any>;

}

