export default {
  email: {
    required: 'El email es requerido',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Por favor, escribe un correo electrónico válido',
    },
  },
  password: {
    required: 'La contraseña es requerida',
    minLength: {
      value: 8,
      message: 'Tu contraseña debe de contener al menos 8 caracteres',
    },
  },
};
