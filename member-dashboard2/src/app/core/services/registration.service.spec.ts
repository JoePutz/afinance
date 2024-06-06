import {TestBed} from '@angular/core/testing';

import {RegistrationService} from './registration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserRegistration} from '@core/models/user-registration.model';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {ConfirmUserRegistration} from '@core/models/confirm-user-registration.model';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;
  let api = environment.application.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegistrationService
      ]
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() =>  {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call user registration API', () => {
    const registration = new UserRegistration('testboy',
      'P@ssword123',
      '12345678',
      '1234');
    service.registerUser(registration).subscribe();
    const req = httpMock.expectOne(`${api}/users/registration`, 'User registration');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe(`${api}/users/registration`);
    expect(req.request.body).toBe(registration);
  });

  it('should call registration confirmation API', () => {
    const registration: ConfirmUserRegistration = {
      token: 'REGISTRATION_TOKEN'
    };
    service.confirmRegistration(registration).subscribe();
    const req = httpMock.expectOne(`${api}/users/confirmation`, 'User registration confirmation');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe(`${api}/users/confirmation`);
    expect(req.request.body).toBe(registration);
  });
});
