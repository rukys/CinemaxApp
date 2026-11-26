module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Reanimated 4 moved its Babel plugin to react-native-worklets. Keep it last.
  plugins: ['react-native-worklets/plugin'],
};
