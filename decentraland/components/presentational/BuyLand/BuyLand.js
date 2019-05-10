import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Button from "@shared-presentational/Button";
import Colors from "@shared-constants/Colors";
import LandForSale from "@presentational/LandForSale";
import AccountCreationProgress from "@presentational/AccountCreationProgress";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { NOT_STARTED, READY_TO_USE } = AccountCreationStatus;

export default function BuyLand(props) {
  const {
    landForSale,
    onBuy,
    accountCreationStatus,
    accountCreationActions,
  } = props;

  const waitingForAccountSetup =
    accountCreationStatus !== NOT_STARTED &&
    accountCreationStatus !== READY_TO_USE;

  const onPress = waitingForAccountSetup ? () => {} : onBuy;
  const buttonDisabled = waitingForAccountSetup ? true : false;

  const buttonTitle =
    accountCreationStatus !== READY_TO_USE ? "Set up account" : "Buy";

  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      <View style={styles.buttonView}>
        <Button
          title={buttonTitle}
          disabled={buttonDisabled}
          onPress={onPress}
        />
      </View>
      <AccountCreationProgress
        status={accountCreationStatus}
        actions={accountCreationActions}
      />
    </View>
  );
}

BuyLand.propTypes = {
  landForSale: PropTypes.object.isRequired,
  onBuy: PropTypes.func.isRequired,
  accountCreationStatus: PropTypes.string.isRequired,
  accountCreationActions: PropTypes.object,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
