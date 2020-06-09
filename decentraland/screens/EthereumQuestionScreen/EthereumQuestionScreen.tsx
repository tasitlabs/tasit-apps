import React from "react";
import EthereumQuestion from "../../components/presentational/EthereumQuestion";

import { NavigationStackProp } from "react-navigation-stack";

type EthereumQuestionScreenProps = {
  navigation: NavigationStackProp;
};

const EthereumQuestionScreen: React.FunctionComponent<EthereumQuestionScreenProps> = ({
  navigation,
}) => {
  return (
    <EthereumQuestion
      onSignUp={(): boolean => navigation.navigate("EthereumSignUpScreen")}
      onSignIn={(): boolean => navigation.navigate("EthereumSignInScreen")}
    />
  );
};

export default EthereumQuestionScreen;
