import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-animated-wallet',
  template: `
    <div class="animated-wallet" [ngStyle]="style">
      <img src="../../../assets/images/logo-light.svg" class="coin" draggable="false" alt=""/>
      <img src="../../../assets/images/wallet.svg" class="wallet" draggable="false" alt=""/>
    </div>`,
  styleUrls: [
    './animated-wallet.component.sass'
  ]
})
export class AnimatedWalletComponent implements OnInit {
  @Input()
  scale?: number;

  style = {transform: 'scale(1)'};

  ngOnInit(): void {
    if (this.scale) {
      this.style.transform = `scale(${this.scale})`;
    }
  }
}
