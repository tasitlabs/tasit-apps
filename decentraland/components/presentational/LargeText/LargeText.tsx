import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../../../constants/Colors";

interface LargeTextProps {
  children: string;
}

const LargeText: React.SFC<LargeTextProps> = props => {
  return <Text style={styles.text}>{props.children}</Text>;
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

export default LargeText;