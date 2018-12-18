import React from "react";
<<<<<<< HEAD
import EthereumSignIn from "@presentational/EthereumSignIn";

export default class EthereumSignInScreen extends React.Component {
  render() {
    const onConnect = () => {};
    return <EthereumSignIn onConnect={onConnect} />;
=======
import EthereumSignIn from "../components/presentational/EthereumSignIn";

export default class EthereumSignInScreen extends React.Component {
  render() {
    return <EthereumSignIn onConnect={() => {}} />;
>>>>>>> Screen/Presentational components refactoring
  }
}
