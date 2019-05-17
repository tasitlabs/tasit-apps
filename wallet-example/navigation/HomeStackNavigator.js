import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import PropTypes from "prop-types";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";

// TODO: Maybe move path here?

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: ""
  }
});

export function IconDisplay({ focused }) {
  return (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  );
}

HomeStackNavigator.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: IconDisplay
};

IconDisplay.propTypes = {
  focused: PropTypes.bool
};

export default HomeStackNavigator;
