import React from "react";
import * as Icon from "@expo/vector-icons";
import Colors from "../constants/Colors";
/* eslint-disable react-native/no-inline-styles */

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

export class TabBarIcon extends React.Component<TabBarIconProps, {}> {
  render(): JSX.Element {
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
export default TabBarIcon;
