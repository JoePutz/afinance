import {environment} from '@environments/environment';
import {Injectable} from '@angular/core';
import {CoreModule} from '@core/core.module';

@Injectable({
  providedIn: CoreModule
})
export abstract class BaseHttpService {
  protected getApi(endpoint: string) {
    return `${environment.application.api}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }
}
