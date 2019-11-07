import React from "react";
import { Image, StyleSheet } from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

interface EstateObjectProps {
  img: any;
}

interface EstateProps {
  estate: EstateObjectProps;
}

const Estate: React.SFC<EstateProps> = ({ estate }) => {
  let { img } = estate;

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

export default Estate;
