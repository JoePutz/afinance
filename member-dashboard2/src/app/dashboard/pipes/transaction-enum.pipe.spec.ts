import {TransactionEnumPipe} from './transaction-enum.pipe';

describe('TransactionStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionEnumPipe();
    expect(pipe).toBeTruthy();
  });
});
