import React from "react";
import { StyleSheet, View, Platform, Linking } from "react-native";

import { responsiveHeight } from "react-native-responsive-dimensions";
import Button from "@presentational/Button";

export default function WalletButton({ appSlug, appName, scheme }) {
  // console.info("appSlug", appSlug);
  // console.info("appName", appName);
  // console.info("scheme", scheme);
  const openInStore = async ({
    appName,
    appStoreId,
    appStoreLocale = "us",
    playStoreId,
  }) => {
    try {
      // TODO: Pick scheme dynamically based on app name
      const url = `${scheme}://transaction?hello=world&goodbye=now`;

      console.info("Deep linking URL", url);
      // TODO: Move me outside of openInStore function
      // Show something on the screen dynamically based on the results of this
      // (that would need to happen outside of this component)
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        console.info("Can't handle url: " + url);
      } else {
        console.info("Able to handle url: " + url);
        // return Linking.openURL(url);
      }
    } catch (err) {
      console.info("An error occurred", err);
    }
    let appStoreUrl;
    if (Platform.OS === "ios") {
      appStoreUrl = `https://itunes.apple.com/${appStoreLocale}/app/${appName}/id${appStoreId}`;
      Linking.openURL(appStoreUrl);
    } else {
      appStoreUrl = `https://play.google.com/store/apps/details?id=${playStoreId}`;
      Linking.openURL(appStoreUrl);
    }
    console.info("app store url", appStoreUrl);
  };
  const onConnect = async () => {
    try {
      // TODO: Change config to use test wallet app
      const config = {
        appName: appSlug,
        appStoreId: "1447390375", // TODO: Make dynamic
        appStoreLocale: "us",
        playStoreId: "io.gnosis.safe", // TODO: Make dynamic
      };

      console.info("App store config", config);

      // TODO: Query for presence of the app using a separate function
      await openInStore(config);
    } catch (error) {
      // handle error
      console.info("Error", error);
    }
  };
  return (
    <View style={styles.buttonView}>
      <Button title={`Connect with ${appName}`} onPress={onConnect} />
    </View>
  );
}

// TODO: Migrate me to TypeScript types
WalletButton.propTypes = {
  appName: PropTypes.string.isRequired,
  appSlug: PropTypes.string.isRequired,
  scheme: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
