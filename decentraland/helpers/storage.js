import { SecureStore } from "expo";
import { AsyncStorage } from "react-native";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

// Storage keys
const EPHEMERAL_ACCOUNT_PRIV_KEY = "EPHEMERAL_ACCOUNT_PRIV_KEY";
const MY_ASSETS_LIST = "MY_ASSETS_LIST";
const EPHEMERAL_ACCOUNT_CREATION_STATUS = "EPHEMERAL_ACCOUNT_CREATION_STATUS";
const EPHEMERAL_ACCOUNT_CREATION_ACTIONS = "EPHEMERAL_ACCOUNT_CREATION_ACTIONS";
const APP_IS_FIRST_USE = "APP_IS_FIRST_USE";

export const storeIsFirstUse = async isFirstUse => {
  const strIsFirstUse = _toString(isFirstUse);
  await _storeData(APP_IS_FIRST_USE, strIsFirstUse, false);
};

export const retrieveIsFirstUse = async () => {
  const strIsFirstUse = await _retrieveData(APP_IS_FIRST_USE);
  const isFirstUse = _fromString(strIsFirstUse);
  if (isFirstUse === null) return true;
  return isFirstUse;
};

export const storeAccountCreationActions = async creationActions => {
  const strCreationActions = _toString(creationActions);
  await _storeData(
    EPHEMERAL_ACCOUNT_CREATION_ACTIONS,
    strCreationActions,
    false
  );
};

export const retrieveAccountCreationActions = async () => {
  const strCreationActions = await _retrieveData(
    EPHEMERAL_ACCOUNT_CREATION_ACTIONS
  );
  let creationActions = _fromString(strCreationActions);
  return creationActions;
};

export const storeAccountCreationStatus = async status => {
  await _storeData(EPHEMERAL_ACCOUNT_CREATION_STATUS, status, false);
};

export const retrieveAccountCreationStatus = async () => {
  const status = await _retrieveData(EPHEMERAL_ACCOUNT_CREATION_STATUS);
  return status;
};

export const storeAccount = async account => {
  const { privateKey } = account;
  await _storeData(EPHEMERAL_ACCOUNT_PRIV_KEY, privateKey, true);
};

export const retrieveAccount = async () => {
  let account = null;

  const privateKey = await _retrieveData(EPHEMERAL_ACCOUNT_PRIV_KEY);
  if (privateKey != null) account = createFromPrivateKey(privateKey);

  return account;
};

export const storeMyAssets = async myAssets => {
  const strMyAssets = _toString(myAssets);
  await _storeData(MY_ASSETS_LIST, strMyAssets, false);
};

export const retrieveMyAssets = async () => {
  const strMyAssets = await _retrieveData(MY_ASSETS_LIST);
  let myAssets = _fromString(strMyAssets);
  if (!myAssets) myAssets = [];
  return myAssets;
};

const _toString = obj => {
  try {
    return JSON.stringify(obj);
  } catch {
    throw Error(`Unable to parse object to a JSON string.`);
  }
};

const _fromString = string => {
  try {
    return JSON.parse(string);
  } catch {
    throw Error(`Unable to parse JSON string to an object.`);
  }
};

// Note: the value should be a string
const _storeData = async (key, value, securely) => {
  try {
    if (securely) {
      // More about options:
      // https://docs.expo.io/versions/latest/sdk/securestore/#securestoresetitemasynckey-value-options
      const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED };
      await SecureStore.setItemAsync(key, value, options);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    throw Error(`Unable to ${securely ? "securely" : ""} store data.`);
  }
};

const _retrieveData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value === null) value = await SecureStore.getItemAsync(key);

    return value;
  } catch (error) {
    throw Error(`Unable to retrieve data from storage.`);
  }
};

export default {
  storeAccount,
  retrieveAccount,
  storeMyAssets,
  retrieveMyAssets,
  storeAccountCreationStatus,
  retrieveAccountCreationStatus,
  storeAccountCreationActions,
  retrieveAccountCreationActions,
  storeIsFirstUse,
  retrieveIsFirstUse,
};
