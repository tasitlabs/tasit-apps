import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LandForSale from "@presentational/LandForSale";

// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class LandForSaleListItem extends React.PureComponent {
  render() {
    const { onPress, landForSale } = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.row}>
          <LandForSale landForSale={landForSale} />
        </View>
      </TouchableHighlight>
    );
  }
}

// TODO: Migrate me to TypeScript types
LandForSaleListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  landForSale: PropTypes.object.isRequired,
};

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
