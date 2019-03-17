import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function Parcel({ parcel }) {
  const { img, name } = parcel;
  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: img }} />
      <Text>{name}</Text>
    </React.Fragment>
  );
}

Parcel.propTypes = {
  parcel: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landImage: {
    width: responsiveWidth(60),
    height: responsiveHeight(20),
  },
});
