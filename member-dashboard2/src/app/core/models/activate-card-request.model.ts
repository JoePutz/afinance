export type ActivateCardRequest = {
  cardNumber: string;
  securityCode: string;
  expirationDate: Date;
  dateOfBirth: Date;
  lastFourOfSSN: string;
};
