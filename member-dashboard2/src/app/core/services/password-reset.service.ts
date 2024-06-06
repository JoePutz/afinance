import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseHttpService} from '@core/services/base-http.service';
import {ResetPasswordAuthentication} from '@core/models/reset-password-authentication.model';
import {Observable} from 'rxjs';
import {ResetPasswordRequest} from '@core/models/reset-password-request.model';
import {CoreModule} from '@core/core.module';
import {OtpAuthentication} from '@core/models/otp-authentication.model';

@Injectable({
  providedIn: CoreModule
})
export class PasswordResetService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * This function will create a one-time passcode in the
   * database that links to the requesting user.
   * @param authentication The authentication DTO passed to the API.
   */
  authenticatePasswordReset(authentication: ResetPasswordAuthentication): Observable<HttpResponse<any>> {
    return this.http.post(this.getApi('/users/password-reset-otp'), authentication, {
      observe: 'response'
    });
  }

  /**
   * This function verifies the one-time passcode and makes sure that the
   * user received it.
   * @param authentication The object that contains the username and OTP.
   */
  verifyOtp(authentication: OtpAuthentication): Observable<HttpResponse<any>> {
    return this.http.post(this.getApi('/users/otp-authentication'), authentication, {
      observe: 'response'
    });
  }

  /**
   * Reset user password based on the authentication one-time passcode
   * passed in.
   * @param request The DTO that includes the OTP to reset password.
   */
  resetPassword(request: ResetPasswordRequest): Observable<HttpResponse<any>> {
    return this.http.put(this.getApi('/users/password-reset'), request, {
      observe: 'response'
    });
  }

}
