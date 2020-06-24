import React from "react";
import OnboardingHome from "../../components/presentational/OnboardingHome";

import { NavigationStackProp } from "react-navigation-stack";

interface OnboardingHomeScreenProps {
  navigation: NavigationStackProp;
}

const OnboardingHomeScreen: React.FunctionComponent<OnboardingHomeScreenProps> = ({
  navigation,
}) => {
  return (
    <OnboardingHome
      onPress={(): boolean => navigation.navigate("EthereumQuestionScreen")}
    />
  );
};

export default OnboardingHomeScreen;
