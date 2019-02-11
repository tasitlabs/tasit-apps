import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount } from "../actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export class EthereumSignUpScreen extends React.Component {
  // Note: As same as Account.create(), this functions isn't running as async.
  // Timeout Between button click and screen change (afterSignUp()) is abount 5 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  _createAccount = async () => {
    const { setAccount } = this.props;
    // Note: A real app wouldn't be using a preset private key and hardcoding it!
    // We're only doing this temporarily while using a hardcoded account with ETH and tokens
    const accountPrivateKey =
      "0x4f09311114f0ff4dfad0edaa932a3e01a4ee9f34da2cbd087aa0e6ffcb9eb322";
    const account = createFromPrivateKey(accountPrivateKey);
    setAccount(account);
  };

  _onSignUp = () => {
    // Should run async but isn't when calling Account.create() or createFromPrivateKey()
    this._createAccount();

    this.props.navigation.navigate("SellOrderExecuteScreen");
  };

  render() {
    return <EthereumSignUp onSignUp={this._onSignUp} />;
  }
}

EthereumSignUpScreen.propTypes = {
  setAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
