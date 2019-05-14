import React from "react";
import EthereumSignIn from "@presentational/EthereumSignIn";
import AppLink from "react-native-app-link";

export default class EthereumSignInScreen extends React.Component {
  render() {
    const onConnect = async () => {
      try {
        // TODO: Change config to use test wallet app
        const config = {
          appName: "lyft",
          appStoreId: "529379082",
          appStoreLocale: "us",
          playStoreId: "me.lyft.android",
        };
        await AppLink.maybeOpenURL(url, config);
      } catch {
        err => {
          // handle error
          console.log("Error", error);
        };
      }
    };
    return <EthereumSignIn onConnect={onConnect} />;
  }
}
