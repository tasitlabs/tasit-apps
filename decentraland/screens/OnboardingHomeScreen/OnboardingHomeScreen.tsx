import React from "react";
import OnboardingHome from "../../components/presentational/OnboardingHome";

interface OnboardingHomeScreenProps {
  navigation: any;
}
export default class OnboardingHomeScreen extends React.Component<
  OnboardingHomeScreenProps,
  {}
> {
  render(): JSX.Element {
    return (
      <OnboardingHome
        onPress={(): void =>
          this.props.navigation.navigate("EthereumQuestionScreen")
        }
      />
    );
  }
}
