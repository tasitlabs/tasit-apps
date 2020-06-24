import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import TabBarIcon from "../components/TabBarIcon";
import TransactionScreen from "../screens/TransactionScreen";
const TransactionStackNavigator = createStackNavigator({
  Transaction: {
    screen: TransactionScreen,
    path: "", // path /trasaction set in tab navigator
  },
});
type IconDisplayProps = {
  focused: boolean;
};
export const IconDisplay: React.SFC<IconDisplayProps> = ({ focused }) => {
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
};
TransactionStackNavigator.navigationOptions = {
  tabBarLabel: "Transaction",
  tabBarIcon: IconDisplay,
};
export default TransactionStackNavigator;
