import React from "react";
import EthereumSignIn from "@presentational/EthereumSignIn";

export default class EthereumSignInScreen extends React.Component {
  render() {
    const onConnect = () => {};
    return <EthereumSignIn onConnect={onConnect} />;
  }
}
