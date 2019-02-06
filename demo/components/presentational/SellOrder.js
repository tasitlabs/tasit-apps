import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

// Split this component into SellOrder and EstateForSale
export default function Land({ land }) {
  return (
    <View style={styles.landContainer}>
      <Image style={styles.landImage} source={{ uri: land.img }} />
      <Text>{land.name}</Text>
      <Text>
        {land.priceMana} MANA (~${land.priceUsd})
      </Text>
    </View>
  );
}

Land.propTypes = {
  land: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landContainer: {
    width: responsiveWidth(60),
  },
  landImage: {
    width: responsiveWidth(60),
    height: responsiveHeight(20),
  },
});
