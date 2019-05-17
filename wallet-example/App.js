import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon, Linking } from "expo";
import AppNavigator from "./navigation/AppNavigator";

import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "@store/reducers";

import { addTransaction } from "@store/actions";

const store = createStore(rootReducer);

export default class App extends React.Component {
  state = {
    redirectData: null,
    isLoadingComplete: false
  };

  render() {
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
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator uriPrefix={prefix} />
          </View>
        </Provider>
      );
    }
  }

  _handleRedirect = event => {
    let data = Linking.parse(event.url);
    console.info("** App WAS already open **");
    this._handleDeepLinkPayload(data);
  };

  _handleDeepLinkPayload = data => {
    const { queryParams, path } = data;
    if (!path) {
      console.info("Empty deep link path");
    } else {
      console.info("Deep link path", path);
    }
    if (path === "transaction") {
      store.dispatch(addTransaction(queryParams));
    }
  };

  _getInitialUrl = async () => {
    const url = await Linking.getInitialURL();
    const data = Linking.parse(url);
    console.info("App not already open");
    this._handleDeepLinkPayload(data);
  };

  _loadResourcesAsync = async () => {
    // TODO: Decide if we need to remove
    // the linking listener somewhere
    console.info("Adding deep linking listener");
    this._addLinkingListener();
    await this._getInitialUrl();
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
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

  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
