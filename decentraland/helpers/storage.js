import { SecureStore } from "expo";
import { AsyncStorage } from "react-native";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

// Storage keys
const EPHEMERAL_ACCOUNT_PRIV_KEY = "EPHEMERAL_ACCOUNT_PRIV_KEY";
const MY_ASSETS_LIST = "MY_ASSETS_LIST";

export const storeEphemeralAccount = async account => {
  const { privateKey } = account;
  await _storeData(EPHEMERAL_ACCOUNT_PRIV_KEY, privateKey, true);
};

export const retrieveEphemeralAccount = async () => {
  let account = null;

  const privateKey = await _retrieveData(EPHEMERAL_ACCOUNT_PRIV_KEY, true);
  if (privateKey != null) account = createFromPrivateKey(privateKey);

  return account;
};

export const storeMyAssets = async myAssets => {
  const strMyAssets = _fromJson(myAssets);
  await _storeData(MY_ASSETS_LIST, strMyAssets, false);
};

export const retrieveMyAssets = async () => {
  const strMyAssets = await _retrieveData(MY_ASSETS_LIST, false);
  const myAssets = _toJson(strMyAssets);
  return myAssets;
};

const _fromJson = json => {
  try {
    return JSON.stringify(json);
  } catch {
    throw Error(`Unable to parse JSON object to a String.`);
  }
};

const _toJson = string => {
  try {
    return JSON.parse(string);
  } catch {
    throw Error(`Unable to parse String to a JSON object.`);
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

const _retrieveData = async (key, securely) => {
  try {
    let value = null;

    if (securely) value = await SecureStore.getItemAsync(key);
    else value = await AsyncStorage.getItem(key);

    return value;
  } catch (error) {
    throw Error(
      `Unable to ${securely ? "securely" : ""} retrieve data from storage.`
    );
  }
};

export default {
  storeEphemeralAccount,
  retrieveEphemeralAccount,
  storeMyAssets,
  retrieveMyAssets,
};
