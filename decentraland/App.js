import React from "react";
import { AppLoading, Asset, Font } from "expo";
import PropTypes from "prop-types";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import decentralandApp from "./redux/reducers";
import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
import tasitSdkConfig from "./config/default";
import { checkBlockchain } from "./helpers";

const store = createStore(decentralandApp);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    ConfigLoader.setConfig(tasitSdkConfig);
    const connectionOK = await checkBlockchain();
    if (!connectionOK) {
      console.error("Failed to establish the connection to the blockchain.");
      console.error(`Is the 'config/default.js' file correct?`);
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
          <AppNavigator />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([Asset.loadAsync([]), Font.loadAsync({})]);
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
