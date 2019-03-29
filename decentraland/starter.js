/* eslint no-console: "off" */
import { exec } from "child_process";

// Note: Copied from helpers.js because import isn't working
//import { checkBlockchain } from "./helpers";
import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
import ProviderFactory from "tasit-action/dist/ProviderFactory";
import tasitSdkConfig from "./config/default";
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

const CONSOLE_FG_RED = "\x1b[31m";
const CONSOLE_RESET = "\x1b[0m";

const startExpo = () => {
  const process = exec("npx expo start -c");
  process.stdout.on("data", console.log);
  process.stderr.on("data", console.log);
};

const start = async () => {
  console.log("Checking the connection to the blockchain...");
  const connectionOK = await checkBlockchain();
  if (connectionOK) {
    console.log("OK!");
    startExpo();
  } else {
    console.log(CONSOLE_FG_RED);
    console.log(`Failed to establish the connection to the blockchain.`);
    console.log(`Is the 'config/default.js' file correct?\n`);
    console.log(`If you are starting one of Tasit apps in dev environment, `);
    console.log("Use: 'npm run prepare:blockchain' from TasitSDK project.");
    console.log(
      "That script will start local blockchain and will deploy the smart contracts."
    );
    console.log(CONSOLE_RESET);
  }
};

(async () => await start())();
