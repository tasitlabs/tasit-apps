import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Button from "@presentational/Button";

// import { Linking } from "expo";
import AppLink from "react-native-app-link";

export default function WalletButton({ appName, scheme }) {
  console.info("appName", appName);
  console.info("scheme", scheme);
  const onConnect = async () => {
    try {
      // TODO: Pick scheme dynamically based on app name
      let url = `${scheme}://transaction?hello=world&goodbye=now`;

      console.info("Deep linking URL", url);

      // TODO: Change config to use test wallet app
      const config = {
        appName: appName,
        appStoreId: "1447390375", // TODO: Make dynamic
        appStoreLocale: "us",
        playStoreId: "io.gnosis.safe", // TODO: Make dynamic
      };

      console.info("App store config", config);

      // TODO: Query for presence of the app using a separate function
      await AppLink.maybeOpenURL(url, config);
    } catch (error) {
      // handle error
      console.info("Error", error);
    }
  };
  return (
    <View style={styles.buttonView}>
      <Button title="Connect with wallet" onPress={onConnect} />
    </View>
  );
}

WalletButton.propTypes = {
  appName: PropTypes.string.isRequired,
  scheme: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
