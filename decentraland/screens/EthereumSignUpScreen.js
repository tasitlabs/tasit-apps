import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount, setAccountCreationStatus } from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
  createAccount,
} from "../helpers";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

export class EthereumSignUpScreen extends React.Component {
  _onboarding = async () => {
    try {
      const { setAccount, setAccountCreationStatus } = this.props;

      const account = await createAccount();
      showInfo(`Account generated`);
      setAccount(account);

      const { address: accountAddress } = account;

      const fundWithEthers = async () => {
        setAccountCreationStatus(FUNDING_WITH_ETH);
        await fundAccountWithEthers(accountAddress);
        showInfo(`Account funded with ETH`);
      };

      const fundWithMana = async () => {
        setAccountCreationStatus(FUNDING_WITH_MANA);
        await fundAccountWithMana(accountAddress);
        showInfo(`Account funded with MANA`);
      };

      const approveMarketplace = async () => {
        setAccountCreationStatus(APPROVING_MARKETPLACE);
        await approveManaSpending(account);
        showInfo(`Marketplace approved`);
      };

      await fundWithEthers();
      await Promise.all([fundWithMana(), approveMarketplace()]);
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
};

const mapDispatchToProps = {
  setAccount,
  setAccountCreationStatus,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
