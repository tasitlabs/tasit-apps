import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MyAsset from "../MyAsset";

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

type MyAssetsListItemProps = {
  asset: object;
  userAction: object;
};

// Back before we moved to hooks, this was a pure component
// rather than a function component for performance reasons
// See LandforSaleList component for suggested next steps
const MyAssetsListItem: React.FunctionComponent<MyAssetsListItemProps> = ({
  asset,
  userAction,
}) => {
  return (
    <TouchableHighlight>
      <View style={styles.row}>
        <MyAsset asset={asset} userAction={userAction} />
      </View>
    </TouchableHighlight>
  );
};

export default MyAssetsListItem;
