import ContractsABIs from "@constants/ContractsABIs";
const { manaABI } = ContractsABIs;
import ContractsAddresses from "@constants/ContractsAddresses";
const { manaAddress } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { Contract } = Action;
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export const approveManaSpending = async (fromAccount, toAddress, value) => {
  const mana = new Contract(manaAddress, manaABI);
  mana.setWallet(fromAccount);
  const approvalAction = mana.approve(toAddress, value.toString());

  await approvalAction.waitForNonceToUpdate();
};

export const manaFaucetTo = async (beneficiaryWallet, amountInWei) => {
  const mana = new Contract(manaAddress, manaABI);
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
