import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.service.isLoggedIn) {
      this.router.navigate(['login']).catch(err => console.error(err));
    }
    return this.service.isLoggedIn;
  }

}
