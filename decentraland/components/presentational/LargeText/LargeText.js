import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";

export default function LargeText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

// TODO: Migrate me to TypeScript types
LargeText.propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    color: Colors.textColor,
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    padding: responsiveHeight(2),
    textAlign: "center",
  },
});
