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
    if (account == null) waitingMessage = "Waiting for Account generation...";
    else if (!fundedWithEthers) waitingMessage = "Waiting for ETH funding...";
    else if (!fundedWithMana && !approvedMarketplace)
      waitingMessage = "Waiting for MANA funding and Marketplace approval...";
    else if (!approvedMarketplace)
      waitingMessage = "Waiting for Marketplace approval...";
    else if (!fundedWithMana) waitingMessage = "Waiting for MANA funding...";
  }

  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      <View style={styles.buttonView}>
        {waitingForAccountSetup ? (
          <React.Fragment>
            <Button
              title="Waiting for account..."
              disabled={true}
              onPress={() => {}}
            />
            <Text>{waitingMessage}</Text>
          </React.Fragment>
        ) : (
          <Button title="Buy" onPress={onBuy} />
        )}
      </View>
    </View>
  );
}

BuyLand.propTypes = {
  landForSale: PropTypes.object.isRequired,
  onBuy: PropTypes.func.isRequired,
  accountInfo: PropTypes.object.isRequired,
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
