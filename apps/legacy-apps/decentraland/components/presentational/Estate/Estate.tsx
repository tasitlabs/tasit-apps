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

interface EstateObjectProps {
  img: any;
}

interface EstateProps {
  estate: EstateObjectProps;
}

const Estate: React.FunctionComponent<EstateProps> = React.memo(
  ({ estate }) => {
    const { img } = estate;

    return (
      <React.Fragment>
        <Image style={styles.landImage} source={{ uri: img }} />
      </React.Fragment>
    );
  }
);

export default Estate;
