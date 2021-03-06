import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Linking } from "expo";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppNavigator from "./navigation/AppNavigator";
import Colors from "./constants/Colors";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";
import { addTransaction } from "./store/actions";

const store = createStore(rootReducer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

type AppState = {
  redirectData: null;
  isLoadingComplete: boolean;
};

// TODO: Refactor into a functional component like this:
// export default function App() {
export default class App extends React.Component<{}, AppState> {
  state = {
    redirectData: null,
    isLoadingComplete: false,
  };

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
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator uriPrefix={prefix} />
          </View>
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
    const { queryParams, path } = data;
    if (!path) {
      console.info("Home screen (empty) deep link path");
      return; // returning early - leave function here
    }
    if (path !== "transaction") {
      console.info("??? Unknown deep link path - no screen transition");
      return; // returning early - leave function here
    }
    console.info("Transaction deep link");
    store.dispatch(addTransaction(queryParams));
  };

  _getInitialUrl = async (): Promise<void> => {
    const url = await Linking.getInitialURL();
    const data = Linking.parse(url);
    console.info("App not already open");
    this._handleDeepLinkPayload(data);
  };

  _loadResourcesAsync = async (): Promise<any> => {
    // TODO: Decide if we need to remove
    // the linking listener somewhere
    console.info("Adding deep linking listener");
    this._addLinkingListener();
    await this._getInitialUrl();
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      }),
    ]);
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
