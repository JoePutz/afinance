import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="d-flex flex-row justify-content-center font-noto-sans">
      <div class="fs-1 text-primary" [ngClass]="{'animate__animated animate__flipInX': animate}" [style]="textStyle">Aline</div>
      <img src="../../assets/images/logo.svg"
           class="logo"
           [ngClass]="{'animate__animated animate__flipInY animate__delay-half-second': animate}"
           [style]="logoStyle"
           draggable="false"
           alt="$"/>
      <div class="fs-1 text-light" [ngClass]="{'animate__animated animate__flipInX': animate}" [style]="textStyle">Financial</div>
    </div>
  `,
  styleUrls: [
    './logo.component.sass'
  ]
})
export class LogoComponent {
  @Input()
  animate = false;

  @Input()
  textStyle?: string;

  @Input()
  logoStyle?: string;
}
