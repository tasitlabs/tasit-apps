import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import LandForSale from "./LandForSale";
import Button from "./Button";
import Colors from "@constants/Colors";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const {
  NOT_STARTED,
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

export default function BuyLand(props) {
  const { landForSale, onBuy, accountCreationStatus } = props;
  const waitingForAccountSetup =
    accountCreationStatus !== NOT_STARTED &&
    accountCreationStatus != READY_TO_USE;

  let waitingMessage = "";
  switch (accountCreationStatus) {
    case NOT_STARTED:
      break;
    case GENERATING_ACCOUNT:
      waitingMessage = "Generating account...";
      break;
    case FUNDING_WITH_ETH:
      waitingMessage = "Funding account with ETH...";
      break;
    case FUNDING_WITH_MANA:
      waitingMessage = "Funding account with MANA...";
      break;
    case APPROVING_MARKETPLACE:
      waitingMessage = "Approving marketplace...";
      break;
    case READY_TO_USE:
      break;
    default:
  }

  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      {waitingForAccountSetup ? (
        <React.Fragment>
          <View style={styles.buttonView}>
            <Button title="Buy" disabled={true} onPress={() => {}} />
          </View>
          <View style={styles.textRow}>
            <Text>{waitingMessage}</Text>
          </View>
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
};

const styles = StyleSheet.create({
  textRow: { flexDirection: "row" },
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
