import {Component, Input} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-form-control-indicator',
  template: `
    <div class="position-absolute top-0 end-0 d-flex align-items-center h-100 me-3" placement="start" [ngbTooltip]="message">
      <fa-icon [icon]="icon" [className]="iconClass" class="d-inline-block m-3"></fa-icon>
    </div>
  `
})
export class FormControlIndicatorComponent {
  @Input()
  message!: string;
  @Input()
  icon!: IconProp;
  @Input()
  iconClass?: string;
}
