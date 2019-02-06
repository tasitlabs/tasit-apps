import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import EstateForSale from "./EstateForSale";

export default function SellOrder({ sellOrder }) {
  return (
    <View style={styles.landContainer}>
      <EstateForSale estate={sellOrder.asset} />
      <Text>
        {sellOrder.priceMana} MANA (~${sellOrder.priceUsd})
      </Text>
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
