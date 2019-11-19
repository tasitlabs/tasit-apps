import React from "react";
import { Image, StyleSheet } from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  landImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(95),
  },
});

interface ParcelObjectProps {
  img: any;
}

interface ParcelProps {
  parcel: ParcelObjectProps;
}

const Parcel: React.FunctionComponent<ParcelProps> = ({ parcel }) => {
  const { img } = parcel;

  return (
    <React.Fragment>
      <Image style={styles.landImage} source={{ uri: img }} />
    </React.Fragment>
  );
};

export default Parcel;
