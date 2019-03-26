import React from "react";
import { YellowBox } from "react-native";
import { AppLoading, Font } from "expo";
import PropTypes from "prop-types";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import decentralandApp from "./redux/reducers";
import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
import tasitSdkConfig from "./config/default";
import { checkBlockchain, showFatalError } from "./helpers";
import { Root } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const store = createStore(decentralandApp);

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
Is the 'config/default.js' file correct?`;
      showFatalError(errorMessage);
    }
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
    const setupSDK = this._setupTasitSDK();
    const loadFonts = this._loadFonts();

    return Promise.all([setupSDK, loadFonts]);
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
