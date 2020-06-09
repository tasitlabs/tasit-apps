import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MyAsset from "../MyAsset";

import AssetObjectProps from "../../../types/AssetObjectProps";

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
  asset: AssetObjectProps;
  userAction: object;
};

const MyAssetsListItem: React.FunctionComponent<MyAssetsListItemProps> = React.memo(
  ({ asset, userAction }) => {
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <MyAsset asset={asset} userAction={userAction} />
        </View>
      </TouchableHighlight>
    );
  }
);

export default MyAssetsListItem;
