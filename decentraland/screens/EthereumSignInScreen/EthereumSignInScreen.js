import React from "react";
import EthereumSignIn from "@presentational/EthereumSignIn";
// import { Linking } from "expo";
import AppLink from "react-native-app-link";

export default class EthereumSignInScreen extends React.Component {
  onConnect = async () => {
    try {
      let url = "tasit-wallet-example://transaction?hello=world&goodbye=now";

      console.info("Deep linking URL", url);

      // TODO: Change config to use test wallet app
      const config = {
        appName: "lyft",
        appStoreId: "529379082",
        appStoreLocale: "us",
        playStoreId: "me.lyft.android",
      };

      console.info("App store config", config);

      // TODO: Query for presence of the app using a separate function
      await AppLink.maybeOpenURL(url, config);
    } catch (error) {
      // handle error
      console.info("Error", error);
    }
  };
  render() {
    return <EthereumSignIn onConnect={this.onConnect} />;
  }
}
