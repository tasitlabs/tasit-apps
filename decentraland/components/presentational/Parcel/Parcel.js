import React from "react";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function Parcel({ parcel }) {
  let { img } = parcel;

  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: img }} />
    </React.Fragment>
  );
}

Parcel.propTypes = {
  parcel: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(95),
  },
});
