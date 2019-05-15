import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import TransactionScreen from "../screens/TransactionScreen";

const TransactionStackNavigator = createStackNavigator({
  Transaction: {
    Screen: TransactionScreen,
    path: ""
  }
});

TransactionStackNavigator.navigationOptions = {
  tabBarLabel: "Transaction",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

export default TransactionStackNavigator;
