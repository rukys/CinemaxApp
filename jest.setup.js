/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
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

jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const FastImage = props => React.createElement('FastImage', props);
  FastImage.resizeMode = {};
  FastImage.priority = {};
  FastImage.preload = jest.fn();
  return FastImage;
});

jest.mock('@react-native-firebase/auth', () => {
  const auth = { currentUser: null };
  return {
    __esModule: true,
    getAuth: jest.fn(() => auth),
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(() => Promise.resolve()),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
    reauthenticateWithCredential: jest.fn(() => Promise.resolve()),
    updatePassword: jest.fn(() => Promise.resolve()),
    deleteUser: jest.fn(() => Promise.resolve()),
    EmailAuthProvider: { credential: jest.fn() },
  };
});

jest.mock('@react-native-firebase/firestore', () => {
  const snapshot = { exists: () => false, data: () => null };
  return {
    __esModule: true,
    getFirestore: jest.fn(() => ({})),
    doc: jest.fn(() => ({})),
    collection: jest.fn(() => ({})),
    getDoc: jest.fn(() => Promise.resolve(snapshot)),
    getDocs: jest.fn(() =>
      Promise.resolve({ empty: true, docs: [], forEach: jest.fn() }),
    ),
    setDoc: jest.fn(() => Promise.resolve()),
    updateDoc: jest.fn(() => Promise.resolve()),
    deleteDoc: jest.fn(() => Promise.resolve()),
    onSnapshot: jest.fn(() => jest.fn()),
    writeBatch: jest.fn(() => ({
      delete: jest.fn(),
      commit: jest.fn(() => Promise.resolve()),
    })),
  };
});

jest.mock('react-native-webview', () => {
  const React = require('react');
  return { WebView: props => React.createElement('WebView', props) };
});
