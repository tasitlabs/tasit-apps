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

const styles = StyleSheet.create({
  text: {
    color: Colors.textColor,
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    padding: responsiveHeight(2),
    textAlign: "center",
  },
});

// TODO: Think about implications of using React.memo
// with props.children, given the shallow comparison that is done
// to determine whether to rerender
const LargeText: React.FunctionComponent<LargeTextProps> = React.memo(props => {
  return <Text style={styles.text}>{props.children}</Text>;
});

export default LargeText;
