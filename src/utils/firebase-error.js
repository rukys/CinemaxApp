const AUTH_ERROR_MESSAGES = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/too-many-requests':
    'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed':
    'No internet connection. Please check your network.',
  'auth/requires-recent-login':
    'For your security, please enter your password again.',
  'auth/missing-password': 'Please enter your password.',
  'auth/missing-email': 'Please enter your email address.',
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const getAuthErrorMessage = error => {
  const code = typeof error === 'string' ? error : error?.code;
  return AUTH_ERROR_MESSAGES[code] || DEFAULT_ERROR_MESSAGE;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

export const isValidEmail = email => EMAIL_PATTERN.test(String(email).trim());
