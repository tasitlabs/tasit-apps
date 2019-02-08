import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ListSellOrdersScreen from "./screens/ListSellOrdersScreen";
import SellOrderClaimScreen from "./screens/SellOrderClaimScreen";
import SellOrderExecuteScreen from "./screens/SellOrderExecuteScreen";
import OnboardingHomeScreen from "./screens/OnboardingHomeScreen";
import EthereumQuestionScreen from "./screens/EthereumQuestionScreen";
import EthereumSignUpScreen from "./screens/EthereumSignUpScreen";
import EthereumSignInScreen from "./screens/EthereumSignInScreen";
import Colors from "@constants/Colors.js";

const AppNavigator = createStackNavigator(
  {
    HomeScreen,
    ListSellOrdersScreen,
    SellOrderClaimScreen,
    SellOrderExecuteScreen,
    OnboardingHomeScreen,
    EthereumQuestionScreen,
    EthereumSignUpScreen,
    EthereumSignInScreen,
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.headerBackgroundColor,
      },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);

export default createAppContainer(AppNavigator);
