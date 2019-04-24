import React from "react";
import { YellowBox } from "react-native";
import { AppLoading, Font } from "expo";
import PropTypes from "prop-types";
import AppNavigator from "./AppNavigator";
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
import tasitSdkConfig from "./config/current";
import {
  checkBlockchain,
  showFatalError,
  restoreCreationStateOfAccountFromBlockchain,
} from "@helpers";
import {
  retrieveAccount,
  retrieveMyAssets,
  retrieveAccountCreationStatus,
  retrieveAccountCreationActions,
  storeIsFirstUse,
  retrieveIsFirstUse,
  retrieveUserActions,
} from "@helpers/storage";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import { SUCCESSFUL } from "@constants/UserActionStatus";

const store = createStore(decentralandApp, applyMiddleware);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    // Ignoring setting timer warnings on the app UI
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }

  // Refs: https://docs.nativebase.io/docs/GetStarted.html
  async _loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  }

  async _setupTasitSDK() {
    ConfigLoader.setConfig(tasitSdkConfig);
    const connectionOK = await checkBlockchain();
    if (!connectionOK) {
      const errorMessage = `Failed to establish the connection to the blockchain.
Is the config file correct?`;
      showFatalError(errorMessage);
    }
  }

  async _loadAccountInfo() {
    // Note: Forcing account removal after app uninstall
    // On iOS environment, Secure Store data remains even after app uninstallation
    const isFirstUse = await retrieveIsFirstUse();
    if (isFirstUse) {
      // TODO: Uncomment this when 'isFirstUse' flag is being set widely
      //await storeAccount(null);
      await storeIsFirstUse(false);
    }

    const account = await retrieveAccount();
    if (account) {
      store.dispatch(setAccount(account));
      let creationStatus = await retrieveAccountCreationStatus();
      let creationActions = await retrieveAccountCreationActions();

      const isOldAccount =
        account !== null && creationStatus === null && creationActions === null;

      if (isOldAccount) {
        ({
          creationStatus,
          creationActions,
        } = await restoreCreationStateOfAccountFromBlockchain(account));
      }

      if (creationStatus !== null)
        store.dispatch(setAccountCreationStatus(creationStatus));

      if (creationActions !== null)
        store.dispatch(setAccountCreationActions(creationActions));
    }
  }

  async _loadMyAssets() {
    const myAssets = await retrieveMyAssets();
    let userActions = await retrieveUserActions();

    // Handling with actions stored before
    // the introduction of userAction state (<= 0.0.17)
    myAssets.forEach(asset => {
      const { id: assetId, actionId } = asset;

      let userAction = userActions[actionId];

      if (!userAction && !!actionId) {
        userAction = { [actionId]: { assetId, status: SUCCESSFUL } };
        userActions = { ...userActions, userAction };
      }
    });

    if (userActions) store.dispatch(addUserAction(userActions));
    if (myAssets) store.dispatch(setMyAssetsList(myAssets));
  }

  render() {
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
            <AppNavigator />
          </Root>
        </Provider>
      );
    }
  }

  // More about AppLoading: https://docs.expo.io/versions/latest/sdk/app-loading/
  _loadResourcesAsync = async () => {
    const loadFonts = this._loadFonts();
    const loadMyAssets = this._loadMyAssets();

    // Note: _loadAccountInfo needs that TasitSDK is ready to use
    const setupTasitSDKAndLoadAccountInfo = async () => {
      await this._setupTasitSDK();
      await this._loadAccountInfo();
    };

    return Promise.all([
      setupTasitSDKAndLoadAccountInfo(),
      loadFonts,
      loadMyAssets,
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
