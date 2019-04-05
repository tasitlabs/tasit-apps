/* eslint no-console: "off" */
const { exec } = require("child_process");
const {
  checkBlockchain,
  copyFile,
  showErrorMessage,
  fileExists,
} = require("./helpers/starter");

const setupConfig = async () => {
  const config = process.env.CONFIG;
  const source = `./config/${config}.js`;
  const destination = "./config/default.js";

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
    showErrorMessage([
      `Failed to establish the connection to the blockchain.`,
      `Is the 'config/default.js' file correct?\n`,
      `If you are starting one of Tasit apps in dev environment, `,
      "Use: 'npm run prepare:blockchain' from TasitSDK project.",
      "That script will start local blockchain and will deploy the smart contracts.",
    ]);
  }
};

(async () => {
  await setupConfig();
  await start();
})();
