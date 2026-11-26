module.exports = {
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  moduleNameMapper: {
    '[.]svg$': '<rootDir>/__mocks__/svg-mock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/.*|@react-native-firebase/.*|@react-navigation/.*|lucide-react-native|react-native-.*)/)',
  ],
};
