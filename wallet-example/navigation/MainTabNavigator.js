import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeStackNavigator from "./HomeStackNavigator";
import TransactionStackNavigator from "./TransactionStackNavigator";

const MainTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    path: ""
  },
  Transaction: {
    screen: TransactionStackNavigator,
    path: "transaction"
  }
});

export default MainTabNavigator;
