import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '@environments/environment';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let api = environment.application.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccountService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should call the get accounts by member ID api endpoint when getAccounts function is called', () => {
    service.getAccounts(1).subscribe();
    const req = httpMock.expectOne(`${api}/members/1/accounts`);
    expect(req.request.url).toBe(`${api}/members/1/accounts`);
  });

  it ('should call the get account by ID api endpoint when getAccount function is called', () => {
    service.getAccountById(1).subscribe();
    const req = httpMock.expectOne(`${api}/accounts/1`);
    expect(req.request.url).toBe(`${api}/accounts/1`);
  });
});
