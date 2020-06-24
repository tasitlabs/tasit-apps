import React from "react";
import { Text } from "react-native";

interface MonoTextProps {
  style: string;
}

/* eslint-disable react-native/no-inline-styles */
export const MonoText: React.SFC<MonoTextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};
