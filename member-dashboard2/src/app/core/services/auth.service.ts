import {Injectable} from '@angular/core';
import {BaseHttpService} from '@core/services/base-http.service';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Credentials} from '@core/models/credentials.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CoreModule} from '@core/core.module';
import {catchError} from 'rxjs/operators';
import {JwtService} from '@core/services/jwt.service';
import {UserResponse} from '@core/models/user-response.model';

/**
 * Injectable authentication service that allows access to
 * the current logged in user.
 */
@Injectable({
  providedIn: CoreModule
})
export class AuthService extends BaseHttpService {

  private currentUserSubject: BehaviorSubject<UserResponse | null>;

  constructor(private client: HttpClient, private jwtService: JwtService) {
    super();
    this.currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
    if (this.isLoggedIn) {
      this.getCurrentUser();
    }
  }

  /**
   * Log in with your credentials and store a JWT in the client's local storage.
   * @param credentials           Username and password model.
   * @param successHandler        Log in success callback.
   * @param unauthorizedHandler   Unauthorized login callback. (Display error message)
   */
  login(credentials: Credentials,
        successHandler?: (response: HttpResponse<any>) => void,
        unauthorizedHandler?: (err: HttpErrorResponse) => Observable<never>): void {
    this.client.post(this.getApi('/login'), credentials, {
      observe: 'response'
    }).pipe(catchError(err => unauthorizedHandler ? unauthorizedHandler(err) : throwError(err)))
      .subscribe(
      res => {
        const token = res.headers.get('Authorization');
        this.jwtService.saveJwt(token!);
        this.getCurrentUser();
        if (successHandler) successHandler.call(null, res);
      }
    );
  }

  logout(): void {
    this.jwtService.deleteJwt();
    this.currentUserSubject.next(null);
  }

  /**
   * Returns a boolean if the user is logged in.
   * (This boolean is based on if the client has a valid JWT in its local storage.)
   */
  get isLoggedIn(): boolean {
    if (this.jwtService.getJwt()) {
      return this.jwtService.isValid();
    }
    return false;
  }

  getCurrentUser(): void {
    this.client.get<UserResponse>(this.getApi('/users/current'))
      .subscribe(user => this.currentUserSubject.next(user));
  }

  /**
   * Get the current logged in user.
   * It will return null if no user is logged in.
   */
  get currentUser(): Observable<UserResponse | null> {
    return this.currentUserSubject.asObservable();
  }

}
