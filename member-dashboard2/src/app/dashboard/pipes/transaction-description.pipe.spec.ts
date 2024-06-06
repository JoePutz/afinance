import {TransactionDescriptionPipe} from './transaction-description.pipe';
import {Transaction, TransactionMethod, TransactionStatus, TransactionType} from '@core/models/transaction.model';
import {DatePipe} from '@angular/common';

describe('TransactionDescriptionPipe', () => {
  let pipe: TransactionDescriptionPipe;

  beforeEach(() => {
    pipe = new TransactionDescriptionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return description if not blank', () => {
    const transaction: Transaction = {
      accountNumber: '',
      amount: 0,
      date: new Date(),
      initialBalance: 0,
      merchant: {
        name: '',
        description: '',
        code: '',
        registeredAt: new Date()
      },
      method: TransactionMethod.ACH,
      postedBalance: 0,
      status: TransactionStatus.APPROVED,
      type: TransactionType.PURCHASE,
      id: 1,
      description: 'This is a description'
    };

    const datePipe = new DatePipe('en-us');
    const providedDescription = `${transaction.merchant ? transaction.merchant.code + ' - ' : ''}${transaction.description} ${datePipe.transform(transaction.date, 'MM/dd')}`;

    expect(pipe.transform(transaction)).toBe(providedDescription);

  });

  it('should return default message if description is undefined', () => {
    const transaction: Transaction = {
      accountNumber: '',
      amount: 0,
      date: new Date(),
      initialBalance: 0,
      merchant: {
        name: '',
        description: '',
        code: '',
        registeredAt: new Date()
      },
      method: TransactionMethod.ACH,
      postedBalance: 0,
      status: TransactionStatus.APPROVED,
      type: TransactionType.PURCHASE,
      id: 1
    };

    const datePipe = new DatePipe('en-us');
    const expectedMessage = `${transaction.merchant ? transaction.merchant.code + ' ' : ''}${TransactionType[transaction.type]} ${datePipe.transform(transaction.date, 'MM/dd')} - ${TransactionStatus[transaction.status]}`;

    expect(pipe.transform(transaction)).toBe(expectedMessage);

  });

  it('should return default message if description is blank.', () => {
    const transaction: Transaction = {
      accountNumber: '',
      amount: 0,
      date: new Date(),
      initialBalance: 0,
      merchant: {
        name: '',
        description: '',
        code: '',
        registeredAt: new Date()
      },
      method: TransactionMethod.ACH,
      postedBalance: 0,
      status: TransactionStatus.APPROVED,
      type: TransactionType.PURCHASE,
      id: 1,
      description: ' '
    };

    const datePipe = new DatePipe('en-us');
    const expectedMessage = `${transaction.merchant ? transaction.merchant.code + ' ' : ''}${TransactionType[transaction.type]} ${datePipe.transform(transaction.date, 'MM/dd')} - ${TransactionStatus[transaction.status]}`;

    expect(pipe.transform(transaction)).toBe(expectedMessage);

  });
});
