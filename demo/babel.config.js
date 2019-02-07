module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    // Note: console.* should be removed from production app because performance issues
    // See more: https://docs.expo.io/versions/latest/react-native/performance/#using-consolelog-statements
    //plugins: ["transform-remove-console"],
  };
};
