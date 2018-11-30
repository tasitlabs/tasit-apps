import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Account } from "tasit-sdk";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
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
        <View style={styles.container}>
          <Text>Welcome to the Tasit demo app</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
