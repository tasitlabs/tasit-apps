import React from "react";
import EthereumQuestion from "../../components/presentational/EthereumQuestion";
export default class EthereumQuestionScreen extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <EthereumQuestion
        onSignUp={() => this.props.navigation.navigate("EthereumSignUpScreen")}
        onSignIn={() => this.props.navigation.navigate("EthereumSignInScreen")}
      />
    );
  }
}
