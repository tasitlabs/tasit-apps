import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Colors from "../../../constants/Colors";
type AssetNameProps = {
  name: string;
};
export const AssetName: React.SFC<AssetNameProps> = ({ name }) => {
  if (!name) name = "(No name for this one right now)";
  return (
    <View style={styles.landNameContainer}>
      <Text style={styles.landName}>{name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  landName: {
    color: Colors.assetInfoText,
    fontWeight: "bold",
  },
  landNameContainer: {
    paddingTop: responsiveHeight(1),
  },
});
export default AssetName;
