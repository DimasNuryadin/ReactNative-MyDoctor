import { showMessage } from 'react-native-flash-message';
import { FireError } from '../../config';
import { colors } from '../colors';

export const showError = message => {
  showMessage({
    message: FireError(message),
    type: 'default',
    color: colors.white,
    backgroundColor: colors.error,
  });
};

export const showSuccess = message => {
  showMessage({
    message: FireError(message),
    type: 'default',
    color: colors.white,
    backgroundColor: colors.primary,
  });
};
