import {Injectable} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseHttpService} from '@core/services/base-http.service';
import {AccountsPage} from '@core/models/accounts-page.model';
import {AccountResponse} from '@core/models/account-response.model';

@Injectable({
  providedIn: CoreModule
})
export class AccountService extends BaseHttpService {

  constructor(private client: HttpClient) {
    super();
  }

  // Get a paginated response of Accounts
  getAccounts(memberId: number): Observable<AccountsPage> {
    return this.client.get<AccountsPage>(this.getApi(`/members/${memberId}/accounts`));
  }

  // Get a single account by ID
  getAccountById(accountId: number): Observable<AccountResponse> {
    return this.client.get<AccountResponse>(this.getApi(`/accounts/${accountId}`));
  }


}
