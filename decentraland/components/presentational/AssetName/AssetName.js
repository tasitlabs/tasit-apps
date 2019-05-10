import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
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
