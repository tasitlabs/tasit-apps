/* eslint no-console: "off" */
import { argv } from "yargs";
import * as childProcess from "child_process";

import {
  checkBlockchain,
  showErrorMessage,
  prepareAndLoadConfig,
} from "./helpers/starter";

const startExpo = (env): void => {
  const { exec } = childProcess;
  // TODO: Add support for running expo start with the ios flag via
  // an arg for this script
  const process = exec(`BABEL_ENV=${env} npx expo start -c`);

  process.stdout.on("data", (data): any => {
    const { log } = console;
    log(data);
  });

  process.stderr.on("data", (data): any => {
    const { log } = console;
    log(data);
  });
};

const start = async (): Promise<void> => {
  const { config } = argv;
  await prepareAndLoadConfig(config);
  console.log(`Checking the connection to the blockchain...`);
  console.log(`Using 'config/${config}.ts' file...`);
  const connectionOK = await checkBlockchain();
  if (connectionOK) {
    console.log("OK!");
    startExpo(config);
  } else {
    showErrorMessage([
      `Failed to establish the connection to the blockchain.`,
      `Is the 'config/${config}.ts' file correct?\n`,
      `If you are starting one of Tasit apps in dev environment, `,
      "Use: 'npm run prepare:blockchain' from TasitSDK project.",
      "That script will start local blockchain and will deploy the smart contracts.",
    ]);
  }
};

start();
