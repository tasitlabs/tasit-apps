import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "./Estate";

export default function LandForSale({ landForSale }) {
  const { asset: estate, priceMana } = landForSale;

  // Note: Conversion to USD will be implemented on v0.2.0
  // <Text>{priceMana} MANA (~${landForSale.priceUSD})</Text>
  return (
    <View style={styles.landContainer}>
      <Estate estate={estate} />
      <Text>{priceMana} MANA</Text>
    </View>
  );
}

LandForSale.propTypes = {
  landForSale: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landContainer: {
    width: responsiveWidth(60),
  },
});
