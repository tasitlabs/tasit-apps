import { SecureStore } from "expo";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

// Storage keys
const EPHEMERAL_ACCOUNT_PRIV_KEY = "EPHEMERAL_ACCOUNT_PRIV_KEY";
const MY_ASSETS_LIST = "MY_ASSETS_LIST";

const storeEphemeralAccount = async account => {
  const { privateKey } = account;
  await _storeData(EPHEMERAL_ACCOUNT_PRIV_KEY, privateKey);
};

const retrieveEphemeralAccount = async () => {
  let account = null;

  const privateKey = await _retrieveData(EPHEMERAL_ACCOUNT_PRIV_KEY);
  if (privateKey != null) account = createFromPrivateKey(privateKey);

  return account;
};

const storeMyAssets = async myAssets => {
  const strMyAssests = JSON.stringify(myAssets);
  await _storeData(MY_ASSETS_LIST, strMyAssests);
};

const retrieveMyAssets = async () => {
  const strMyAssests = await _retrieveData(MY_ASSETS_LIST);
  const myAssets = JSON.parse(strMyAssests);
  return myAssets;
};

// Note: the value should be a string
const _storeData = async (key, value) => {
  try {
    // More about options:
    // https://docs.expo.io/versions/latest/sdk/securestore/#securestoresetitemasynckey-value-options
    const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED };
    await SecureStore.setItemAsync(key, value, options);
  } catch (error) {
    throw Error("Unable to securely store data.");
  }
};

const _retrieveData = async key => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    throw Error("Unable to retrieve data from storage.");
  }
};

export default {
  storeEphemeralAccount,
  retrieveEphemeralAccount,
  storeMyAssets,
  retrieveMyAssets,
};
