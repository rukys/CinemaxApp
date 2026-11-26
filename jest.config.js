module.exports = {
  preset: '@react-native/jest-preset',
  // Reanimated 4 runs on react-native-worklets; this resolver makes Jest load
  // their JS (non-native) implementation.
  resolver: 'react-native-reanimated/jest/resolver.js',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  setupFilesAfterEnv: ['./jest.setup-after-env.js'],
  moduleNameMapper: {
    '[.]svg$': '<rootDir>/__mocks__/svg-mock.js',
    // lucide 1.x ships ESM (.mjs) for the react-native condition; use its CJS build in Jest.
    '^lucide-react-native$':
      '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/.*|@react-native-firebase/.*|@react-navigation/.*|lucide-react-native|react-native-.*|@d11/.*|@react-native-async-storage/.*)/)',
  ],
};
