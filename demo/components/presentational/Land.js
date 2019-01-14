import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

export default function Land({ land }) {
  return (
    <View style={styles.landContainer}>
      <Image source={land.img} />
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
});
