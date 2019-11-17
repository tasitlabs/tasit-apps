import { Platform, Linking } from "react-native";
import { Toast } from "native-base";

import { Action, ContractBasedAccount, TasitContracts } from "tasit-sdk";

const { ConfigLoader } = Action;
import ProviderFactory from "tasit-action/dist/ProviderFactory";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
import AccountCreationStatus from "../constants/AccountCreationStatus";

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

interface MarketplaceContractObject {
  getAddress: any; // TODO: Change me to a function type
}

interface ManaContractObject {
  setAccount: any; // TODO: Change me to a function type
  approve: any; // TODO: Change me to a function type
}

interface GnosisSafeContractObject {
  setAccount: any; // TODO: Change me to a function type
  setSigners: any; // TODO: Change me to a function type
  transferEthere: any; // TODO: Change me to a function type
}

import { ActionObject } from "../types/ActionObject";

interface Contracts {
  marketplaceContract: MarketplaceContractObject;
  manaContract: ManaContractObject;
  gnosisSafeContract: GnosisSafeContractObject;
}

export const getContracts = (): Contracts => {
  const networkName = getNetworkName();
  const {
    MANAToken,
    LANDProxy,
    EstateRegistry,
    Marketplace,
    GnosisSafe: GnosisSafeInfo,
  } = TasitContracts[networkName];

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

export const addressesAreEqual = (address1, address2): boolean => {
  return address1.toUpperCase() === address2.toUpperCase();
};

export const approveManaSpending = (fromAccount): ActionObject => {
  const contracts = getContracts();
  const { manaContract, marketplaceContract } = contracts;
  const toAddress = marketplaceContract.getAddress();
  manaContract.setAccount(fromAccount);

  const action = manaContract.approve(toAddress, HALF_MILLION);
  return action;
};

export const fundAccountWithEthers = (accountAddress): ActionObject => {
  const contracts = getContracts();
  const { gnosisSafeContract } = contracts;
  gnosisSafeContract.setAccount(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  const action = gnosisSafeContract.transferEther(accountAddress, SMALL_AMOUNT);
  console.info("Built the action to transfer ETH to ephemeral account");
  return action;
};

export const fundAccountWithMana = (accountAddress): ActionObject => {
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
export const buildBlockchainUrlFromActionId = (actionId): string => {
  const networkName = getNetworkName();
  const transactionHash = actionId;
  const url = `https://${networkName}.etherscan.io/tx/${transactionHash}`;
  return url;
};

// More about Toast component: https://docs.nativebase.io/Components.html#toast-def-headref
const showToast = (msg): void =>
  Toast.show({ text: msg, duration: 3000, buttonText: "Okay" });

export const showFatalError = (msg): void => console.error(msg);
export const showError = (msg): void => showToast(`ERROR: ${msg}`);
export const showWarn = (msg): void => showToast(`WARN: ${msg}`);
export const showInfo = (msg): void => showToast(`${msg}`);

export const logInfo = (msg): void => console.info(msg);
export const logWarn = (msg): void => console.warn(msg);
export const logError = (msg): void => console.error(msg);

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
export const formatNumber = (number): string => {
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

export const toListIfNot = (itemOrList): object[] =>
  Array.isArray(itemOrList) ? itemOrList : [itemOrList];

export const removeFromList = (list, toRemove): object[] => {
  const elementsToRemove = toListIfNot(toRemove);
  const idsToRemove = elementsToRemove.map(e => e.id);
  return list.filter(e => !idsToRemove.includes(e.id));
};

export const listsAreEqual = (first, second): boolean => {
  if (first.length !== second.length) return false;

  return (
    first.every(e => second.includes(e)) && second.every(e => first.includes(e))
  );
};

// Update item from any list of objects having id as key field
export const updateListItem = (list, toUpdateId, entriesToUpdate): object[] => {
  return list.map(item => {
    return item.id === toUpdateId ? { ...item, ...entriesToUpdate } : item;
  });
};

export const openURL = async (url): Promise<void> => {
  const supported = await Linking.canOpenURL(url);

  if (!supported) throw Error(`Can't handle url: ${url}`);

  try {
    await Linking.openURL(url);
  } catch (err) {
    throw Error(`Unable to open url: ${url}`);
  }
};

export const restoreCreationStateOfAccountFromBlockchain = async (
  account
): Promise<object> => {
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
  fundAccountWithMana,
  getContracts,
  formatNumber,
  removeFromList,
  listsAreEqual,
  openURL,
  getNetworkName,
  buildBlockchainUrlFromActionId,
  restoreCreationStateOfAccountFromBlockchain,
  updateListItem,
  toListIfNot,
};
