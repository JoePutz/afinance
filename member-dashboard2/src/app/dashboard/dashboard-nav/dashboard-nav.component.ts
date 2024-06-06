import {Component, OnInit} from '@angular/core';
import {Tab} from '@dashboard/dashboard-nav/tab-nav/tab-nav.component';
import {AuthService} from '@core/services/auth.service';

export type NavRoute = {
  route: string;
  label: string;
  isTab: boolean;
};

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.sass']
})
export class DashboardNavComponent implements OnInit {

  tabs: Tab[];
  routes: NavRoute[];
  fullName?: string;
  membershipId?: string;
  username?: string;

  constructor(private authService: AuthService) {
    this.tabs = [
      {
        icon: 'chart-bar',
        label: 'Summary',
        route: './summary'
      },
      {
        icon: 'wallet',
        label: 'Accounts',
        route: './accounts'
      },
      {
        icon: 'tags',
        label: 'Offers',
        route: './offers'
      }
    ];

    this.routes = [
      {
        route: './summary',
        label: 'Home',
        isTab: true
      },
      {
        route: './accounts',
        label: 'Accounts',
        isTab: true
      },
      {
        route: './offers',
        label: 'Offers',
        isTab: true
      },
      {
        route: './profile',
        label: 'Profile',
        isTab: false
      },
      {
        route: './my-cards',
        label: 'My Cards',
        isTab: false
      },
      {
        route: './transfer-funds',
        label: 'Transfer Money',
        isTab: false
      },
      {
        route: './locations',
        label: 'Locations',
        isTab: false
      }
    ];
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user != null) {
        this.fullName = `${user!.firstName} ${user!.lastName}`;
        this.username = user!.username;
        this.membershipId = user!.membershipId;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
