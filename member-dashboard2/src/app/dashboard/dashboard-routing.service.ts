import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class DashboardRoutingService {

  private history: string[] = [];

  constructor(private router: Router,
              private location: Location) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/').catch(err => console.error(err));
    }
  }

}
