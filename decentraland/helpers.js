const { Action } = require("tasit-sdk");
const { ConfigLoader } = Action;
const { ProviderFactory } = require("tasit-action/dist/ProviderFactory");
const tasitSdkConfig = require("./config/default.js");

const checkBlockchain = async () => {
  ConfigLoader.setConfig(tasitSdkConfig);
  const provider = ProviderFactory.getProvider();
  try {
    await provider.getBlockNumber();
  } catch (err) {
    return false;
  }
  return true;
};

module.exports = { checkBlockchain };
