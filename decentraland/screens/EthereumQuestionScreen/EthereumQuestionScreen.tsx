import React from "react";
import EthereumQuestion from "../../components/presentational/EthereumQuestion";

import { NavigationStackProp } from "react-navigation-stack";

type EthereumQuestionScreenProps = {
  navigation: NavigationStackProp;
};

export default class EthereumQuestionScreen extends React.Component<
  EthereumQuestionScreenProps,
  {}
> {
  render(): JSX.Element {
    return (
      <EthereumQuestion
        onSignUp={(): boolean =>
          this.props.navigation.navigate("EthereumSignUpScreen")
        }
        onSignIn={(): boolean =>
          this.props.navigation.navigate("EthereumSignInScreen")
        }
      />
    );
  }
}
