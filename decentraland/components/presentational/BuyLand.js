import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import LandForSale from "./LandForSale";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function BuyLand(props) {
  const { landForSale, onBuy, accountInfo } = props;
  const {
    account,
    setupInProgress: waitingForAccountSetup,
    fundedWithEthers,
    fundedWithMana,
    approvedMarketplace,
  } = accountInfo;

  let waitingMessage = "";
  if (waitingForAccountSetup) {
    if (account == null) waitingMessage = "Generating account...";
    else if (!fundedWithEthers) waitingMessage = "Funding account with ETH...";
    else if (!fundedWithMana && !approvedMarketplace)
      waitingMessage = "Funding account with MANA and approving marketplace...";
    else if (!approvedMarketplace) waitingMessage = "Approving marketplace...";
    else if (!fundedWithMana) waitingMessage = "Funding account with MANA...";
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
  accountInfo: PropTypes.object.isRequired,
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
