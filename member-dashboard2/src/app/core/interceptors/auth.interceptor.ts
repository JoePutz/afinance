import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from '@core/services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.jwtService.getJwt()) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: this.jwtService.getJwt()!
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
