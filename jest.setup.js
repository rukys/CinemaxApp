/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-config', () => ({
  API_HOST: 'https://api.themoviedb.org/3/',
  API_TIMEOUT: '10000',
  ACCESS_TOKEN: 'test-token',
}));

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'),
}));

jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const FastImage = props => React.createElement('FastImage', props);
  FastImage.resizeMode = {};
  FastImage.priority = {};
  FastImage.preload = jest.fn();
  return FastImage;
});

jest.mock('@react-native-firebase/auth', () => {
  const authInstance = {
    currentUser: null,
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(() => Promise.resolve()),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  };
  const auth = jest.fn(() => authInstance);
  auth.EmailAuthProvider = { credential: jest.fn() };
  return { __esModule: true, default: auth };
});

jest.mock('@react-native-firebase/firestore', () => {
  const docRef = {
    get: jest.fn(() => Promise.resolve({ exists: false, data: () => null })),
    set: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    onSnapshot: jest.fn(() => jest.fn()),
  };
  const collectionRef = {
    doc: jest.fn(() => ({ ...docRef, collection: jest.fn(() => collectionRef) })),
    get: jest.fn(() => Promise.resolve({ empty: true, docs: [], forEach: jest.fn() })),
  };
  const firestore = jest.fn(() => ({
    collection: jest.fn(() => collectionRef),
    batch: jest.fn(() => ({ delete: jest.fn(), commit: jest.fn(() => Promise.resolve()) })),
  }));
  return { __esModule: true, default: firestore };
});

jest.mock('react-native-webview', () => {
  const React = require('react');
  return { WebView: props => React.createElement('WebView', props) };
});
