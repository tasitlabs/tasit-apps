import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { responsiveHeight } from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";

export function AssetName({ name }) {
  if (!name) name = "(No name for this one right now)";

  return (
    <View style={styles.landNameContainer}>
      <Text style={styles.landName}>{name}</Text>
    </View>
  );
}

// TODO: Migrate me to TypeScript types
AssetName.propTypes = {
  name: PropTypes.string.isRequired,
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
