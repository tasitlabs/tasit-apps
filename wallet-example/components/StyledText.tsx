import React from "react";
import { Text } from "react-native";

interface MonoTextProps {
  style: string;
}

/* eslint-disable react-native/no-inline-styles */
export class MonoText extends React.Component<MonoTextProps> {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}
