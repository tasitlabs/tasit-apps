import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount, setSetupInProgress } from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
  recoverOrCreateAccount,
} from "./helpers";

export class EthereumSignUpScreen extends React.Component {
  _onboarding = async () => {
    try {
      const { setAccount, setSetupInProgress } = this.props;

      const account = recoverOrCreateAccount();
      setAccount(account);
      showInfo(`Account generated`);

      const { address: accountAddress } = account;

      await fundAccountWithEthers(accountAddress);
      showInfo(`Account funded with ethers`);
      const fundWithMana = fundAccountWithMana(accountAddress);
      const approveMarketplace = approveManaSpending(account);
      await Promise.all([fundWithMana, approveMarketplace]);
      showInfo(`The account is ready to buy!`);

      setSetupInProgress(false);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    const { setSetupInProgress } = this.props;
    setSetupInProgress(true);
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
  setSetupInProgress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
  setSetupInProgress,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
