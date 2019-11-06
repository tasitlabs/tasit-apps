import React from "react";
import { Text } from "react-native";

/* eslint-disable react-native/no-inline-styles */
export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}

/* eslint-enable react-native/no-inline-styles */

// TODO: Migrate me to TypeScript types
MonoText.propTypes = {
  style: PropTypes.object
};
