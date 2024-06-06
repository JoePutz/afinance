import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {NavRoute} from '@dashboard/dashboard-nav/dashboard-nav.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass']
})
export class DrawerComponent implements OnInit {

  @Input()
  routes!: NavRoute[];

  fullName?: string;
  username?: string;
  membershipId?: string;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.service.currentUser.subscribe(user =>  {
      if (user) {
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.username = user.username;
        this.membershipId = user.membershipId;
      }
    });
  }

  logout() {
    this.service.logout();
    this.router.navigate(['login'])
      .catch(err => console.log(err));
  }

}
