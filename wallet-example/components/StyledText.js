import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

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

MonoText.propTypes = {
  style: PropTypes.object
};
