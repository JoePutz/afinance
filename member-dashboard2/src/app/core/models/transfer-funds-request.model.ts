/**
 * TransferFundsRequest DTO is used with the
 * transactions API to transfer funds from one account
 * to another account.
 */
export type TransferFundsRequest = {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  memo?: string;
};
