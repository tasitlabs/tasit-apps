import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import LandForSale from "./LandForSale";
import Button from "./Button";
import AccountCreationProgress from "./AccountCreationProgress";
import Colors from "@constants/Colors";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { NOT_STARTED, READY_TO_USE } = AccountCreationStatus;

export default function BuyLand(props) {
  const {
    landForSale,
    onBuy,
    accountCreationStatus,
    accountCreationAction,
  } = props;

  const waitingForAccountSetup =
    accountCreationStatus !== NOT_STARTED &&
    accountCreationStatus !== READY_TO_USE;

  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      {waitingForAccountSetup ? (
        <React.Fragment>
          <View style={styles.buttonView}>
            <Button title="Buy" disabled={true} onPress={() => {}} />
          </View>
          <AccountCreationProgress
            status={accountCreationStatus}
            action={accountCreationAction}
          />
        </React.Fragment>
      ) : (
        <View style={styles.buttonView}>
          <Button title="Buy" onPress={onBuy} />
        </View>
      )}
    </View>
  );
}

BuyLand.propTypes = {
  landForSale: PropTypes.object.isRequired,
  onBuy: PropTypes.func.isRequired,
  accountCreationStatus: PropTypes.string.isRequired,
  accountCreationAction: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
