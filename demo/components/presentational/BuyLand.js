import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import LandForSale from "./LandForSale";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function BuyLand(props) {
  const { sellOrder, onOrderExecution } = props;
  return (
    <View style={styles.container}>
      <LandForSale sellOrder={sellOrder} />
      <View style={styles.buttonView}>
        <Button title="Buy" onPress={onOrderExecution} />
      </View>
    </View>
  );
}

BuyLand.propTypes = {
  sellOrder: PropTypes.object.isRequired,
  onOrderExecution: PropTypes.func.isRequired,
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
