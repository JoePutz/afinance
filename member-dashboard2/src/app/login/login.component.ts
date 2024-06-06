import {Component} from '@angular/core';
import {Credentials} from '@core/models/credentials.model';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  error = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  handleLogin(credentials: Credentials): void {
    this.authService.login(credentials, () => {
      this.router.navigate(['dashboard'])
        .catch(err => console.error(err));
    }, () => {
      this.error = true;
      return throwError('Incorrect username or password!');
    });
  }


}
