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

import { Account } from "tasit-sdk";

export class EthereumSignUpScreen extends React.Component {
  _onboarding = async () => {
    try {
      const { setAccount } = this.props;

      // Note: The timeout for account creation is about ~10 secs.
      // See more: https://github.com/tasitlabs/tasit/issues/42
      const account = Account.create();
      setAccount(account);

      const { address: accountAddress } = account;

      const onFundSuccess = async () => {
        const onApprovalSuccess = () => {
          showInfo(`Account created and funded!`);
        };

        approveManaSpending(account, onApprovalSuccess);
      };

      fundAccount(accountAddress, onFundSuccess);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
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
};

const mapDispatchToProps = {
  setAccount,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
