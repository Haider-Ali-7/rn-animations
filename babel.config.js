process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-unistyles/plugin', { root: 'src' }],
      ['react-native-reanimated/plugin', { processNestedWorklets: true }]
    ]
  };
};
