export default {
  cardName: {
    required: 'El nombre de la tarjeta es requerido',
  },
  cardNumber: {
    required: 'El número de tarjeta es requerido',
    minLength: {
      value: 16,
      message: 'Tu número de tarjeta debe de tener 16 dígitos',
    },
  },
  expirationDate: {
    required: 'La fecha de expiración es requerida',
  },
  cvc: {
    required: 'El CVC es requerido',
    minLength: {
      value: 3,
      message: 'El CVC debe tener 3 dígitos',
    },
  },
};
