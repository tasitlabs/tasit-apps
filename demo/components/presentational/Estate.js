import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function Estate({ estate }) {
  const { img, name } = estate;
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
    width: responsiveWidth(60),
    height: responsiveHeight(20),
  },
});
