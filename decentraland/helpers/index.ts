import { Platform, Linking } from "react-native";
import { Toast } from "native-base";

import { Action, ContractBasedAccount, TasitContracts } from "tasit-sdk";

const { ConfigLoader } = Action;
import ProviderFactory from "tasit-action/dist/ProviderFactory";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
import AccountCreationStatus from "../constants/AccountCreationStatus";

// TODO: Remove direct ethers dep from this app
import { ethers } from "ethers";

// Note: This is the 10th (#9 starting from index 0) account set up from
// the ganache-cli seed phrase the Tasit SDK is using
// As part of the migration, on all neteworks this account is set
// as the owner of the Gnosis Safe contract that is deployed
// Not a key controlling any funds or contracts on mainnet, of course:
const gnosisSafeOwnerPrivKey =
  "0x633a290bcdabb9075c5a4b3885c69ce64b4b0e6079eb929abb2ac9427c49733b";

const gnosisSafeOwner = createFromPrivateKey(gnosisSafeOwnerPrivKey);
const SMALL_AMOUNT = `${5e16}`; // 0.05
const HALF_MILLION = "500000000000000000000000";

const {
  NOT_STARTED,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

const ZERO = 0;

const loadConfig = (): void => {
  const tasitSdkConfig = require("../config/current");
  ConfigLoader.setConfig(tasitSdkConfig);
};

export const getNetworkName = (): string => {
  loadConfig();
  const provider = ProviderFactory.getProvider();
  const { _network: network } = provider;
  const networkName = !network ? "local" : network.name;
  return networkName;
};

interface GetAddressContract {
  getAddress: any; // TODO: Change me to a function type
}

interface MarketplaceContractObject extends GetAddressContract {
  setAccount: any; // TODO: Change me to a function type
  safeExecuteOrder: any; // TODO: Change me to a function type
}

interface EstateContractObject extends GetAddressContract {
  getFingerprint: any; // TODO: Change me to a function type
}

interface LandContractObject extends GetAddressContract {}

interface ManaContractObject extends GetAddressContract {
  setAccount: any; // TODO: Change me to a function type
  approve: any; // TODO: Change me to a function type
  balanceOf: any; // TODO: Change me to a function type
  allowance: any; // TODO: Change me to a function type
}

interface GnosisSafeContractObject {
  setAccount: any; // TODO: Change me to a function type
  setSigners: any; // TODO: Change me to a function type
  transferEther: any; // TODO: Change me to a function type
  transferERC20: any; // TODO: Change me to a function type
}

import { ActionObject } from "../types/ActionObject";

interface Contracts {
  marketplaceContract: MarketplaceContractObject;
  manaContract: ManaContractObject;
  gnosisSafeContract: GnosisSafeContractObject;
  estateContract: EstateContractObject;
  landContract: LandContractObject;
}

import { AccountObject } from "../types/AccountObject";

export const getContracts = (): Contracts => {
  const networkName = getNetworkName();

  // TODO: Once publishing an updated version of the Tasit SDK
  // is working again, remove this local logic for addresses.

  let theNetworkForAbiLookup = networkName;
  if (networkName === "rinkeby") {
    theNetworkForAbiLookup = "ropsten";
  }

  let {
    MANAToken,
    LANDProxy,
    EstateRegistry,
    Marketplace,
    GnosisSafe: GnosisSafeInfo,
  } = TasitContracts[theNetworkForAbiLookup];

  const rinkeby = {
    EstateRegistry: {
      address: "0x75acDF3f9C7E4f1141336401Da07265176530C19",
    },
    LANDProxy: {
      address: "0x74bFF5B8BaDd62DCf39E58216D23E03bA953cAe3",
    },
    LANDRegistry: {
      address: "0x8E91a85ce94430f83d81eAcCd3c018727e86bba0",
    },
    MANAToken: {
      address: "0x2A3e6dDa5b3451645f193194E377B18798420168",
    },
    Marketplace: {
      address: "0xE95Bc197Ba21B00BFbc8eCEBD4780be3427081be",
    },
    GnosisSafe: {
      address: "0x366dd6FdB8EA347A186e251e39bE1f12eF11cc8A",
    },
  };

  // TODO: Once publishing an updated version of the Tasit SDK
  // is working again, remove this local logic for addresses.
  if (networkName === "rinkeby") {
    // TODO: Add these addresses after running migration for rinkeby
    MANAToken.address = rinkeby.MANAToken.address;
    LANDProxy.address = rinkeby.LANDProxy.address;
    EstateRegistry.address = rinkeby.EstateRegistry.address;
    Marketplace.address = rinkeby.Marketplace.address;
    GnosisSafeInfo.address = rinkeby.GnosisSafe.address;
  }

  const { address: MANA_ADDRESS } = MANAToken;
  const { address: LAND_ADDRESS } = LANDProxy;
  const { address: ESTATE_ADDRESS } = EstateRegistry;
  const { address: MARKETPLACE_ADDRESS } = Marketplace;
  const { address: GNOSIS_SAFE_ADDRESS } = GnosisSafeInfo;

  const { ERC20, ERC721, Marketplace: MarketplaceContracts } = Action;
  const { Mana } = ERC20;
  const { Estate, Land } = ERC721;
  const { Decentraland: DecentralandMarketplace } = MarketplaceContracts;
  const { GnosisSafe } = ContractBasedAccount;

  const estateContract = new Estate(ESTATE_ADDRESS);
  const landContract = new Land(LAND_ADDRESS);
  const marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);
  const manaContract = new Mana(MANA_ADDRESS);
  const gnosisSafeContract = new GnosisSafe(GNOSIS_SAFE_ADDRESS);

  const contracts = {
    estateContract,
    landContract,
    marketplaceContract,
    manaContract,
    gnosisSafeContract,
  };

  return contracts;
};

export const addressesAreEqual = (
  address1: { toUpperCase: () => void },
  address2: { toUpperCase: () => void }
): boolean => {
  return address1.toUpperCase() === address2.toUpperCase();
};

export const approveManaSpending = (
  fromAccount: AccountObject
): ActionObject => {
  const contracts = getContracts();
  const { manaContract, marketplaceContract } = contracts;
  const toAddress = marketplaceContract.getAddress();
  manaContract.setAccount(fromAccount);

  const action = manaContract.approve(toAddress, HALF_MILLION);
  return action;
};

// TODO: Consider making the amount to send a param of this function
export const fundAccountWithEthers = (accountAddress: string): ActionObject => {
  const { signingKey } = gnosisSafeOwner;
  const { address } = signingKey;
  console.log("Gnosis Safe master funding contract owner address", address);
  const contracts = getContracts();
  const { gnosisSafeContract } = contracts;
  gnosisSafeContract.setAccount(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  console.log("Amount to be transferred", SMALL_AMOUNT);

  const action = gnosisSafeContract.transferEther(accountAddress, SMALL_AMOUNT);
  console.info("Built the action to transfer ETH to", accountAddress);
  return action;
};

export const fundAccountWithEthersVanilla = async (
  accountAddress: string
): Promise<any> => {
  const { signingKey } = gnosisSafeOwner;
  const { privateKey } = signingKey;

  // We require a provider to send transactions
  const provider = ProviderFactory.getProvider();

  // let privateKey = "0x3141592653589793238462643383279502884197169399375105820974944592"
  let wallet = new ethers.Wallet(privateKey, provider);

  console.log("Amount to be transferred", SMALL_AMOUNT);

  console.info("Built the vanilla tx to transfer ETH to", accountAddress);

  let tx = {
    to: accountAddress,
    // We must pass in the amount as wei (1 ether = 1e18 wei), so we
    // use this convenience function to convert ether to wei.
    value: ethers.utils.parseEther("0.05"),
    // value: SMALL_AMOUNT,
  };

  // TODO: Too confusing: Change this
  console.info(
    "Sending from owner of funding Gnosis Safe rather than contract itself"
  );

  // let sendPromise = gnosisSafeOwner.sendTransaction(tx);
  let sendPromise = wallet.sendTransaction(tx);

  const txReturned = await sendPromise;
  console.log({ txReturned });
  return txReturned;
};

export const fundAccountWithMana = (accountAddress: string): ActionObject => {
  const contracts = getContracts();
  const { manaContract, gnosisSafeContract } = contracts;
  gnosisSafeContract.setAccount(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  const action = gnosisSafeContract.transferERC20(
    manaContract.getAddress(),
    accountAddress,
    HALF_MILLION
  );
  return action;
};

// Note: This could live inside of the Action class as `buildLink()` function
export const buildBlockchainUrlFromActionId = (actionId: any): string => {
  const networkName = getNetworkName();
  const transactionHash = actionId;
  const url = `https://${networkName}.etherscan.io/tx/${transactionHash}`;
  return url;
};

export const buildBlockchainUrlFromAddress = (address: string): string => {
  const networkName = getNetworkName();
  const url = `https://${networkName}.etherscan.io/address/${address}`;
  return url;
};

// More about Toast component: https://docs.nativebase.io/Components.html#toast-def-headref
const showToast = (msg: string): void =>
  Toast.show({ text: msg, duration: 3000, buttonText: "Okay" });

export const showFatalError = (msg: string): void => console.error(msg);
export const showError = (msg: string): void => showToast(`ERROR: ${msg}`);
export const showWarn = (msg: string): void => showToast(`WARN: ${msg}`);
export const showInfo = (msg: string): void => showToast(`${msg}`);

export const logInfo = (msg: string): void => console.info(msg);
export const logWarn = (msg: string): void => console.warn(msg);
export const logError = (msg: any): void => console.error(msg);

// Note: The root starter.ts script is not using this version
// of the checkBlockchain function, for ECMAScript version reasons
// The React Native app itself still is using this version, though
// TODO: Debug this further and remove the unneeded version / merge them

export const checkBlockchain = async (): Promise<boolean> => {
  logInfo("Checking blockchain");
  loadConfig();
  const provider = ProviderFactory.getProvider();
  try {
    await provider.getBlockNumber();
  } catch (err) {
    return false;
  }
  return true;
};

// Note: `toLocaleString` doesn't work on Android
// See more: https://github.com/facebook/react-native/issues/19410#issuecomment-434232762
export const formatNumber = (number: string | number): string => {
  if (typeof number === "string") {
    return number;
  }
  if (Platform.OS === "android") {
    // only android needs polyfill
    import("intl");
    import("intl/locale-data/jsonp/en-US");
  }

  // TODO: Handle internationalization for other regions
  const formatter = new Intl.NumberFormat("en-US");
  const formattedNumber = formatter.format(number);
  return formattedNumber;
};

interface Element {
  id: number | string;
}

export const toListIfNot = (itemOrList: Element | Element[]): Element[] =>
  Array.isArray(itemOrList) ? itemOrList : [itemOrList];

export const removeFromList = (
  list: { filter: (arg0: (e: any) => boolean) => object[] },
  toRemove: any
): object[] => {
  const elementsToRemove = toListIfNot(toRemove);
  const idsToRemove = elementsToRemove.map(e => e.id);
  return list.filter((e: { id: any }) => !idsToRemove.includes(e.id));
};

export const isInList = (
  list: { findIndex: (arg0: (e: any) => boolean) => number },
  toSearchFor: any
): boolean => {
  const elementsToFind = toListIfNot(toSearchFor);
  const idsToFind = elementsToFind.map(e => e.id);
  const result = list.findIndex((e: { id: any }) => !idsToFind.includes(e.id));
  if (!result) {
    return false;
  } else {
    return true;
  }
};

export const listsAreEqual = (first, second: object[]): boolean => {
  if (first.length !== second.length) return false;

  return (
    first.every((e: any) => second.includes(e)) &&
    second.every((e: any) => first.includes(e))
  );
};

// Update item from any list of objects having id as key field
export const updateListItem = (
  list: { map: (arg0: (item: any) => any) => object[] },
  toUpdateId: any,
  entriesToUpdate: any
): object[] => {
  return list.map((item: { id: any }) => {
    return item.id === toUpdateId ? { ...item, ...entriesToUpdate } : item;
  });
};

export const openURL = async (url: string): Promise<void> => {
  const supported = await Linking.canOpenURL(url);

  if (!supported) throw Error(`Can't handle url: ${url}`);

  try {
    await Linking.openURL(url);
  } catch (err) {
    throw Error(`Unable to open url: ${url}`);
  }
};

export const restoreCreationStateOfAccountFromBlockchain = async (account: {
  address: any;
}): Promise<object> => {
  const provider = ProviderFactory.getProvider();
  const { address } = account;

  const contracts: Contracts = getContracts();
  const { marketplaceContract, manaContract } = contracts;

  const ethersBalance = await provider.getBalance(address);
  const manaBalance = await manaContract.balanceOf(address);
  const allowance = await manaContract.allowance(
    address,
    marketplaceContract.getAddress()
  );

  let creationStatus = NOT_STARTED;
  const creationActions = {};

  const accountCreated = account !== null;
  const fundedWithEthers = `${ethersBalance}` !== `${ZERO}`;
  const fundedWithMana = `${manaBalance}` !== `${ZERO}`;
  const marketplaceWasApproved = `${allowance}` != `${ZERO}`;

  if (accountCreated) {
    creationStatus = FUNDING_WITH_ETH;
    creationActions[FUNDING_WITH_ETH] = null;
  }

  if (fundedWithEthers) {
    creationStatus = FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE;
    creationActions[APPROVING_MARKETPLACE] = null;
    creationActions[FUNDING_WITH_MANA] = null;
  }

  if (fundedWithMana && !marketplaceWasApproved) {
    creationStatus = APPROVING_MARKETPLACE;
  }

  if (!fundedWithMana && marketplaceWasApproved) {
    creationStatus = FUNDING_WITH_MANA;
  }

  if (fundedWithMana && marketplaceWasApproved) {
    creationStatus = READY_TO_USE;
  }

  return { creationStatus, creationActions };
};

export default {
  checkBlockchain,
  approveManaSpending,
  addressesAreEqual,
  showFatalError,
  showError,
  showWarn,
  showInfo,
  logInfo,
  logWarn,
  logError,
  fundAccountWithEthers,
  fundAccountWithEthersVanilla,
  fundAccountWithMana,
  getContracts,
  formatNumber,
  removeFromList,
  isInList,
  listsAreEqual,
  openURL,
  getNetworkName,
  buildBlockchainUrlFromActionId,
  buildBlockchainUrlFromAddress,
  restoreCreationStateOfAccountFromBlockchain,
  updateListItem,
  toListIfNot,
};
