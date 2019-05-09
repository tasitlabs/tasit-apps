import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "@shared-constants/Colors";
import PropTypes from "prop-types";

export default function LargeText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

LargeText.propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textColor,
  },
});
