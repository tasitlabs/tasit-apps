import React from "react";
import { Icon } from "expo";

import Colors from "../constants/Colors";
import PropTypes from "prop-types";

/* eslint-disable react-native/no-inline-styles */
export class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
/* eslint-enable react-native/no-inline-styles */

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default TabBarIcon;
