export interface IPaymentMethod {
  id?: string;
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}
