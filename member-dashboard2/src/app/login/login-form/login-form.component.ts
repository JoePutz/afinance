import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Credentials} from '@core/models/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {

  @Output()
  useCredentials: EventEmitter<Credentials>;

  loginForm: FormGroup;

  constructor() {
    const remember = localStorage.getItem('remembered');
    const {username, password} = this.checkRememberMe();
    this.loginForm = new FormGroup({
      username: new FormControl(username),
      password: new FormControl(password),
      rememberMe: new FormControl(!!remember)
    });

    this.useCredentials = new EventEmitter();
  }

  onSubmit(): void {
    const {username, password, rememberMe} = this.loginForm.value;
    if (rememberMe) {
      localStorage.setItem('remembered', JSON.stringify({username, password}));
    } else {
      localStorage.removeItem('remembered');
    }
    this.useCredentials.emit(this.loginForm.value);
  }

  checkRememberMe(): Credentials {
    const remembered = localStorage.getItem('remembered');

    if (remembered) {
      return JSON.parse(remembered);
    }
    return {username: '', password: ''};
  }

}
