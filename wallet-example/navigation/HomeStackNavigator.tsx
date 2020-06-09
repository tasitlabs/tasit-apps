import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
// TODO: Maybe move path here?
const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: ""
  }
});
type IconDisplayProps = {
  focused?: boolean;
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
HomeStackNavigator.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: IconDisplay
};
export default HomeStackNavigator;
