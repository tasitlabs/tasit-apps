import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function EstateForSale({ estate }) {
  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: estate.img }} />
      <Text>{estate.name}</Text>
    </React.Fragment>
  );
}

EstateForSale.propTypes = {
  estate: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landImage: {
    width: responsiveWidth(60),
    height: responsiveHeight(20),
  },
});
