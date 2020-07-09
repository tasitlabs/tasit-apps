module.exports = function (api): object {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
