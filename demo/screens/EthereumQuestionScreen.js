import React from "react";
import EthereumQuestion from "@presentational/EthereumQuestion";

export default class EthereumQuestionScreen extends React.Component {
  render() {
    return (
      <EthereumQuestion
        onSignUp={() => this.props.navigation.navigate("EthereumSignUpScreen")}
        onSignIn={() => this.props.navigation.navigate("EthereumSignInScreen")}
      />
    );
  }
}
