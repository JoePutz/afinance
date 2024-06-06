import {Pipe, PipeTransform} from '@angular/core';
import {Transaction, TransactionType} from '@core/models/transaction.model';
import {formatCurrency} from '@angular/common';

@Pipe({
  name: 'transactionAmount'
})
export class TransactionAmountPipe implements PipeTransform {

  transform(transaction: Transaction): string {
    const currencyStr = formatCurrency(transaction.amount / 100, 'en-us', '$', 'USD');
    if (this.isDecreasing(transaction)) {
      return `(${currencyStr})`;
    } else {
      return currencyStr;
    }
  }

  isDecreasing(transaction: Transaction): boolean {
    switch (transaction.type) {
      case TransactionType.PAYMENT:
      case TransactionType.PURCHASE:
      case TransactionType.TRANSFER_OUT:
      case TransactionType.WITHDRAWAL:
        return true;
      default:
        return false;
    }
  }

  isIncreasing(transaction: Transaction): boolean {
    switch (transaction.type) {
      case TransactionType.DEPOSIT:
      case TransactionType.TRANSFER_IN:
      case TransactionType.REFUND:
        return true;
      default:
        return false;
    }
  }
}
