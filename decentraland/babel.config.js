module.exports = function(api) {
  const environment = api.env();
  api.cache(true);
  const presets = ["babel-preset-expo"];
  const plugins = [];

  // Note: console.* should be removed from production app because of performance issues
  // See more: https://docs.expo.io/versions/latest/react-native/performance/#using-consolelog-statements
  if (environment !== "development") {
    plugins.push("transform-remove-console");
  }

  return {
    presets,
    plugins,
  };
};
