import {Pipe, PipeTransform} from '@angular/core';
import {AccountResponse} from '@core/models/account-response.model';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'accountLabel'
})
export class AccountLabelPipe implements PipeTransform {

  transform(account: AccountResponse, visible = false, showBalance = false): string {
    const accountNumber = visible ? account.accountNumber :
      `•••${account.accountNumber.substr(account.accountNumber.length - 4)}`;
    const balance = showBalance ? this.getBalance(account) : '';
    return `${account.type} ${accountNumber} ${balance}`.trim();
  }

  getBalance(account: AccountResponse) {
    const currencyPipe = new CurrencyPipe('en_US');
    if (account.type === 'CHECKING') {
      return currencyPipe.transform(account.availableBalance! / 100);
    }
    return currencyPipe.transform(account.balance / 100);
  }

}
