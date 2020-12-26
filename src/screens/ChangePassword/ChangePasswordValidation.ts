export default {
  currentPassword: {
    required: 'Tu contraseña actual es requerida',
  },
  newPassword: {
    required: 'Tu contraseña nueva es requerida',
    minLength: {
      value: 8,
      message: 'Tu nueva contraseña debe de contener al menos 8 caracteres',
    },
  },
};
