import {Injectable} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {BaseHttpService} from '@core/services/base-http.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TransactionsPage} from '@core/models/transactions-page.model';
import {PageParams} from '@core/models/paginated-response.model';
import {map} from 'rxjs/operators';
import {TransactionMethod, TransactionStatus, TransactionType} from '@core/models/transaction.model';
import {TransferFundsRequest} from '@core/models/transfer-funds-request.model';

@Injectable({
  providedIn: CoreModule
})
export class TransactionService extends BaseHttpService {

  constructor(private client: HttpClient) {
    super();
  }

  getTransactionsByMemberId(memberId: number, params: PageParams = {sort: ['date,desc']}): Observable<TransactionsPage> {
    return this.client.get(this.getApi(`/members/${memberId}/transactions`),
      {params})
      .pipe(this.transactionPipe());
  }

  getTransactionsByAccountId(accountId: number, params: PageParams = {sort: ['date,desc']}): Observable<TransactionsPage> {

    return this.client.get<TransactionsPage>(this.getApi(`/accounts/${accountId}/transactions`),
      {params})
      .pipe(this.transactionPipe());
  }

  transferFunds(request: TransferFundsRequest) {
    return this.client.post(this.getApi('/transactions/transfer'), request);
  }

  /**
   * Map pipe to convert transaction enum string to
   * typescript enums.
   * @private
   */
  private transactionPipe() {
    return map((page: any) => {
      page.content.map((transaction: any) => {
        transaction.type = TransactionType[transaction.type];
        transaction.status = TransactionStatus[transaction.status];
        transaction.method = TransactionMethod[transaction.method];
        return transaction;
      });
      return <TransactionsPage> page;
    });
  }

}
