import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import EstateForSale from "./EstateForSale";

export default function SellOrder({ sellOrder }) {
  const { asset: estate, priceMana } = sellOrder;

  // Note: Conversion to USD will be implemented on v0.2.0
  // <Text>{priceMana} MANA (~${sellOrder.priceUsd})</Text>
  return (
    <View style={styles.landContainer}>
      <EstateForSale estate={estate} />
      <Text>{priceMana} MANA</Text>
    </View>
  );
}

SellOrder.propTypes = {
  sellOrder: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landContainer: {
    width: responsiveWidth(60),
  },
});
