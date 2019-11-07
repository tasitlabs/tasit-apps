import React from "react";
import { Image, StyleSheet } from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

interface ParcelObjectProps {
  img: any;
}

interface ParcelProps {
  parcel: ParcelObjectProps;
}

const Parcel: React.SFC<ParcelProps> = ({ parcel }) => {
  let { img } = parcel;

  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: img }} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  landImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(95),
  },
});

export default Parcel;
