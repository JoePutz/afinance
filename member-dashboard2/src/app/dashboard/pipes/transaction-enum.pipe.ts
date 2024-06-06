import {Pipe, PipeTransform} from '@angular/core';
import {Transaction, TransactionMethod, TransactionStatus, TransactionType} from '@core/models/transaction.model';

export type TransactionEnum = 'status' | 'type' | 'method';

@Pipe({
  name: 'transactionEnum'
})
export class TransactionEnumPipe implements PipeTransform {

  transform(transaction: Transaction, enumType: TransactionEnum): string {
    switch (enumType) {
      case 'status':
        return TransactionStatus[transaction.status];
      case 'type':
        return TransactionType[transaction.type];
      case 'method':
        return TransactionMethod[transaction.method];
    }
  }

}
