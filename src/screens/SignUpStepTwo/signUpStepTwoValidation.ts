export default {
  fullName: {
    required: 'Tu nombre es requerido',
  },
  address: {
    required: 'Tu dirección es requerida',
  },
  cardNumber: {
    required: 'El número de tarjeta es requerido',
    minLength: {
      value: 16,
      message: 'Tu número de tarjeta debe de tener 16 dígitos',
    },
  },
};
