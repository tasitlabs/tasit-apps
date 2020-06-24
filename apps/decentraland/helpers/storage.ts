// Note: If a piece of data wasn't found, returning null instead of default state of the
// property to avoid coupling with redux reducers
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
import { logWarn, logInfo } from ".";

// Storage keys
const EPHEMERAL_ACCOUNT_PRIV_KEY = "EPHEMERAL_ACCOUNT_PRIV_KEY";
const MY_ASSETS_LIST = "MY_ASSETS_LIST";
const EPHEMERAL_ACCOUNT_CREATION_STATUS = "EPHEMERAL_ACCOUNT_CREATION_STATUS";
const EPHEMERAL_ACCOUNT_CREATION_ACTIONS = "EPHEMERAL_ACCOUNT_CREATION_ACTIONS";
const IS_FIRST_APP_USE = "IS_FIRST_APP_USE";
const USER_ACTIONS = "USER_ACTIONS";

const _clearData = async (key): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logWarn(`Unable to delete data (key = ${key}) from storage.`);
  }
  try {
    const returnValue = await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logWarn(`Unable to delete data key = ${key} from secure storage.`);
  }
};

export const clearAllStorage = async (): Promise<void> => {
  await _clearData(IS_FIRST_APP_USE);
  await _clearData(EPHEMERAL_ACCOUNT_PRIV_KEY);
  await _clearData(USER_ACTIONS);
  await _clearData(EPHEMERAL_ACCOUNT_CREATION_ACTIONS);
  await _clearData(EPHEMERAL_ACCOUNT_CREATION_STATUS);
  await _clearData(MY_ASSETS_LIST);
};

const _toString = (obj): string => {
  if (obj === null) return null;

  try {
    return JSON.stringify(obj);
  } catch {
    throw Error(`Unable to parse object to a JSON string.`);
  }
};

const _fromString = (string): object | string | boolean => {
  try {
    return JSON.parse(string);
  } catch {
    throw Error(`Unable to parse JSON string to an object.`);
  }
};

const _objectFromString = (string): object => {
  const result = _fromString(string);
  // We expect that the type after JSON.parse'ing it will be an object
  if (typeof result === "string") {
    return {};
  } else if (typeof result === "boolean") {
    return {};
  }
  return result;
};

const _booleanFromString = (string): boolean => {
  const result = _fromString(string);
  // We expect that the type after JSON.parse'ing it will be a boolean
  if (typeof result === "string") {
    return true;
  } else if (typeof result === "object") {
    return true;
  }
  return result;
};

const _arrayOfObjectsFromString = (string): object[] => {
  const result = _fromString(string);
  if (typeof result === "string") {
    return [];
  } else if (typeof result === "boolean") {
    return [];
  } else if (typeof result === "object") {
    if (Array.isArray(result)) {
      // TODO: Check that if the array isn't empty, the members are objects
      return result;
    }
  }
  return [];
};

// Note: the value should be a string
const _storeData = async (key, value, securely): Promise<void> => {
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

export const storeUserActions = async (userActions): Promise<void> => {
  const strUserActions = _toString(userActions);
  await _storeData(USER_ACTIONS, strUserActions, false);
};

const _retrieveData = async (key): Promise<string> => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value === null) value = await SecureStore.getItemAsync(key);

    return value;
  } catch (error) {
    throw Error(`Unable to retrieve data from storage.`);
  }
};

export const retrieveUserActions = async (): Promise<object> => {
  const strUserActions = await _retrieveData(USER_ACTIONS);
  const userActions = _objectFromString(strUserActions);
  return userActions;
};

export const storeIsFirstUse = async (isFirstUse): Promise<void> => {
  const strIsFirstUse = _toString(isFirstUse);
  await _storeData(IS_FIRST_APP_USE, strIsFirstUse, false);
};

export const retrieveIsFirstUse = async (): Promise<boolean> => {
  const strIsFirstUse = await _retrieveData(IS_FIRST_APP_USE);
  if (strIsFirstUse === null) return true;
  const isFirstUse = _booleanFromString(strIsFirstUse);
  logInfo(`isFirstUse ${isFirstUse}`);
  return isFirstUse;
};

export const storeAccountCreationActions = async (
  creationActions
): Promise<void> => {
  const strCreationActions = _toString(creationActions);
  await _storeData(
    EPHEMERAL_ACCOUNT_CREATION_ACTIONS,
    strCreationActions,
    false
  );
};

export const retrieveAccountCreationActions = async (): Promise<object[]> => {
  const strCreationActions = await _retrieveData(
    EPHEMERAL_ACCOUNT_CREATION_ACTIONS
  );
  const creationActions = _arrayOfObjectsFromString(strCreationActions);
  return creationActions;
};

export const storeAccountCreationStatus = async (status): Promise<void> => {
  await _storeData(EPHEMERAL_ACCOUNT_CREATION_STATUS, status, false);
};

export const retrieveAccountCreationStatus = async (): Promise<string> => {
  const status = await _retrieveData(EPHEMERAL_ACCOUNT_CREATION_STATUS);
  return status;
};

export const storeAccount = async (account): Promise<void> => {
  const privateKey = account !== null ? account.privateKey : null;
  await _storeData(EPHEMERAL_ACCOUNT_PRIV_KEY, privateKey, true);
};

export const retrieveAccount = async (): Promise<object> => {
  let account = null;

  const privateKey = await _retrieveData(EPHEMERAL_ACCOUNT_PRIV_KEY);
  if (privateKey != null) account = createFromPrivateKey(privateKey);

  return account;
};

export const storeMyAssets = async (myAssets): Promise<void> => {
  const strMyAssets = _toString(myAssets);
  await _storeData(MY_ASSETS_LIST, strMyAssets, false);
};

export const retrieveMyAssets = async (): Promise<object[]> => {
  const strMyAssets = await _retrieveData(MY_ASSETS_LIST);
  const myAssets = _arrayOfObjectsFromString(strMyAssets);
  return myAssets;
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
  retrieveUserActions,
  storeUserActions,
  clearAllStorage,
};
