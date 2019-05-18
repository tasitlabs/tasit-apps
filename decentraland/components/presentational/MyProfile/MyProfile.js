import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import MyProfileCreationStatusItem from "@presentational/MyProfileCreationStatusItem";
import ActionStatus from "@constants/ActionStatus";
import MyProfileProgress from "@presentational/MyProfileProgress";
import WalletButton from "@presentational/WalletButton";

// import { Linking } from "expo";
import AppLink from "react-native-app-link";

export default function MyProfile({ progress, creationSteps }) {
  const onConnect = async () => {
    try {
      let url = "tasit-wallet://transaction?hello=world&goodbye=now";

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

  return (
    <View style={styles.container}>
      <MyProfileProgress progress={progress} />
      <WalletButton onConnect={onConnect} />
      <View style={styles.actionItemsContainer}>
        {creationSteps.map(action => {
          const { name, status } = action;

          return (
            <MyProfileCreationStatusItem
              key={name}
              name={name}
              status={status}
            />
          );
        })}
      </View>
    </View>
  );
}

MyProfile.propTypes = {
  progress: PropTypes.number,
  creationSteps: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(Object.values(ActionStatus)),
      name: PropTypes.string,
    })
  ),
};

const styles = StyleSheet.create({
  actionItemsContainer: {
    flex: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: responsiveWidth(12),
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
