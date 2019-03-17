import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount } from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
import {
  approveManaSpending,
  manaFaucetTo,
  showInfo,
  showError,
} from "./helpers";
import ContractsAddresses from "@constants/ContractsAddresses";

export class EthereumSignUpScreen extends React.Component {
  // Note: As same as Account.create(), this functions isn't running as async.
  // Timeout Between button click and screen change (afterSignUp()) is abount 5 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  _createAccount = async () => {
    // Note: A real app wouldn't be using a preset private key and hardcoding it!
    // We're only doing this temporarily while using a hardcoded account with ETH and tokens
    const accountPrivateKey =
      "0x4f09311114f0ff4dfad0edaa932a3e01a4ee9f34da2cbd087aa0e6ffcb9eb322";
    const account = createFromPrivateKey(accountPrivateKey);
    return account;
  };

  // TODO: Use Gnosis Safe
  // Note: The currenct account is funded with ethers by ganache (Gnosis should fund with ethers too)
  _fundAccount = async accountAddress => {
    const TEN = 10e18;
    await manaFaucetTo(accountAddress, TEN);
  };

  _approveAccount = async account => {
    const { MARKETPLACE_ADDRESS } = ContractsAddresses;
    const ONE = 1e18;
    await approveManaSpending(account, MARKETPLACE_ADDRESS, ONE);
  };

  // TODO: Use Gnosis Safe
  _onboarding = async () => {
    try {
      const { setAccount } = this.props;
      const account = await this._createAccount();
      showInfo(`Account created.`);
      setAccount(account);

      const { address: accountAddress } = account;
      await this._fundAccount(accountAddress);
      showInfo(`Account funded.`);

      await this._approveAccount(account);
      showInfo(`Account approved.`);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    // Should run async but isn't when calling Account.create() or createFromPrivateKey()
    this._onboarding();

    this.props.navigation.navigate("BuyLandScreen");
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
