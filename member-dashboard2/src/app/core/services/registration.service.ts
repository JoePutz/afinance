import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseHttpService} from '@core/services/base-http.service';
import {CoreModule} from '@core/core.module';
import {UserRegistration} from '@core/models/user-registration.model';
import {Observable} from 'rxjs';
import {UserResponse} from '@core/models/user-response.model';
import {ConfirmUserRegistration} from '@core/models/confirm-user-registration.model';
import {ConfirmUserRegistrationResponse} from '@core/models/confirm-user-registration-response.model';

/**
 * Registration Service
 * <p>Used to supply registration components with API calls.</p>
 */
@Injectable({
  providedIn: CoreModule
})
export class RegistrationService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Registers a user when the UserResponse Observable is
   * subscribed to.
   * @param registration The registration model used
   *        as a request body for the POST call.
   */
  registerUser(registration: UserRegistration): Observable<HttpResponse<UserResponse>> {
    return this.http.post<UserResponse>(this.getApi('/users/registration'), registration, {
      observe: 'response'
    });
  }

  /**
   * Confirms user registration when the observable is subscribed to.
   * @param registration The ConfirmUserRegistration model used as the request body.
   */
  confirmRegistration(registration: ConfirmUserRegistration): Observable<HttpResponse<ConfirmUserRegistrationResponse>> {
    return this.http.post<ConfirmUserRegistrationResponse>(this.getApi('/users/confirmation'), registration, {
      observe: 'response'
    });
  }

}
