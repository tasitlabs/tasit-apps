import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MyAsset from "../MyAsset";
type MyAssetsListItemProps = {
  asset: object;
  userAction: object;
};
// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class MyAssetsListItem extends React.PureComponent<
  MyAssetsListItemProps,
  {}
> {
  render() {
    const { asset, userAction } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <MyAsset asset={asset} userAction={userAction} />
        </View>
      </TouchableHighlight>
    );
  }
}
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
