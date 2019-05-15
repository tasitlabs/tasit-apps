import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";

// TODO: Maybe move path here?

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: ""
  }
});

HomeStackNavigator.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default HomeStackNavigator;
