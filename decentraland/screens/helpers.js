import ContractsAddresses from "@constants/ContractsAddresses";
const { MANA_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC20 } = Action;
const { Mana } = ERC20;

export const approveManaSpending = async (fromAccount, toAddress, value) => {
  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS, fromAccount);
  const action = mana.approve(toAddress, `${value}`);
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
  showFatalError,
  showError,
  showWarn,
  showInfo,
  showSuccess,
};
