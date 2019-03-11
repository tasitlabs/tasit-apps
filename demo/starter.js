/* eslint no-console: "off" */
const { exec } = require("child_process");
const { Action } = require("tasit-sdk");
const { ConfigLoader } = Action;
const { ProviderFactory } = require("tasit-action/dist/ProviderFactory");
const tasitSdkConfig = require("./config/default.js");

const CONSOLE_FG_RED = "\x1b[31m";
const CONSOLE_RESET = "\x1b[0m";

const startExpo = () => {
  const process = exec("npx expo start -c");
  process.stdout.on("data", console.log);
  process.stderr.on("data", console.log);
};

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

const start = async () => {
  const connectionOK = await checkBlockchain();
  if (connectionOK) startExpo();
  else {
    console.log(CONSOLE_FG_RED);
    console.log(`Failed to establish the connection to the blockchain.`);
    console.log(`Is the 'config/default.js' file correct?\n`);
    console.log(`If you are starting one of Tasit apps in dev environment, `);
    console.log("Use: 'npm run pretest' from TasitSDK project.");
    console.log(
      "That script will start local blockchain and will deploy the smart contracts."
    );
    console.log(CONSOLE_RESET);
  }
};

(async () => await start())();
