export default {
  fullName: {
    required: 'El nombre es requerido',
  },
  address: {
    required: 'La dirección es requerida',
  },
  city: {
    required: 'La ciudad es requerida',
  },
  state: {
    required: 'El estado es requerido',
  },
  postalCode: {
    required: 'El código postal es requerido',
    minLength: {
      value: 5,
      message: 'Tu código postal debe de tener 5 dígitos',
    },
  },
  country: {
    required: 'El país es requerido',
  },
};
