// TODO: Decide whether to run the TypeScript enabled linting on this file
// or not. Also decide if it should be .ts or .js

module.exports = function(api): object {
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
