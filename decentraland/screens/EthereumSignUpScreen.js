import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAccount,
  setAccountFundedWithEthers,
  setAccountFundedWithMana,
  setAccountApprovedMarketplace,
} from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
} from "./helpers";

import { Account } from "tasit-sdk";

export class EthereumSignUpScreen extends React.Component {
  _onboarding = async () => {
    try {
      const {
        setAccount,
        setAccountFundedWithEthers,
        setAccountFundedWithMana,
        setAccountApprovedMarketplace,
      } = this.props;

      // Note: The timeout for account creation is about ~10 secs.
      // See more: https://github.com/tasitlabs/tasit/issues/42
      const account = Account.create();
      setAccount(account);
      showInfo(`Account generated`);

      const { address: accountAddress } = account;

      await fundAccountWithEthers(accountAddress);
      setAccountFundedWithEthers(true);
      showInfo(`Account funded with ETH`);

      const fundWithMana = async () => {
        fundAccountWithMana(accountAddress);
        setAccountFundedWithMana(true);
      };
      const approveMarketplace = async () => {
        approveManaSpending(account);
        setAccountApprovedMarketplace(true);
      };
      await Promise.all([fundWithMana, approveMarketplace]);
      showInfo(`Now you can buy land!`);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    showInfo(`Creating and funding account...`);
    // Note: A trick to force `_onboarding()` function to running async
    (async () => {})().then(() => {
      // Should run async but isn't when calling Account.create() or createFromPrivateKey()
      // See more: https://github.com/tasitlabs/tasit/issues/42#issuecomment-462534793
      this._onboarding();
    });

    this.props.navigation.navigate("BuyLandScreen");
  };

  render() {
    return <EthereumSignUp onSignUp={this._onSignUp} />;
  }
}

EthereumSignUpScreen.propTypes = {
  setAccount: PropTypes.func.isRequired,
  setAccountFundedWithEthers: PropTypes.func.isRequired,
  setAccountFundedWithMana: PropTypes.func.isRequired,
  setAccountApprovedMarketplace: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
  setAccountFundedWithEthers,
  setAccountFundedWithMana,
  setAccountApprovedMarketplace,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
