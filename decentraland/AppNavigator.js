import React from "react";

import { Button, Icon } from "native-base";

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation";

import ListLandForSaleScreen from "./screens/ListLandForSaleScreen";
import BuyLandScreen from "./screens/BuyLandScreen";
import OnboardingHomeScreen from "./screens/OnboardingHomeScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import EthereumQuestionScreen from "./screens/EthereumQuestionScreen";
import EthereumSignUpScreen from "./screens/EthereumSignUpScreen";
import EthereumSignInScreen from "./screens/EthereumSignInScreen";
import MyAssetsScreen from "./screens/MyAssetsScreen";

import Colors from "@constants/Colors.js";
import { responsiveHeight } from "react-native-responsive-dimensions";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.headerBackgroundColor,
    shadowColor: "transparent",
    height: responsiveHeight(7),
  },
};

const headerWithMenuButton = ({ navigation }) => {
  return {
    headerLeft: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" />
      </Button>
    ),
  };
};

const headerWithBackButton = ({ navigation }) => {
  return {
    headerLeft: (
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon name="md-arrow-back" />
      </Button>
    ),
  };
};

const AssetsForSaleNavigator = createStackNavigator(
  {
    ListLandForSaleScreen: {
      screen: ListLandForSaleScreen,
      navigationOptions: headerWithMenuButton,
    },
    BuyLandScreen: {
      screen: BuyLandScreen,
      navigationOptions: headerWithBackButton,
    },
    OnboardingHomeScreen: {
      screen: OnboardingHomeScreen,
      navigationOptions: headerWithBackButton,
    },
    EthereumQuestionScreen: {
      screen: EthereumQuestionScreen,
      navigationOptions: headerWithBackButton,
    },
    EthereumSignUpScreen: {
      screen: EthereumSignUpScreen,
      navigationOptions: headerWithBackButton,
    },
    EthereumSignInScreen: {
      screen: EthereumSignInScreen,
      navigationOptions: headerWithBackButton,
    },
  },
  {
    initialRouteName: "ListLandForSaleScreen",
    defaultNavigationOptions,
  }
);

const MyAssetsNavigator = createStackNavigator(
  {
    MyAssetsScreen: {
      screen: MyAssetsScreen,
      navigationOptions: headerWithMenuButton,
    },
  },
  {
    initialRouteName: "MyAssetsScreen",
    defaultNavigationOptions,
  }
);

const MyAccountNavigator = createStackNavigator(
  {
    MyAccountScreen: {
      screen: MyAccountScreen,
      navigationOptions: headerWithMenuButton,
    },
  },
  {
    initialRouteName: "MyAccountScreen",
    defaultNavigationOptions,
  }
);

const MainDrawerNavigator = createDrawerNavigator({
  AssetsForSale: {
    screen: AssetsForSaleNavigator,
    navigationOptions: {
      drawerLabel: "Land for sale",
    },
  },
  MyAssets: {
    screen: MyAssetsNavigator,
    navigationOptions: {
      drawerLabel: "My land",
    },
  },
  MyAccount: {
    screen: MyAccountNavigator,
    navigationOptions: {
      drawerLabel: "My account",
    },
  },
});

export default createAppContainer(MainDrawerNavigator);
