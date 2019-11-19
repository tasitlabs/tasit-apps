import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LandForSale from "../LandForSale";

import LandForSaleObjectProps from "../../../types/LandForSaleObjectProps";

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: responsiveHeight(1),
    paddingBottom: responsiveHeight(3),
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    paddingTop: responsiveHeight(3),
  },
});

type LandForSaleListItemProps = {
  onPress: (...args: any[]) => any;
  landForSale: LandForSaleObjectProps;
};

const LandForSaleListItem: React.FunctionComponent<LandForSaleListItemProps> = React.memo(
  ({ onPress, landForSale }) => {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.row}>
          <LandForSale landForSale={landForSale} />
        </View>
      </TouchableHighlight>
    );
  }
);

export default LandForSaleListItem;
