import ContractsAddresses from "@constants/ContractsAddresses";
const { MANA_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC20 } = Action;
const { Mana } = ERC20;
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export const approveManaSpending = async (fromAccount, toAddress, value) => {
  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS);

  mana.setWallet(fromAccount);
  const approvalAction = mana.approve(toAddress, value.toString());

  await approvalAction.waitForNonceToUpdate();
};

export const manaFaucetTo = async (beneficiaryWallet, amountInWei) => {
  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS);

  // Note: A real app wouldn't be using a preset private key and hardcoding it!
  // We're only doing this temporarily while using a hardcoded account with ETH and tokens
  const ownerPrivKey =
    "0x11d943d7649fbdeb146dc57bd9cfc80b086bfab2330c7b25651dbaf382392f60";
  const ownerWallet = createFromPrivateKey(ownerPrivKey);
  const { address } = beneficiaryWallet;
  const amountToMint = amountInWei.toString();

  mana.setWallet(ownerWallet);
  const mintManaAction = mana.mint(address, amountToMint);
  await mintManaAction.waitForNonceToUpdate();
};

export default { approveManaSpending, manaFaucetTo };
