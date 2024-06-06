// Represents the back end account DTO
export type AccountResponse = {
  id: number;
  type: string;
  accountNumber: string;
  status: string;
  balance: number;
  availableBalance?: number;
  apy?: number;
};
