import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppRoutingModule} from '@app/app-routing.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, AppRoutingModule],
      providers: [
        AuthService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not activate when user is not logged in.', () => {
    spyOnProperty(service, 'isLoggedIn').and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
  });

  it('should activate when user is logged in.', () => {
    spyOnProperty(service, 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

});
