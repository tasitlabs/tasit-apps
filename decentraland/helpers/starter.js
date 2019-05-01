/* eslint no-console: "off" */
const fs = require("fs");
const util = require("util");
const promiseCopyFile = util.promisify(fs.copyFile);
const promiseAccessFile = util.promisify(fs.access);
const CONSOLE_FG_RED = "\x1b[31m";
const CONSOLE_RESET = "\x1b[0m";

// Note: Copied from helpers/index.js because this file should be ES5
//import { checkBlockchain } from "./helpers";
const { Action } = require("tasit-sdk");
const { ConfigLoader } = Action;
const { ProviderFactory } = require("tasit-action/dist/ProviderFactory");
const checkBlockchain = async () => {
  const provider = ProviderFactory.getProvider();
  try {
    await provider.getBlockNumber();
  } catch (err) {
    return false;
  }
  return true;
};

const loadConfig = () => {
  const tasitSdkConfig = require("../config/current.js");
  ConfigLoader.setConfig(tasitSdkConfig);
};

const fileExists = async path => {
  try {
    await promiseAccessFile(path, fs.F_OK);
  } catch (err) {
    return false;
  }
  return true;
};

const copyFile = async (source, destination) => {
  await promiseCopyFile(source, destination);
};

const showErrorMessage = message => {
  console.log(CONSOLE_FG_RED);
  if (Array.isArray(message)) message.forEach(line => console.log(line));
  else console.log(message);
  console.log(CONSOLE_RESET);
};

const prepareConfig = async config => {
  const source = `./config/${config}.js`;
  const destination = "./config/current.js";

  const sourceExists = await fileExists(source);
  if (!sourceExists) {
    showErrorMessage(`Config file not found: ${source}`);
  }

  try {
    await copyFile(source, destination);
  } catch (error) {
    showErrorMessage([
      `Unable to generate ${destination} config file.`,
      `${error.message}`,
    ]);
  }
};

const prepareAndLoadConfig = async config => {
  await prepareConfig(config);
  loadConfig();
};

module.exports = {
  checkBlockchain,
  fileExists,
  showErrorMessage,
  copyFile,
  prepareAndLoadConfig,
};
