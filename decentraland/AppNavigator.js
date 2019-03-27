import React from "react";

import { Button, Icon } from "native-base";

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ListLandForSaleScreen from "./screens/ListLandForSaleScreen";
import BuyLandScreen from "./screens/BuyLandScreen";
import OnboardingHomeScreen from "./screens/OnboardingHomeScreen";
import EthereumQuestionScreen from "./screens/EthereumQuestionScreen";
import EthereumSignUpScreen from "./screens/EthereumSignUpScreen";
import EthereumSignInScreen from "./screens/EthereumSignInScreen";
import MyAssetsScreen from "./screens/MyAssetsScreen";
import Colors from "@constants/Colors.js";

const defaultNavigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" />
      </Button>
    ),
    headerStyle: {
      backgroundColor: Colors.headerBackgroundColor,
    },
    headerTintColor: Colors.headerTintColor,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
};

const AssetsForSaleNavigator = createStackNavigator(
  {
    HomeScreen,
    ListLandForSaleScreen,
    BuyLandScreen,
    OnboardingHomeScreen,
    EthereumQuestionScreen,
    EthereumSignUpScreen,
    EthereumSignInScreen,
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions,
  }
);

const MyAssetsNavigator = createStackNavigator(
  {
    MyAssetsScreen,
  },
  {
    initialRouteName: "MyAssetsScreen",
    defaultNavigationOptions,
  }
);

const MainDrawerNavigator = createDrawerNavigator(
  {
    AssetsForSale: {
      screen: AssetsForSaleNavigator,
      navigationOptions: {
        drawerLabel: "Assets for sale",
      },
    },
    MyAssets: {
      screen: MyAssetsNavigator,
      navigationOptions: {
        drawerLabel: "My Assets",
      },
    },
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  }
);

export default createAppContainer(MainDrawerNavigator);
