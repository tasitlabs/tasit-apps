import ContractsAddresses from "@constants/ContractsAddresses";
const { MANA_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC20 } = Action;
const { Mana } = ERC20;
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export const approveManaSpending = async (fromAccount, toAddress, value) => {
  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS, fromAccount);
  const action = mana.approve(toAddress, `${value}`);
  await action.waitForNonceToUpdate();
};

export const manaFaucetTo = async (toAddress, amountInWei) => {
  // Note: A real app wouldn't be using a preset private key and hardcoding it!
  // We're only doing this temporarily while using a hardcoded account with ETH and tokens
  const ownerPrivKey =
    "0x11d943d7649fbdeb146dc57bd9cfc80b086bfab2330c7b25651dbaf382392f60";
  const ownerWallet = createFromPrivateKey(ownerPrivKey);

  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS, ownerWallet);
  const action = mana.mint(toAddress, `${amountInWei}`);
  await action.waitForNonceToUpdate();
};

// TODO: Use properly functions/components
export const showFatalError = msg => console.error(msg);
export const showError = msg => console.log(`ERROR: ${msg}`);
export const showWarn = msg => console.log(`WARN: ${msg}`);
export const showInfo = msg => console.log(`INFO: ${msg}`);
export const showSuccess = msg => console.log(`SUCCESS: ${msg}`);

export default {
  approveManaSpending,
  manaFaucetTo,
  showFatalError,
  showError,
  showWarn,
  showInfo,
  showSuccess,
};
