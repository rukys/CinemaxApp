import Toast from 'react-native-toast-message';

export const showErrorToast = (message, title = 'Oops!') => {
  Toast.show({ type: 'error', text1: title, text2: message });
};

export const showSuccessToast = (message, title = 'Success') => {
  Toast.show({ type: 'success', text1: title, text2: message });
};
