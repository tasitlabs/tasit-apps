import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function Estate({ estate }) {
  let { img, name } = estate;
  if (!name) name = "Estate without name";
  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: img }} />
      <Text>{name}</Text>
    </React.Fragment>
  );
}

Estate.propTypes = {
  estate: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landImage: {
    width: responsiveWidth(95),
    height: responsiveHeight(20),
  },
});
