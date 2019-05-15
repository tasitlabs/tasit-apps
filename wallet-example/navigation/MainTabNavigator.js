import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import TransactionScreen from "../screens/TransactionScreen";

// TODO: Maybe move path here?
const HomeStack = createStackNavigator({
  Home: {
    Screen: HomeScreen,
    path: ""
  }
});

HomeStack.navigationOptions = {
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

const TransactionStack = createStackNavigator({
  Transaction: {
    Screen: TransactionScreen,
    path: ""
  }
});

TransactionStack.navigationOptions = {
  tabBarLabel: "Transaction",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

export default createBottomTabNavigator({
  Home: {
    Screen: HomeStack
  },
  Transaction: {
    Screen: TransactionStack,
    path: "transaction"
  }
});
