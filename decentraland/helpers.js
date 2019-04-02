import { SecureStore } from "expo";
import { Platform } from "react-native";
import { Toast } from "native-base";
import {
  Account,
  Action,
  ContractBasedAccount,
  TasitContracts,
} from "tasit-sdk";
const { ConfigLoader } = Action;
import ProviderFactory from "tasit-action/dist/ProviderFactory";
import tasitSdkConfig from "./config/default";

import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

const gnosisSafeOwnerPrivKey =
  "0x633a290bcdabb9075c5a4b3885c69ce64b4b0e6079eb929abb2ac9427c49733b";
const gnosisSafeOwner = createFromPrivateKey(gnosisSafeOwnerPrivKey);
const SMALL_AMOUNT = `${5e16}`; // 0.05
const HALF_MILLION = "500000000000000000000000";

// Storage keys
const EPHEMERAL_ACCOUNT_PRIV_KEY = "EPHEMERAL_ACCOUNT_PRIV_KEY";

export const getContracts = () => {
  let contracts;

  const provider = ProviderFactory.getProvider();

  const { _network: network } = provider;
  const networkName = !network ? "local" : network.name;

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

  contracts = {
    estateContract,
    landContract,
    marketplaceContract,
    manaContract,
    gnosisSafeContract,
  };

  return contracts;
};

// Note: the value should be a string
const _storeData = async (key, value) => {
  try {
    // More about options:
    // https://docs.expo.io/versions/latest/sdk/securestore/#securestoresetitemasynckey-value-options
    const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED };
    await SecureStore.setItemAsync(key, value, options);
  } catch (error) {
    showError("Unable to securely store data.");
  }
};

const _retrieveData = async key => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    showError("Unable to retrieve data from storage.");
  }
};

export const recoverAccount = async () => {
  let account = null;

  const privateKey = await _retrieveData(EPHEMERAL_ACCOUNT_PRIV_KEY);
  if (privateKey != null) account = createFromPrivateKey(privateKey);

  return account;
};

export const createAccount = async () => {
  // Note: The timeout for account creation is about ~20 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  const account = Account.create();
  const { privateKey } = account;
  await _storeData(EPHEMERAL_ACCOUNT_PRIV_KEY, privateKey);
  return account;
};

export const addressesAreEqual = (address1, address2) => {
  return address1.toUpperCase() === address2.toUpperCase();
};

export const approveManaSpending = async fromAccount => {
  const contracts = getContracts();
  const { manaContract, marketplaceContract } = contracts;
  const toAddress = marketplaceContract.getAddress();
  manaContract.setWallet(fromAccount);
  const action = manaContract.approve(toAddress, HALF_MILLION);
  await action.waitForNonceToUpdate();
};

export const fundAccountWithEthers = async accountAddress => {
  const contracts = getContracts();
  const { gnosisSafeContract } = contracts;
  gnosisSafeContract.setWallet(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  const transferEthersAction = gnosisSafeContract.transferEther(
    accountAddress,
    SMALL_AMOUNT
  );
  await transferEthersAction.waitForNonceToUpdate();
};

export const fundAccountWithMana = async accountAddress => {
  const contracts = getContracts();
  const { manaContract, gnosisSafeContract } = contracts;
  gnosisSafeContract.setWallet(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  const transferManaAction = gnosisSafeContract.transferERC20(
    manaContract.getAddress(),
    accountAddress,
    HALF_MILLION
  );
  await transferManaAction.waitForNonceToUpdate();
};

// More about Toast component: https://docs.nativebase.io/Components.html#toast-def-headref
const showToast = msg =>
  Toast.show({ text: msg, duration: 3000, buttonText: "Okay" });
export const showFatalError = msg => console.error(msg);
export const showError = msg => showToast(`ERROR: ${msg}`);
export const showWarn = msg => showToast(`WARN: ${msg}`);
export const showInfo = msg => showToast(`${msg}`);

export const checkBlockchain = async () => {
  ConfigLoader.setConfig(tasitSdkConfig);
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
export const formatNumber = number => {
  if (Platform.OS === "android") {
    // only android needs polyfill
    require("intl");
    require("intl/locale-data/jsonp/en-US");
  }
  const formatter = new Intl.NumberFormat("en-US");
  const formattedNumber = formatter.format(number);
  return formattedNumber;
};

export default {
  checkBlockchain,
  approveManaSpending,
  addressesAreEqual,
  showFatalError,
  showError,
  showWarn,
  showInfo,
  fundAccountWithEthers,
  fundAccountWithMana,
  getContracts,
  recoverAccount,
  createAccount,
  formatNumber,
};
