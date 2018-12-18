import React from "react";
<<<<<<< HEAD
import EthereumQuestion from "@presentational/EthereumQuestion";
=======
import EthereumQuestion from "../components/presentational/EthereumQuestion";
>>>>>>> Screen/Presentational components refactoring

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
