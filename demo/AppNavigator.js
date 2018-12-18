import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/Home";
import ListLands from "./screens/ListLands";
import LandClaim from "./screens/LandClaim";
import OnboardingHome from "./screens/OnboardingHome";
import EthereumQuestion from "./screens/EthereumQuestion";
import EthereumSignUp from "./screens/EthereumSignUp";
import EthereumSignIn from "./screens/EthereumSignIn";
import Colors from "@constants/Colors";

const AppNavigator = createStackNavigator(
  {
    Home,
    ListLands,
    LandClaim,
    OnboardingHome,
    EthereumQuestion,
    EthereumSignUp,
    EthereumSignIn,
  },
  {
    initialRouteName: "Home",
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
