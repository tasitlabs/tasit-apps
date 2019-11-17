import React, { useState, useEffect } from "react";
import { YellowBox } from "react-native";

import { AppLoading, Linking } from "expo";
import * as Font from "expo-font";

import AppNavigator from "./AppNavigator";
import Paths from "./constants/Paths";

import { Provider } from "react-redux";
import { createStore } from "redux";
import decentralandApp from "./redux/reducers";
import {
  setAccount,
  setMyAssetsList,
  setAccountCreationStatus,
  setAccountCreationActions,
  addUserAction,
} from "./redux/actions";
import applyMiddleware from "./redux/middlewares";

import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
// import tasitSdkConfig from "./config/current";
const tasitSdkConfig = require("./config/current");

import { checkBlockchain, showFatalError } from "./helpers";

import {
  retrieveAccount,
  clearAllStorage,
  retrieveMyAssets,
  retrieveAccountCreationStatus,
  retrieveAccountCreationActions,
  storeIsFirstUse,
  retrieveIsFirstUse,
  retrieveUserActions,
} from "./helpers/storage";

import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";

const store = createStore(decentralandApp, applyMiddleware);

type AppProps = {
  skipLoadingScreen?: boolean;
};

// Refs: https://docs.nativebase.io/docs/GetStarted.html
const _loadFonts = async (): Promise<void> => {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    // eslint-disable-next-line @typescript-eslint/camelcase
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    // TODO: Debug up-front loading of Ionicons
    // ...Ionicons.font,
    ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });
};

const _setupTasitSDK = async (): Promise<void> => {
  ConfigLoader.setConfig(tasitSdkConfig);
  const connectionOK = await checkBlockchain();
  if (!connectionOK) {
    const errorMessage = `Failed to establish the connection to the blockchain.
Is the config file correct?`;
    showFatalError(errorMessage);
  }
};

const _checkIfIsFirstUse = async (): Promise<void> => {
  // Note: Forcing account removal after app uninstall
  // On iOS environment, Secure Store data remains even after app uninstallation
  const isFirstUse = await retrieveIsFirstUse();
  if (isFirstUse) {
    await clearAllStorage();
    await storeIsFirstUse(false);
  }
};

const _loadAccountInfo = async (): Promise<void> => {
  const account = await retrieveAccount();
  const creationStatus = await retrieveAccountCreationStatus();
  const creationActions = await retrieveAccountCreationActions();
  if (account) {
    store.dispatch(setAccount(account));
  }
  if (creationStatus) {
    store.dispatch(setAccountCreationStatus(creationStatus));
  }
  if (creationActions) {
    store.dispatch(setAccountCreationActions(creationActions));
  }
};

const _loadMyAssets = async (): Promise<void> => {
  const myAssets = await retrieveMyAssets();
  const userActions = await retrieveUserActions();
  if (userActions) store.dispatch(addUserAction(userActions));
  if (myAssets) store.dispatch(setMyAssetsList(myAssets));
};

const _handleRedirect = (event): void => {
  const data = Linking.parse(event.url);
  console.info("** App WAS already open **");
  _handleDeepLinkPayload(data);
};

const _handleDeepLinkPayload = (data): void => {
  const { path } = data;
  if (!path) {
    console.info("Home screen (empty) deep link path");
    return; // returning early - leave function here
  }
  if (
    path !== Paths.buyLand &&
    path !== Paths.myProfile &&
    path !== Paths.myAssets &&
    path !== Paths.forSale
  ) {
    console.info("??? Unknown deep link path - no screen transition");
    return; // returning early - leave function here
  }
  console.info("Known deep link", path);
};

const _getInitialUrl = async (): Promise<void> => {
  const url = await Linking.getInitialURL();
  const data = Linking.parse(url);
  console.info("App not already open");
  _handleDeepLinkPayload(data);
};

// More about AppLoading: https://docs.expo.io/versions/latest/sdk/app-loading/
const _loadResourcesAsync = async (): Promise<void> => {
  // TODO: Decide if we need to remove
  // the linking listener somewhere
  console.info("Adding deep linking listener");
  _addLinkingListener();
  await _getInitialUrl();
  const loadFonts = _loadFonts();
  const loadTasitSDK = _setupTasitSDK();

  const loadFromStorage = async (): Promise<void[]> => {
    await _checkIfIsFirstUse();
    const loadMyAssets = _loadMyAssets();
    const loadAccountInfo = _loadAccountInfo();
    return Promise.all([loadMyAssets, loadAccountInfo]);
  };

  // Because AppLoading expects Promise<void>, we await
  // all the promises then return nothing
  // TODO: Make sure it still can trigger onError when
  // something goes wrong with this approach
  await Promise.all([loadFromStorage(), loadFonts, loadTasitSDK]);
  return;
};

const _handleLoadingError = (error): void => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

const _addLinkingListener = (): void => {
  Linking.addEventListener("url", _handleRedirect);
};

const _removeLinkingListener = (): void => {
  Linking.removeEventListener("url", _handleRedirect);
};

function App(props: AppProps) {
  const [isLoadingComplete, setIsLoadingComplete]: [boolean, any] = useState(
    false
  );

  const _handleFinishLoading = (): void => {
    setIsLoadingComplete({ isLoadingComplete: true });
  };

  const { skipLoadingScreen } = props;

  useEffect(() => {
    // Ignoring setting timer warnings on the app UI
    YellowBox.ignoreWarnings(["Setting a timer"]);
  });

  const prefix = Linking.makeUrl("/");
  // console.info("app prefix", prefix);
  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigator uriPrefix={prefix} />
        </Root>
      </Provider>
    );
  }
}

export default App;
