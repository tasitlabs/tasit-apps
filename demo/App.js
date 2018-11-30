import React from "react";
import { AppLoading, Asset, Font } from "expo";
import "ethers/dist/shims.js";
import { ethers } from "ethers";

// Note: In the future, we'll be importing the Tasit SDK
// which has ethers.js as a dependency rather than importing
// it directly


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

	componentDidMount() {
		Account.create().then((w) => {
			console.log(w.address);
		});
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
