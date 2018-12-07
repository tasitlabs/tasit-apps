import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import ListLands from "./ListLands";
import LandClaim from "./LandClaim";
import OnboardingHome from "./OnboardingHome";
import EthereumQuestion from "./EthereumQuestion";
import EthereumSignUp from "./EthereumSignUp";
import EthereumSignIn from "./EthereumSignIn";

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
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);

export default createAppContainer(AppNavigator);
