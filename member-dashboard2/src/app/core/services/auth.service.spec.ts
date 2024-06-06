import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Credentials} from '@core/models/credentials.model';
import {environment} from '@environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let api = environment.application.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the login endpoint', () =>  {

    const cred: Credentials = {
      username: 'testboy',
      password: 'P@ssword123'
    };

    service.login(cred);

    let req = httpMock.expectOne(`${api}/login`);

    expect(req.request.url).toBe(`${api}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(cred);

  });
});
