// Custom Error
const FireError = authCode => {
  switch (authCode) {
    case 'auth/wrong-password':
      return 'Password Salah';

    case 'auth/user-not-found':
      return 'User tidak ditemukan';

    case 'auth/invalid-email':
      return 'Email yang anda masukan salah';

    case 'auth/internal-error':
      return 'Harap masukan password';

    default:
      return '';
  }
};

export default FireError;
