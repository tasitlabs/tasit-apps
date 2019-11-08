/* eslint no-console: "off" */

const fs = require("fs");
const util = require("util");

const promiseCopyFile = util.promisify(fs.copyFile);
const promiseAccessFile = util.promisify(fs.access);
const CONSOLE_FG_RED = "\x1b[31m";
const CONSOLE_RESET = "\x1b[0m";

// Note from js version of this file:
// Copied from helpers/index.js because this file should be ES5

// TODO: Research why this file needed to be ES5 and whether there's
// a way around it

//import { checkBlockchain } from "./helpers";

const TasitSDK = require("tasit-sdk");

const { Action } = TasitSDK;
const { ConfigLoader } = Action;
console.log({ ConfigLoader });
// import { ProviderFactory } from "tasit-action/dist/ProviderFactory";

const { ProviderFactory } = require("tasit-action/dist/ProviderFactory");
console.log({ ProviderFactory });
// import { ProviderFactory } from "tasit-action/dist/ProviderFactory";

export const checkBlockchain = async (): Promise<boolean> => {
  console.log("About to check blockchain");
  try {
    const provider = ProviderFactory.getProvider();
    console.log({ provider });
    await provider.getBlockNumber();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

const loadConfig = (): void => {
  console.log("Loading config");
  const tasitSdkConfig = require("../config/current");
  console.log({ tasitSdkConfig });
  ConfigLoader.setConfig(tasitSdkConfig);
};

export const fileExists = async (path): Promise<boolean> => {
  try {
    await promiseAccessFile(path, fs.F_OK);
  } catch (err) {
    return false;
  }
  return true;
};

export const copyFile = async (source, destination): Promise<void> => {
  await promiseCopyFile(source, destination);
};

export const showErrorMessage = (message): void => {
  console.log(CONSOLE_FG_RED);
  if (Array.isArray(message)) message.forEach(line => console.log(line));
  else console.log(message);
  console.log(CONSOLE_RESET);
};

const prepareConfig = async (config): Promise<void> => {
  const source = `./config/${config}.ts`;
  const destination = "./config/current.ts";

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

export const prepareAndLoadConfig = async (config): Promise<void> => {
  await prepareConfig(config);
  loadConfig();
};
