import React from "react";
<<<<<<< HEAD
import OnboardingHome from "@presentational/OnboardingHome";
=======
import OnboardingHome from "../components/presentational/OnboardingHome";
>>>>>>> Screen/Presentational components refactoring

export default class OnboardingHomeScreen extends React.Component {
  render() {
    return (
      <OnboardingHome
        onPress={() => this.props.navigation.navigate("EthereumQuestionScreen")}
      />
    );
  }
}
