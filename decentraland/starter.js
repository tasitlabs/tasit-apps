/* eslint no-console: "off" */
const { exec } = require("child_process");
const {
  checkBlockchain,
  showErrorMessage,
  prepareAndLoadConfig,
} = require("./helpers/starter");

const startExpo = () => {
  const process = exec("npx expo start -c");
  process.stdout.on("data", console.log);
  process.stderr.on("data", console.log);
};

const start = async () => {
  const config = process.env.CONFIG;
  await prepareAndLoadConfig(config);
  console.log("Checking the connection to the blockchain...");
  const connectionOK = await checkBlockchain();
  if (connectionOK) {
    console.log("OK!");
    startExpo();
  } else {
    showErrorMessage([
      `Failed to establish the connection to the blockchain.`,
      `Is the 'config/default.js' file correct?\n`,
      `If you are starting one of Tasit apps in dev environment, `,
      "Use: 'npm run prepare:blockchain' from TasitSDK project.",
      "That script will start local blockchain and will deploy the smart contracts.",
    ]);
  }
};

start();
