import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import LandForSale from "./LandForSale";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function BuyLand(props) {
  const { landForSale, onBuy, waitingForAccountSetup } = props;
  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      <View style={styles.buttonView}>
        {waitingForAccountSetup ? (
          <Button title="Waiting for account..." disabled={true} />
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
  waitingForAccountSetup: PropTypes.bool.isRequired,
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
