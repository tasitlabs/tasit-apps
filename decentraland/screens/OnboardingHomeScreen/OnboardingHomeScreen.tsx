import React from "react";
import OnboardingHome from "../../components/presentational/OnboardingHome";

import { NavigationStackProp } from "react-navigation-stack";

interface OnboardingHomeScreenProps {
  navigation: NavigationStackProp;
}

export default class OnboardingHomeScreen extends React.Component<
  OnboardingHomeScreenProps,
  {}
> {
  render(): JSX.Element {
    return (
      <OnboardingHome
        onPress={(): boolean =>
          this.props.navigation.navigate("EthereumQuestionScreen")
        }
      />
    );
  }
}
