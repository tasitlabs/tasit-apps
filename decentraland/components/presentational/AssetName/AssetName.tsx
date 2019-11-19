import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Colors from "../../../constants/Colors";

import AssetNameProps from "../../../types/AssetNameProps";

const styles = StyleSheet.create({
  landName: {
    color: Colors.assetInfoText,
    fontWeight: "bold",
  },
  landNameContainer: {
    paddingTop: responsiveHeight(1),
  },
});

const AssetName: React.FunctionComponent<AssetNameProps> = ({ name }) => {
  let displayName;
  if (!name) {
    displayName = "(No name for this one right now)";
  } else {
    displayName = name;
  }
  return (
    <View style={styles.landNameContainer}>
      <Text style={styles.landName}>{displayName}</Text>
    </View>
  );
};

export default AssetName;
