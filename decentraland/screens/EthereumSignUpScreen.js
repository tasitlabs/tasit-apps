import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount } from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";

import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccount,
} from "./helpers";

import TasitContracts from "tasit-contracts";
const { Marketplace } = TasitContracts["local"];

const { address: MARKETPLACE_ADDRESS } = Marketplace;

import { Account } from "tasit-sdk";

export class EthereumSignUpScreen extends React.Component {
  // TODO: Use Gnosis Safe
  _onboarding = async () => {
    try {
      const { setAccount } = this.props;

      // Note: The timeout for account creation is about ~10 secs.
      // See more: https://github.com/tasitlabs/tasit/issues/42
      const account = Account.create();
      setAccount(account);

      const { address: accountAddress } = account;
      await fundAccount(accountAddress);

      await approveManaSpending(account, MARKETPLACE_ADDRESS);
      showInfo(`Account created and funded!`);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    showInfo(`Creating and funding account...`);

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
