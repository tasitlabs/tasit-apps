import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeStackNavigator from "./HomeStackNavigator";
import TransactionStackNavigator from "./TransactionStackNavigator";

export default createBottomTabNavigator({
  Home: {
    Screen: HomeStackNavigator
  },
  Transaction: {
    Screen: TransactionStackNavigator,
    path: "transaction"
  }
});
