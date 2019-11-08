import React from "react";
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
console.log("Ionicons", Ionicons);
console.log("Ionicons.font", Ionicons.font);
import { Root } from "native-base";

const store = createStore(decentralandApp, applyMiddleware);

type AppProps = {
  skipLoadingScreen?: boolean;
};

type AppState = {
  isLoadingComplete: boolean;
};

export default class App extends React.Component<AppProps, AppState> {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount(): void {
    // Ignoring setting timer warnings on the app UI
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }

  // Refs: https://docs.nativebase.io/docs/GetStarted.html
  async _loadFonts(): Promise<void> {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      // eslint-disable-next-line @typescript-eslint/camelcase
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      // TODO: Debug up-front loading of Ionicons
      // ...Ionicons.font,
      ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    });
  }

  async _setupTasitSDK(): Promise<void> {
    ConfigLoader.setConfig(tasitSdkConfig);
    const connectionOK = await checkBlockchain();
    if (!connectionOK) {
      const errorMessage = `Failed to establish the connection to the blockchain.
Is the config file correct?`;
      showFatalError(errorMessage);
    }
  }

  async _checkIfIsFirstUse(): Promise<void> {
    // Note: Forcing account removal after app uninstall
    // On iOS environment, Secure Store data remains even after app uninstallation
    const isFirstUse = await retrieveIsFirstUse();
    if (isFirstUse) {
      await clearAllStorage();
      await storeIsFirstUse(false);
    }
  }

  async _loadAccountInfo(): Promise<void> {
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
  }

  async _loadMyAssets(): Promise<void> {
    const myAssets = await retrieveMyAssets();
    const userActions = await retrieveUserActions();
    if (userActions) store.dispatch(addUserAction(userActions));
    if (myAssets) store.dispatch(setMyAssetsList(myAssets));
  }

  render(): JSX.Element {
    const prefix = Linking.makeUrl("/");
    // console.info("app prefix", prefix);
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
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

  _handleRedirect = (event): void => {
    const data = Linking.parse(event.url);
    console.info("** App WAS already open **");
    this._handleDeepLinkPayload(data);
  };

  _handleDeepLinkPayload = (data): void => {
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

  _getInitialUrl = async (): Promise<void> => {
    const url = await Linking.getInitialURL();
    const data = Linking.parse(url);
    console.info("App not already open");
    this._handleDeepLinkPayload(data);
  };

  // More about AppLoading: https://docs.expo.io/versions/latest/sdk/app-loading/
  _loadResourcesAsync = async (): Promise<void> => {
    // TODO: Decide if we need to remove
    // the linking listener somewhere
    console.info("Adding deep linking listener");
    this._addLinkingListener();
    await this._getInitialUrl();
    const loadFonts = this._loadFonts();
    const loadTasitSDK = this._setupTasitSDK();

    const loadFromStorage = async (): Promise<void[]> => {
      await this._checkIfIsFirstUse();
      const loadMyAssets = this._loadMyAssets();
      const loadAccountInfo = this._loadAccountInfo();
      return Promise.all([loadMyAssets, loadAccountInfo]);
    };

    // Because AppLoading expects Promise<void>, we await
    // all the promises then return nothing
    // TODO: Make sure it still can trigger onError when
    // something goes wrong with this approach
    await Promise.all([loadFromStorage(), loadFonts, loadTasitSDK]);
    return;
  };

  _handleLoadingError = (error): void => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = (): void => {
    this.setState({ isLoadingComplete: true });
  };

  _addLinkingListener = (): void => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = (): void => {
    Linking.removeEventListener("url", this._handleRedirect);
  };
}
