import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-control-validation-indicator',
  template: `
    <app-form-control-indicator [icon]="!validateControl?.touched ? 'info-circle' : validateControl?.errors ? 'exclamation-circle' : 'check-circle'"
                                [message]="validateControl?.valid || !validateControl?.dirty ? defaultMessage : errorMessage"
                                [iconClass]="!validateControl?.touched ? 'text-primary' : validateControl?.errors ? 'text-danger animate__animated animate__headShake animate__fast' : 'text-success animate__animated animate__pulse animate__faster'"></app-form-control-indicator>
  `
})
export class FormControlValidationIndicatorComponent {
  @Input()
  defaultMessage!: string;
  @Input()
  errorMessage!: string;
  @Input()
  validateControl!: AbstractControl | null;
}
