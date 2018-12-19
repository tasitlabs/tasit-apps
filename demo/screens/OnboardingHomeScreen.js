import React from "react";
import OnboardingHome from "@presentational/OnboardingHome";

export default class OnboardingHomeScreen extends React.Component {
  render() {
    return (
      <OnboardingHome
        onPress={() => this.props.navigation.navigate("EthereumQuestionScreen")}
      />
    );
  }
}
