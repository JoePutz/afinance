import {TestBed} from '@angular/core/testing';

import {HttpErrorInterceptor} from './http-error.interceptor';
import {GlobalModalModule} from '@app/global-modal/global-modal.module';

describe('HttpErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      GlobalModalModule
    ],
    providers: [
      HttpErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should return the correct endpoint url segment', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    interceptor.api = 'http://testapi';
    const endpoint = interceptor.getEndpoint('http://testapi/users/1');
    expect(endpoint).toBe('/users/1');
  });
});
