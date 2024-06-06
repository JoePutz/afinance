import {TestBed} from '@angular/core/testing';

import {AuthInterceptor} from './auth.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '@core/services/auth.service';
import {environment} from '@environments/environment';
import {JwtService} from '@core/services/jwt.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

describe('AuthInterceptor', () => {

  let interceptor: AuthInterceptor;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let jwtService: JwtService;
  let api = environment.application.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        AuthInterceptor,
        JwtService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtService = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should include jwt token in header of interceptor.', () => {
    spyOn(jwtService, 'getJwt').and.returnValue('TOKEN');
    service.getCurrentUser();
    const req = httpMock.expectOne(`${api}/users/current`);
    const token = req.request.headers.get('Authorization');
    expect(token).toBe('TOKEN');
  });
});
