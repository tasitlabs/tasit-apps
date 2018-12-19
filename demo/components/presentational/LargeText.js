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

const styles = StyleSheet.create({
  text: {
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textColor,
  },
});
