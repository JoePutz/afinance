import {Component} from '@angular/core';
import {GlobalModalState} from '@app/global-modal/global-modal.state';
import {GlobalModalOptions} from '@app/global-modal/global-modal-options';

@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.sass']
})
export class GlobalModalComponent {

  options!: GlobalModalOptions;

  constructor(private state: GlobalModalState) {
    this.options = state.options!;
  }

  close(): void {
    this.state.modal?.close();
  }

}

