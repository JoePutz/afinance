import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slider} from '@dashboard/dashboard.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  animations: [
    slider
  ]
})
export class DashboardComponent {

  constructor() { }

  prepareRoutes(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationState;
  }

}
