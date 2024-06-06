import {Pipe, PipeTransform} from '@angular/core';
import {Transaction, TransactionStatus, TransactionType} from '@core/models/transaction.model';
import {DatePipe} from '@angular/common';
import {Merchant} from '@core/models/merchant.model';

@Pipe({
  name: 'transactionDescription'
})
export class TransactionDescriptionPipe implements PipeTransform {

  transform(transaction: Transaction): string {
    const datePipe = new DatePipe('en-us');
    const transactionMerchant: Merchant = transaction.merchant;
    const transactionCodeExists = (transactionMerchant.code !== 'NONE' && transactionMerchant);
    const defaultMessage = `${transaction.merchant ? transaction.merchant.code + ' ' : ''}${TransactionType[transaction.type]} ${datePipe.transform(transaction.date, 'MM/dd')} - ${TransactionStatus[transaction.status]}`;
    const providedDescription = `${(transactionCodeExists) ? transactionMerchant.code + ' - ' : ''}${transaction.description} ${datePipe.transform(transaction.date, 'MM/dd')}`;
    return transaction.description ?
      (transaction.description.trim().length > 0 ? providedDescription : defaultMessage) :
      defaultMessage;
  }

}
