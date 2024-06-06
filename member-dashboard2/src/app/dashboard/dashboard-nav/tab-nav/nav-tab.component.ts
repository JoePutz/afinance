import {Component, Input} from '@angular/core';
import {Tab} from '@dashboard/dashboard-nav/tab-nav/tab-nav.component';

@Component({
  selector: 'app-nav-tab',
  template: `
    <a [routerLink]="tab.route"
       [routerLinkActive]="['active']"
       class="nav-tab">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <fa-icon [icon]="tab.icon" transform="grow-4"></fa-icon>
        <span class="fw-light small d-inline-block mt-1" style="font-size: small">{{tab.label}}</span>
      </div>
    </a>
  `,
  styleUrls: ['./nav-tab.component.sass']
})
export class NavTabComponent {
  @Input()
  tab!: Tab;
}
