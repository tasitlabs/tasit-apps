import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeStackNavigator from "./HomeStackNavigator";
import TransactionStackNavigator from "./TransactionStackNavigator";

const MainTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    path: "",
  },
  Transaction: {
    screen: TransactionStackNavigator,
    path: "transaction",
  },
});

export default MainTabNavigator;
