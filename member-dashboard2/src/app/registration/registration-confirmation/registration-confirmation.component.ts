import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {RegistrationService} from '@core/services/registration.service';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.sass']
})
export class RegistrationConfirmationComponent implements OnInit {

  icon: IconProp = 'check-circle';
  title = 'Registration Confirmed!';
  message = 'You can now continue to your dashboard.';
  success = true;

  constructor(private route: ActivatedRoute,
              private service: RegistrationService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      const token = paramMap.get('token');
      this.setVariables(token);
    });
  }

  setVariables(token: string | null): void {
    if (token) {
      this.service.confirmRegistration({token})
        .subscribe(
          response => {
            const data = response.body;
            this.success = (data && response.status === 200)
              ? data.enabled : false;
            if (this.success) {
              this.icon = 'check-circle';
              this.title = 'Registration Confirmed!';
              this.message = `Welcome, ${data!.username}! You can now enter your dashboard.`;
            }
          },
          error => {
            this.success = false;
            this.icon = 'times-circle';
            this.title = error;
            this.message = 'Please try again.';
            console.error(error);
          }
        );
    }
  }

}
