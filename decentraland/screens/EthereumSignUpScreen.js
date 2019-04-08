import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAccount,
  setAccountCreationStatus,
  updateActionForAccountCreationStatus,
} from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";

import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
  createAccount,
} from "@helpers";

import AccountCreationStatus from "@constants/AccountCreationStatus";
const {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

export class EthereumSignUpScreen extends React.Component {
  _onboarding = async () => {
    try {
      const {
        setAccount,
        setAccountCreationStatus,
        updateActionForAccountCreationStatus,
      } = this.props;

      // The pattern for each step is:
      // 1. alert with good info as soon as it's true
      // 2. update app state with action in progress if applicable
      // 3. persist any important side effects we may need
      //    later if applicable
      // 4. Change UI progress state on-screen

      const createAnAccount = async () => {
        const account = await createAccount();
        showInfo(`Account generated`);
        setAccount(account);
        setAccountCreationStatus(FUNDING_WITH_ETH);
        return account;
      };

      const fundWithEthers = async accountAddress => {
        const action = fundAccountWithEthers(accountAddress);
        updateAccountCreationCurrentStatusAction(action);
        await action.waitForNonceToUpdate();
        showInfo(`Account funded with ETH`);
        setAccountCreationStatus(FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE);
      };

      const fundWithMana = async accountAddress => {
        const action = fundAccountWithMana(accountAddress);
        updateAccountCreationCurrentStatusAction(action);
        await action.waitForNonceToUpdate();
        showInfo(`Account funded with MANA`);
        setAccountCreationStatus(APPROVING_MARKETPLACE);
      };

      const approveMarketplace = async account => {
        const action = approveManaSpending(account);
        updateAccountCreationCurrentStatusAction(action);
        await action.waitForNonceToUpdate();
        showInfo(`Marketplace approved`);
        setAccountCreationStatus(FUNDING_WITH_MANA);
      };

      ///
      // Main control flow
      ///
      const account = await createAnAccount();
      const { address: accountAddress } = account;
      await fundWithEthers(accountAddress);
      await Promise.all([
        fundWithMana(accountAddress),
        approveMarketplace(account),
      ]);

      showInfo(`Now you can buy land!`);
      setAccountCreationStatus(READY_TO_USE);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    const { setAccountCreationStatus } = this.props;
    setAccountCreationStatus(GENERATING_ACCOUNT);

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
  setAccountCreationStatus: PropTypes.func.isRequired,
  updateAccountCreationCurrentStatusAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
  setAccountCreationStatus,
  updateAccountCreationCurrentStatusAction,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
