import {Merchant} from '@core/models/merchant.model';

export enum TransactionStatus {
  APPROVED,
  DENIED,
  PENDING
}

export enum TransactionType {
  DEPOSIT,
  WITHDRAWAL,
  TRANSFER_IN,
  TRANSFER_OUT,
  PURCHASE,
  PAYMENT,
  REFUND,
  VOID
}

export enum TransactionMethod {
  ACH,
  ATM,
  CREDIT_CARD,
  DEBIT_CARD,
  APP
}

export enum TransactionState {
  CREATED,
  PROCESSING,
  POSTED
}

export type Transaction = {
  id: number;
  method: TransactionMethod;
  amount: number;
  accountNumber: string;
  initialBalance: number;
  postedBalance: number;
  type: TransactionType;
  status: TransactionStatus;
  description?: string;
  merchant: Merchant;
  date: Date;
};
